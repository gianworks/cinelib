import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Browse from "./features/browse/pages/Browse";
import MyLibrary from "./features/library/pages/MyLibrary";
import MovieDetails from "./features/movie-details/pages/MovieDetails";

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <main>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/library" element={<MyLibrary />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
