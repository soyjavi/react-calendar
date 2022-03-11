export const getResolution = () => {
  const { innerHeight: height = 0, innerWidth: width = 0 } = window || {};

  return { height, width };
};
