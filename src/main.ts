import { bootstrapCameraKit } from '@snap/camera-kit';

(async function () {
  const cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzEzMDk2NDUwLCJzdWIiOiIwMDM2ZDg0NS01ZmEzLTQ3YmYtOTI5Ny1kYzg2YzAwMjdkYzB-U1RBR0lOR35jNDEwODlhZC1hNWFjLTQyNmEtOTlmYy04MzUzY2UxY2ViNmEifQ.f_-wJbSAKSppVisqmQszxuMuruvLfpkfMDFZU6YHcn0' });
  const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;
  const session = await cameraKit.createSession({ liveRenderTarget });
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { exact: "environment" },
    },
  });
  await session.setSource(mediaStream);
  await session.play();

  const lens = await cameraKit.lensRepository.loadLens(
    '324ffc1d-1407-45ce-b2c5-1fad38de7d18',
    '88100c29-c3e6-4deb-bce0-35e91383790e'
  );

  await session.applyLens(lens);
})();

