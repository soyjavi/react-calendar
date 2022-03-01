export const styles = (...stylesheets) =>
  stylesheets
    .flat(Infinity)
    .filter((value) => value !== false)
    .filter((value) => value !== undefined && value !== null)
    .join(' ')
    .trim();
