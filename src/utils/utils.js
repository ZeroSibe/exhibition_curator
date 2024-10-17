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
  if (artwork.images && artwork.images.length > 0) {
    artwork.images.forEach((imgId) => {
      imageUrls.push(
        `https://framemark.vam.ac.uk/collections/${imgId}/full/full/0/default.jpg`
      );
    });
  } else if (artwork._primaryImageId) {
    imageUrls.push(
      `https://framemark.vam.ac.uk/collections/${artwork._primaryImageId}/full/full/0/default.jpg`
    );
  }
  return imageUrls;
};

export const truncateTitle = (title, maxLength) => {
  return title.length > maxLength
    ? title.substring(0, maxLength) + "..."
    : title;
};
