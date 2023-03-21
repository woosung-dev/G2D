import React, { useState } from 'react';
import axios from 'axios';
import style from './test.module.scss';
import fileDownload from 'js-file-download';

export default function UploadFile() {
  const [file, setFile] = useState<FileList | null>();
  const [status, setStatus] = useState('');
  const [imgPreview, setImgPreview] = useState('');

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setStatus(''); // Reset status

      const formData = new FormData();
      file?.length && formData.append('Image', file[0]);
      const resp = await axios.post('/api/call?type=Image', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      // 파일 url변환 하여 imag표시를 위한 작업
      viewFile(resp);
      // TODO: 파일 확장자 확인 해당 형식으로 받아올 수 있도록
      fileDownload(resp.data, '3D-object-file');

      setStatus(resp.status === 200 ? 'Success!' : 'Error.');
    } catch (error) {
      console.log(error);
    }
  };

  // 파일 date 이미지에 표시하기 위한 설정 로직
  const viewFile = (resp: any) => {
    // TODO: 정확한 동작 확인 필요
    const result = 'result';
    const newFile = new File([resp.data], result);
    console.log(newFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      const previewImage = String(event.target?.result);
      console.log(previewImage);

      setImgPreview(previewImage);
    };
    reader.readAsDataURL(newFile);
  };

  return (
    <div className={style['upload-file-wrapper']}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={'form-layout'}>
        <input type="file" name="file" onChange={(e) => setFile(e.target.files)} />
        <button type="submit" className={style['form-btn']}>
          Upload File
        </button>
      </form>

      <div className={style['result-layout']}>
        <div className={style['result-item']}> 성공여부 {status ? <h1>{status}</h1> : null}</div>
        {imgPreview && (
          <div>
            <img src={imgPreview} alt="img-preview" />
          </div>
        )}
      </div>
    </div>
  );
}
