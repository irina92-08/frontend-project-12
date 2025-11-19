import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormComponent } from "../Components/Loging";
import { MainPage } from "../Components/MainPage";
import { NotFound } from "../Components/NotFound";

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
