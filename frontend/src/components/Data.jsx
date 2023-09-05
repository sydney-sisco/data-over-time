import { useState } from 'react';
import styles from './Data.module.css'

export function Data ({ data, deleteThought }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(data.text);

  const date = new Date(data.createdAt);
  const localTime = `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
  const localDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

  return (
    <li className={styles.card}>
      <div>
        <span>{localDate} - {localTime}</span>
      </div>
      <div>
        <span>{data.category}</span>
        {Object.keys(data.values).map((key, i) => (
          <div key={i}>
            <span>{key}</span>:&nbsp;
            <span>{data.values[key]}</span>
          </div>
        ))}
      </div>
      <div></div>
    </li>
  )
};
