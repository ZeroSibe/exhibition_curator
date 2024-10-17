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
import { Toaster } from "@/components/ui/toaster";
import ErrorPage from "./components/ErrorPage";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div>
      <Toaster />
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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
