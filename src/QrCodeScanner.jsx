import React, { useCallback, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QR_CODE_SCAN_CONTAINER_ID = "qr-code-scanner-container-id";

export const QrCodeScanner = ({ onSuccess, onError, pauseOnSuccess }) => {
  const instance = useRef();

  const successHandler = useCallback(
    (decodedText, result) => {
      onSuccess(decodedText, result);
      pauseOnSuccess && instance.current?.stop();
    },
    [onSuccess, pauseOnSuccess, instance.current]
  );

  useEffect(() => {
    const config = {
      fps: 100,
      qrbox: 250,
      disableFlip: false,
      aspectRatio: window.innerWidth / (window.clientHeight - 60),
      // window.innerWidth /
      // (window.innerHeight - (window.innerWidth <= 768 ? 60 : 80)),
    };
    console.log(window);
    instance.current = new Html5Qrcode(QR_CODE_SCAN_CONTAINER_ID);

    instance.current
      .start({ facingMode: "environment" }, config, successHandler, onError)
      .catch((error) => onError?.(error.message));

    return () => {
      if (!instance.current?.isScanning) return;

      instance.current
        ?.stop()
        .then(() => instance.current?.clear())
        .catch((error) => onError?.(error.message));
    };
  }, []);

  return (
    <div
      id={QR_CODE_SCAN_CONTAINER_ID}
      className="qr-code-read-container"
    ></div>
  );
};
