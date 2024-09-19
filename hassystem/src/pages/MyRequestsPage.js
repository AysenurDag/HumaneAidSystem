import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRequestStatuses } from '../services/api';

const AidRequestStatus = {
  0: 'Pending',
  1: 'Accepted',
  2: 'Completed',
  3: 'Cancelled'
};

const MyRequestsPage = () => {
  const location = useLocation();
  const { requests } = location.state || { requests: [] };
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      if (requests.length > 0) {
        try {
          const statusesArray = await Promise.all(
            requests.map(async (request) => {
              const status = await getRequestStatuses(request.id);
              return { ...request, status };
            })
          );
          setStatuses(statusesArray);
        } catch (error) {
          console.error('Error fetching request statuses', error);
        }
      }
    };
    fetchStatuses();
  }, [requests]);

  return (
    <div className="my-requests-page">
      <h2>My Requests</h2>
      <div className="requests">
        {statuses.length > 0 ? (
          statuses.map((request, index) => (
            <p key={index}>
              {request.name}: {AidRequestStatus[request.status]}
            </p>
          ))
        ) : (
          <p>No requests made yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyRequestsPage;
