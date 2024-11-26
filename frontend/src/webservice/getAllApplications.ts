
export default async () => await fetch(
  `${import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_DEVELOPMENT_API_ORIGIN : import.meta.env.VITE_PRODUCTION_API_ORIGIN}application/list`
);