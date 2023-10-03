export const imageUrl = (images: any) => {
  if (images[0]) {
    return `${images[0].imageUrl}_100.png`;
  } else {
    return '/no_image.png';
  }
};
