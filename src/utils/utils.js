export const getImageUrls = (artwork) => {
  const imageUrls = [];
  if (artwork.images.web) {
    imageUrls.push(artwork.images.web.url);
  }
  if (artwork.alternate_images) {
    artwork.alternate_images.forEach((image) => {
      if (image.web) {
        imageUrls.push(image.web.url);
      }
    });
  }
  return imageUrls;
};

export const getFullImage = (artwork) => {
  const imageUrls = [];
  if (artwork.images) {
    artwork.images.forEach((imgId) => {
      imageUrls.push(
        `https://framemark.vam.ac.uk/collections/${imgId}/full/full/0/default.jpg`
      );
    });
  }
  return imageUrls;
};