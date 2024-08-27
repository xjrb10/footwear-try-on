import { bootstrapCameraKit } from '@snap/camera-kit';

(async function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  setInterval(() => {
    const tosDialog = document.querySelectorAll('div[data-testid="tos-dialog"]')[0] as HTMLElement | undefined;
    const shadowRoot = tosDialog?.shadowRoot;
    const acceptButton = shadowRoot?.querySelectorAll('button[data-key="accept"]')[0] as HTMLButtonElement | undefined;
    acceptButton?.click();
  }, 50);

  const cameraKit = await bootstrapCameraKit({
    apiToken: urlParams.get('t') as string
  });
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
      urlParams.get('lId') as string,
      urlParams.get('gId') as string
  );

  await session.applyLens(lens);
})();

