import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "../pages/Home.tsx";
import { AddWord } from "../pages/AddWord.tsx";
import { Layout } from "../components/Layout.tsx";
import { EditWord } from "../pages/EditWord.tsx";
import { wordLoader } from "./loaders/wordLoader.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // <-- match on parent, i.e. "/"
        element: <Navigate to="home" replace />, // <-- redirect
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "add-word",
        element: <AddWord />,
      },
      {
        path: "edit-word/:wordId",
        element: <EditWord />,
        loader: wordLoader,
      },
    ],
  },
]);
