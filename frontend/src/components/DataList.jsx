import React from 'react';
import { Data } from './Data';
import styles from './DataList.module.css';

const DataList = ({ entries }) => {

  return (
    <div className={styles.list}>
      {/* <h3>{`Today:`}</h3> */}
      <ul>
        {entries.map((entry, index) => (
          <Data key={entry.id} data={entry} />
        ))}
      </ul>
      {/* <h3>{`Yesterday:`}</h3> */}
      {/* <h3>{`Older:`}</h3> */}
    </div>
  );
};

export default DataList;
