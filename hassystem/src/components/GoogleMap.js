import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, Marker, InfoWindow , useMapsLibrary ,useMap } from '@vis.gl/react-google-maps';
import { getAllAidPoints } from '../services/api';

const GoogleMap = () => {
  const [aidPoints, setAidPoints] = useState([]);
  const [openInfoWindow, setOpenInfoWindow] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  const fetchAidPoints = async () => {
    try {
      const data = await getAllAidPoints();
      setAidPoints(data);
    } catch (error) {
      console.error('Error fetching aid points', error);
    }
  };

  useEffect(() => {
    fetchAidPoints();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(userPosition);
          if (mapRef.current) {
            mapRef.current.panTo(userPosition);
            mapRef.current.setZoom(14);
          }
        },
        (error) => console.error('Error getting current position', error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    if (window.google && mapRef.current) {
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({ map: mapRef.current });
    }
  }, []); // Only run once after the initial render

  const handleMarkerClick = async (index) => {
    setOpenInfoWindow(index);
    calculateAndDisplayRoute(index);
  };

  const calculateAndDisplayRoute = (index) => {
    if (currentPosition && directionsServiceRef.current && directionsRendererRef.current) {
      const request = {
        origin: currentPosition,
        destination: {
          lat: parseFloat(aidPoints[index].latitude),
          lng: parseFloat(aidPoints[index].longitude),
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      };

      directionsServiceRef.current.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRendererRef.current.setDirections(result);
          setRoutes(result.routes);
          setRouteIndex(0);  // Default to the first route
        } else {
          console.error('Error fetching directions', status);
        }
      });
    }
  };

  useEffect(() => {
    if (directionsRendererRef.current && routes.length > 0) {
      directionsRendererRef.current.setRouteIndex(routeIndex);
    }
  }, [routeIndex, routes]);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '100vh', width: '100%' }}>
        <Map
          zoom={15}
          defaultCenter={ { lat: 36.892803, lng: 30.663757 }}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          options={{
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true,
            draggable: true,
          }}
          onLoad={(map) => {
            mapRef.current = map;
            if (directionsRendererRef.current) {
              directionsRendererRef.current.setMap(map);
            }
          }}
        >
          {currentPosition && (
            <Marker position={currentPosition} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
          )}
          {aidPoints.map((point, index) => (
            <Marker
              key={index}
              position={{ lat: parseFloat(point.latitude), lng: parseFloat(point.longitude) }}
              onClick={() => handleMarkerClick(index)}
            />
          ))}
          {openInfoWindow !== null && aidPoints[openInfoWindow] && (
            <InfoWindow
              position={{
                lat: parseFloat(aidPoints[openInfoWindow].latitude),
                lng: parseFloat(aidPoints[openInfoWindow].longitude),
              }}
              onCloseClick={() => {
                setOpenInfoWindow(null);
                if (directionsRendererRef.current) {
                  directionsRendererRef.current.setDirections({ routes: [] }); // Clear directions
                }
              }}
            >
              <div>
                <h4>{aidPoints[openInfoWindow].name}</h4>
                <p>{aidPoints[openInfoWindow].location}</p>
                <p>Products: {aidPoints[openInfoWindow].status}</p>
              </div>
            </InfoWindow>
          )}
          
        </Map>
        {routes.length > 0 && (
          <div className="directions">
            <h2>{routes[routeIndex].summary}</h2>
            <p>
              {routes[routeIndex].legs[0].start_address.split(",")[0]} to{' '}
              {routes[routeIndex].legs[0].end_address.split(",")[0]}
            </p>
            <p>Distance: {routes[routeIndex].legs[0].distance?.text}</p>
            <p>Duration: {routes[routeIndex].legs[0].duration?.text}</p>

            <h2>Other Routes</h2>
            <ul>
              {routes.map((route, index) => (
                <li key={route.summary}>
                  <button onClick={() => setRouteIndex(index)}>
                    {route.summary}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </APIProvider>
  );
};



export default GoogleMap;
