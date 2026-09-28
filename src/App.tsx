import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default WrappedApp;
