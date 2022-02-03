import React from "react";
import { Home, Signup, Login, Auth, Dashboard } from "../pages/Index";

export const ROUTES = [
  {
    path: "/",
    key: "APP_HOME",
    exact: true,
    component: () => <Home />,
  },
  {
    path: "/auth",
    key: "APP_AUTH",
    component: () => <Auth />,
  },
  {
    path: "/dashboard",
    key: "APP_DASHBOARD",
    component: () => <Dashboard />,
  },
];

export const AUTH_ROUTES = [
  {
    path: "/auth/signup",
    key: "APP_SIGNUP",
    exact: true,
    component: () => <Signup />,
  },
  {
    path: "/auth/login",
    key: "APP_LOGIN",
    exact: true,
    component: () => <Login />,
  },
];
