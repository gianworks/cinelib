import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Browse from "./features/browse/Browse";
import MyLibrary from "./features/library/MyLibrary";

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <main>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/library" element={<MyLibrary />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
