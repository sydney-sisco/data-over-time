import React from 'react';

const DataList = ({ entries }) => {

  return (
    <ul>
      {entries.map((entry, index) => (
        <li key={index}>
          {entry.createdAt} - {entry.data}
        </li>
      ))}
    </ul>
  );
};

export default DataList;
