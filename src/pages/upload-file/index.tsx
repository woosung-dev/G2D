import React, { useState } from 'react';
import axios from 'axios';

export default function UploadFile() {
  const [file, setFile] = useState<FileList | File | string | null>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  // 1번 방식
  const upload = async (e: any) => {
    try {
      // console.warn(e.target.files);
      const files = e.target.files;
      const formData = new FormData();
      formData.append('img', files[0]);
      axios.post('/api/file-upload', {
        body: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 2번 방식
  const handleSubmit = async (event: any) => {
    setStatus(''); // Reset status
    event.preventDefault();
    const formData = new FormData();
    formData.append('avatar', file as string);
    formData.append('name', name);
    const resp = await axios.post('/api/upload', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    setStatus(resp.status === 200 ? 'Thank you!' : 'Error.');
  };

  return (
    <>
      <div>
        <h1>Upload File</h1>
        <input type="file" onChange={(e) => upload(e)} name="file" />
      </div>

      <form onSubmit={handleSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
        <button type="submit">Upload File</button>
        {status ? <h1>{status}</h1> : null}
      </form>
    </>
  );
}
