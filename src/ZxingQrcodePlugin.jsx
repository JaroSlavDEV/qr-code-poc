import { useCallback, useState } from "react";
import { useZxing } from "react-zxing";

export const ZxingQrcodePlugin = () => {
  const [data, setData] = useState("");

  const onZxingQrcodeResult = useCallback((decodedText, decodedResult) => {
    setData(decodedText);
    console.log("Result onZxingQrcode", decodedResult);
  }, []);

  const { ref } = useZxing({
    onResult(result) {
      onZxingQrcodeResult(result.text, result);
    },
  });

  return (
    <div className="approach">
      <div>Zxing-QRCode - {data}</div>
      <div className="qr-code-read-container qr-code-read-container-2">
        <video ref={ref}></video>
      </div>
    </div>
  );
};
