import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Collections from "./components/Collections";
import MyCollection from "./components/MyCollection";
import Login from "./components/Login";
import ArtlistCollectionOne from "./components/ArtlistCollectionOne";
import ArtlistCollectionTwo from "./components/ArtlistCollectionTwo";
import SingleArtworkOne from "./components/SingleArtworkOne";
import SingleArtworkTwo from "./components/SingleArtworkTwo";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route
          path="/collections/victoria-and-albert-museum"
          element={<ArtlistCollectionOne />}
        />
        <Route
          path="/collections/victoria-and-albert-museum/:artwork_id"
          element={<SingleArtworkOne />}
        />
        <Route
          path="/collections/cleveland-museum-of-art"
          element={<ArtlistCollectionTwo />}
        />
        <Route
          path="/collections/cleveland-museum-of-art/:artwork_id"
          element={<SingleArtworkTwo />}
        />
        <Route path="/my-collection" element={<MyCollection />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
