import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { ZxingQrcodePlugin } from "./ZxingQrcodePlugin";
import { NimiqQrcodePlugin } from "./NimiqQrcodePlugin";
import { Html5QrcodePlugin } from "./Html5QrcodePlugin";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="html5-qr-code">HTML 5 Qr Code</Link>
            </li>
            <li>
              <Link to="zxing-qr-code">Zxing Qr Code</Link>
            </li>
            <li>
              <Link to="nimiq-qr-code">Nimiq Qr Code</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/html5-qr-code" element={<Html5QrcodePlugin />} />
          <Route path="/zxing-qr-code" element={<ZxingQrcodePlugin />} />
          <Route path="/nimiq-qr-code" element={<NimiqQrcodePlugin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
