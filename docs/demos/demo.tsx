import React, { useState } from 'react';

export default function ImageUploader() {
  const [base64Image, setBase64Image] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {base64Image && <img src={base64Image} alt="Selected" />}
    </div>
  );
  }
