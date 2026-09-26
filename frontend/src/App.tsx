import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Browse from "./features/browse/Browse";
import MyLibrary from "./features/library/MyLibrary";
import MovieDetails from "./features/movie_details/MovieDetails";

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
