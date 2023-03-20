import { useEffect, useState } from 'react';
import axios from 'axios';
export default function GetFile() {
  const [image, setImageList] = useState();

  const getImageApi = async () => {
    try {
      const res = await axios.get(`api/get-image/:${1}`); // 임시 파일 번호를 불러옴
      setImageList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImageApi();
  }, [image]);

  return (
    <>
      <div>image</div>
      <div>
        {image && <img key={`image`} style={{ maxWidth: '100%', height: 'auto' }} src={`data:image/;base64,${Buffer.from(image, 'base64')}`} alt={`image`} />}
      </div>
    </>
  );
}
