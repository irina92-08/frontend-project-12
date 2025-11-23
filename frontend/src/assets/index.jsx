import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormComponent } from "../components/Loging";
import { MainPage } from "../components/MainPage";
import { NotFound } from "../components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<FormComponent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
