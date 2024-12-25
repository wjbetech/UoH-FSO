const normalizeName = (name) => {
  const splitName = name.split(" ");
  const capitalizedName = splitName.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
  return capitalizedName.join(" ");
};

export default { normalizeName };
