export const imageUrl = (images: any) => {
  if (images[0]) {
    return `${images[0].imageUrl}_400.png?q=75&w=2000.png`;
  } else {
    return '/no_image.png';
  }
};
