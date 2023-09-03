import React from 'react';

const DataList = ({ entries }) => {

  return (
    <ul>
      {entries.map((entry, index) => (
        <li key={index}>
          {entry.createdAt} - {entry.name}
        </li>
      ))}
    </ul>
  );
};

export default DataList;
