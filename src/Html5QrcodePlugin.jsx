import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrCodeScannerContainerId = "html5qr-code-full-region";

export const Html5QrcodePlugin = () => {
  const instance = useRef();
  const [data, setData] = useState("");

  const onHtml5QrcodeResult = useCallback((decodedText, decodedResult) => {
    setData(decodedText);
    console.log("Result onHtml5Qrcode", decodedResult);
  }, []);

  useLayoutEffect(() => {
    const config = {
      fps: 10,
      qrbox: 500,
      disableFlip: false,
    };

    instance.current = new Html5Qrcode(QrCodeScannerContainerId);

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;

          instance.current.start(cameraId, config, onHtml5QrcodeResult);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(
    () => () => {
      instance.current?.stop().then(() => {
        instance.current?.clear();
      });
    },
    []
  );

  return (
    <div className="approach">
      <div>Html5-QRCode - {data}</div>
      <div id={QrCodeScannerContainerId} className="qr-code-read-container" />
    </div>
  );
};
