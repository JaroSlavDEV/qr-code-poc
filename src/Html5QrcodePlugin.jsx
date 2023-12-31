import { useCallback, useState, useMemo } from "react";

import { QrCodeScanner } from "./QrCodeScanner";
import { Dialog } from "./Dialog";

export const Html5QrcodePlugin = () => {
  const [isCheckInScanDialogOpen, setIsCheckInScanDialogOpen] = useState(false);
  const [code, setCode] = useState("");

  const onCheckInScanDialogClose = useCallback(
    () => setIsCheckInScanDialogOpen(false),
    []
  );

  const onCheckInScanDialogToggle = useCallback(
    () => setIsCheckInScanDialogOpen((prev) => !prev),
    []
  );

  const onSuccess = useCallback((decodedText) => {
    setCode(decodedText);
    setIsCheckInScanDialogOpen(false);
  }, []);

  const onError = useCallback((error) => {
    console.log(error);
  }, []);

  return (
    <>
      <header></header>
      <div className="container-1">
        <button onClick={onCheckInScanDialogToggle}>Open</button>

        {code && <div className="code-text">{`Scanned code: ${code}`}</div>}
      </div>
      <Dialog
        className="check-in-scan-dialog"
        isOpened={isCheckInScanDialogOpen}
        onClose={onCheckInScanDialogClose}
        size={"full-screen"}
        closeIcon={true}
      >
        <span className="check-in-scan-message-header">
          Hold camera to scan QR code
        </span>
        <QrCodeScanner
          onSuccess={onSuccess}
          pauseOnSuccess={true}
          onError={onError}
        />
        <span className="check-in-scan-message-footer">
          QR code will automatically scan
        </span>
      </Dialog>
    </>
  );
};
