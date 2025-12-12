import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FormLoging } from "../components/Loging";
import { MainPage } from "../components/MainPage";
import { NotFound } from "../components/NotFound";
import { FormSignup } from "../components/Signup";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <MainPage /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<FormLoging />} />
        <Route path="/signup" element={<FormSignup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
