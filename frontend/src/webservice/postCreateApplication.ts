import Application from "../types/Application";

export default async (applicationToCreate: Application) => await fetch(
  `${import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_DEVELOPMENT_API_ORIGIN : import.meta.env.VITE_PRODUCTION_API_ORIGIN}application/new`,
  {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({application: applicationToCreate}),
    credentials: "include",
  }
);