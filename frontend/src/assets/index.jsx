import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormLoging } from "../components/Loging";
import { MainPage } from "../components/MainPage";
import { NotFound } from "../components/NotFound";
import { FormSignup } from "../components/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<FormLoging />} />
        <Route path="/signup" element={<FormSignup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
