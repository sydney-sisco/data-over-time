import React from 'react';

class Record extends React.Component {
  postData = async () => {
    const data = {name: 'test from react'}; // Replace with your actual data

    try {
      await fetch('/api/record', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Ah, crap! We hit an error, dude: ", error);
    }
  }

  render () {
    return (
      <button onClick={this.postData}>
        Click Me, If You Dare! 😉
      </button>
    );
  }
}

export default Record;
