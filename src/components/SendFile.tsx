import React, { useState } from 'react';
import firebase from '../firebase/index';

function App() {
  const [image, setImage] = useState('');
  const upload = () => {
    if (image == null) return;
    firebase.storage
      .ref(`/images/${image.name}`)
      .put(image)
      .on('state_changed', (snapshot) => console.log(snapshot), alert);
  };

  return (
    <div className="App-UploadFile">
      <center>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button onClick={upload}>Upload</button>
      </center>
    </div>
  );
}

export default App;
