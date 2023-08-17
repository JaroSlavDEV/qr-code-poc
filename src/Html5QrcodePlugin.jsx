import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

import "./App.css";

const QrCodeScannerContainerId = "html5qr-code-full-region";

const createConfig = (props) => {
  let config = {};

  if (props.fps) config.fps = props.fps;
  if (props.qrbox) config.qrbox = props.qrbox;
  if (props.aspectRatio) config.aspectRatio = props.aspectRatio;
  if (props.disableFlip !== undefined) config.disableFlip = props.disableFlip;

  return config;
};

export const Html5QrcodePlugin = (props) => {
  const instance = useRef();

  useEffect(() => {
    const config = createConfig(props);

    instance.current = new Html5Qrcode(QrCodeScannerContainerId);

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;

          instance.current.start(cameraId, config, props.qrCodeSuccessCallback);
        }
      })
      .catch((error) => console.log(error));

    return () => instance.current?.clear();
  }, []);

  return (
    <div id={QrCodeScannerContainerId} className="qr-code-read-container" />
  );
};
