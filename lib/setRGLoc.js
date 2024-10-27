export const setRGLoc = (rg) => {
  const afterChange = {};
  rg.forEach((r) => {
    afterChange[r.name] = r.details.location;
  });
  return afterChange;
};
