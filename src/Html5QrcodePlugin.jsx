import { useCallback, useState, useMemo } from "react";

import { QrCodeScanner } from "./QrCodeScanner";
import { Dialog } from "./Dialog";

export const Html5QrcodePlugin = () => {
  const [isCheckInScanDialogOpen, setIsCheckInScanDialogOpen] = useState(false);

  const onCheckInScanDialogClose = useCallback(
    () => setIsCheckInScanDialogOpen(false),
    []
  );

  const onCheckInScanDialogToggle = useCallback(
    () => setIsCheckInScanDialogOpen((prev) => !prev),
    []
  );

  return (
    <>
      <header></header>
      <button onClick={onCheckInScanDialogToggle}>Open</button>
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
          onSuccess={() => console.log("SUCCESS")}
          pauseOnSuccess={true}
        />
        <span className="check-in-scan-message-footer">
          QR code will automatically scan
        </span>
      </Dialog>
    </>
  );
};
