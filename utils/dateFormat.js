export default dateFomat = (value) => {
  return new Date(value).toLocaleDateString("en-en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
