# Free3D

## 개요

Free3D는 사용자로 부터 가구 정보를 chat 형식을 통해서 ChatGPT처럼 text Processing을 통해 사물을 특정하고, text to image 프로세스를 통해서 이미지를 만들고, 만족스러운 이미지일 경우 그를 토대로 3D Texture를 generate를 도와주는 프로그램이며, 결과물을 구매 및 판매 할 수 있는 커머스 플랫폼

## 실행 방법

```bash
  npm install
  npm run dev
```

## 환경 변수 설정

- 결제 모듈을 위한 환경 변수 env.temp 파일 복사해 .env 파일 변수 설정

```
NEXT_PUBLIC_TOSS_CLIENT_KEY=${client_key}
TOSS_SECRET_KEY=${secret_key}
```

## Mockup
<p style="display: flex, gap: 5px">
  <h2> pc </h2>
  <img src="https://github.com/woosung-dev/G2D/assets/49228858/c08b2f56-f193-4d8c-afb8-8c7adc08c9e1" width="45%" height="450">
  <img src="https://github.com/woosung-dev/G2D/assets/49228858/c234fb14-59a8-40d9-9661-b03d85fb746b" width="45%" height="450">
  <img src="https://github.com/woosung-dev/G2D/assets/49228858/fd681297-3a3b-4dd1-98c4-60b0982a0701" width="45%" height="350">
  <img src="https://github.com/woosung-dev/G2D/assets/49228858/6223faa0-2692-4ea0-97b5-60a78efdcf06" width="45%" height="350">
  <h2> Mobile </h2>
  <img src="https://github.com/woosung-dev/G2D/assets/49228858/aa80e655-9940-436c-bc2b-dbe58e2e50c5" width="45%" height="900">
  <img src="https://github.com/woosung-dev/G2D/assets/49228858/2e64908c-623a-4fa5-aeac-df6d26b9fe50" width="45%" height="900">
</p>

## Demo
link: https://free3d.vercel.app/
