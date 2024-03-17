import React from 'react';

const NoResult = ({ message = 'No data available' }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p>{message}</p>
    </div>
  );
};

export default NoResult;
