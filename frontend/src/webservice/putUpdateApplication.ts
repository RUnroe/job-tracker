import Application from "../types/Application";

export default async (applicationToUpdate: Application) => await fetch(
  `${import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_DEVELOPMENT_API_ORIGIN : import.meta.env.VITE_PRODUCTION_API_ORIGIN}application/${applicationToUpdate._id}`,
  {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({application: applicationToUpdate}),
    credentials: "include",
  }
);