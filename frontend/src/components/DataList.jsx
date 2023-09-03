import React from 'react';

const DataList = ({ entries }) => {

  return (
    <ul>
      {entries.map((entry, index) => (
        <li key={index}>
          {new Date(entry.timestamp).toLocaleString()}
        </li>
      ))}
    </ul>
  );
};

export default DataList;
