import data from "../data.json";

export const getAllData = () => data;
export const getCategories = () => data.categories;
export const getLocations = () => data.locations;
export const getPackages = () => data.packages;
export const getReviews = () => data.reviews;

export const getLocationById = (id) => data.locations.find((l) => l.id === id);
export const getPackageBySlug = (slug) => data.packages.find((p) => p.slug === slug);
export const getPackagesByLocation = (locationId) =>
  data.packages.filter((p) => p.location === locationId);
