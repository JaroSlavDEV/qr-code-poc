import { useCallback, useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

export const NimiqQrcodePlugin = () => {
  const instance = useRef();
  const [data, setData] = useState("");

  const onNimiqQrcodeResult = useCallback((decodedText, decodedResult) => {
    setData(decodedText);
    console.log("Result onNimiqQrcode", decodedResult);
  }, []);

  useEffect(() => {
    if (instance.current) return;

    instance.current = new QrScanner(
      document.querySelector(".qr-code-read-container-3 video"),
      (result) => onNimiqQrcodeResult(result.data, result),
      { returnDetailedScanResult: true, highlightScanRegion: true }
    );

    instance.current.start();
  }, []);

  return (
    <div className="approach">
      <div>Nimiq-QRCode - {data}</div>
      <div className="qr-code-read-container qr-code-read-container-3">
        <video></video>
      </div>
    </div>
  );
};
