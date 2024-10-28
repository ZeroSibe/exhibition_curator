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

export const reduceCollections = (collectionArray) => {
  return collectionArray.map((item) => {
    if (item.collection_type === "two") {
      const { id, title, images, technique, creation_date } = item.artwork;

      return {
        ...item,
        artwork: {
          id,
          title,
          images: images || [],
          technique,
          creation_date,
        },
      };
    }
    if (item.collection_type === "one") {
      const {
        systemNumber,
        _primaryTitle,
        objectType,
        _primaryDate,
        _primaryImageId,
        _images,
        images,
        productionDates,
        titles,
      } = item.artwork;

      return {
        ...item,
        artwork: {
          systemNumber,
          _primaryTitle: _primaryTitle || titles?.[0]?.title || "Unknown Title",
          objectType,
          _primaryDate:
            _primaryDate || productionDates?.[0]?.date.text | "Unknown Date",
          _primaryImageId: _primaryImageId || images?.[0] || null,
          _images: _images || null,
        },
      };
    }

    return item;
  });
};
