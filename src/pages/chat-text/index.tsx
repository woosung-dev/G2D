import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import style from './chat-text.module.scss';

export default function ChatText() {
  const [text, setText] = useState<string>();
  const [result, setResult] = useState<string>();
  const [isLoading, setIsolating] = useState<boolean>();

  const onSubmit = async (v: string | undefined) => {
    try {
      setIsolating(true);
      const { data } = await axios.post('/api/call?type=Text');
      console.log(data);

      setResult(data as unknown as string);
    } catch (error: any) {
      console.log(error);
    } finally {
      setTimeout(() => setIsolating(false), 2000);
    }
  };

  return (
    <>
      <div className="">
        <input
          name="text"
          placeholder="원하시는 특성을 입력해주세요."
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <button type="button" onClick={() => onSubmit(text)}>
          Submit
        </button>
      </div>
      {/* chart gpt api를 통해서 응답 값을 보여주는 페이지 */}
      <div className={style['layout-container']}>
        {isLoading ? (
          <>loading...</>
        ) : (
          <div className={style['content-item']}>
            {/* TODO: 입력 형식이 확정되면 해당 형식 출력 */}
            <span>{JSON.stringify(result)}</span>
          </div>
        )}
      </div>
    </>
  );
}
