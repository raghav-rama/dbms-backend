import { Route, Routes } from "react-router-dom";
import Admin from "@pages/Admin";
import "@styles/App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admin />} />
        {/* <Route path="/form" element={<Form />} />
        <Route path="/niches" element={<Niches />} /> */}
      </Routes>
    </>
  );
}

export default App;
