import axios from "axios";

export const collectionOneAPI = axios.create({
  baseURL: "https://api.vam.ac.uk/v2",
});

export const getArtworkOneById = (artworkId) => {
  return collectionOneAPI.get(`/museumobject/${artworkId}`);
};


export const collectionTwoAPI = axios.create({
  baseURL: "https://openaccess-api.clevelandart.org/api/artworks",
});

export const getArtworkTwoById = (artworkId) => {
  return collectionTwoAPI.get(`/${artworkId}`);
};
