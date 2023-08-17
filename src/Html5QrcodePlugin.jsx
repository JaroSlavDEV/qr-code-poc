import { useCallback, useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrCodeScannerContainerId = "html5qr-code-full-region";

const config = {
  fps: 10,
  qrbox: 500,
  disableFlip: false,
};

export const Html5QrcodePlugin = () => {
  const instance = useRef();
  const [data, setData] = useState("");
  const [cameras, setCameras] = useState([]);
  const [camera, setCamera] = useState(null);

  const onHtml5QrcodeResult = useCallback((decodedText, decodedResult) => {
    setData(decodedText);
    console.log("Result onHtml5Qrcode", decodedResult);
  }, []);

  const onFlip = useCallback(() => {
    const newCameraId = cameras.filter((prevCam) => prevCam.id !== camera)[0];

    instance.current?.stop();

    instance.current
      .start(newCameraId, config, onHtml5QrcodeResult)
      .catch((error) => console.log(error));
  }, [cameras, camera]);

  useEffect(() => {
    instance.current = new Html5Qrcode(QrCodeScannerContainerId);

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;

          setCameras(devices);
          setCamera(cameraId);

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
      <div>
        {cameras.map(({ label }) => label).join(",")} Html5-QRCode - {data}
      </div>
      <div id={QrCodeScannerContainerId} className="qr-code-read-container" />
      {cameras.length > 1 && <button onClick={onFlip}>FLIP</button>}
    </div>
  );
};
