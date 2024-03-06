import MainPage from "pages/MainPage/ui/MainPage";
import NotFoundPage from "pages/NotFoundPage/ui/NotFoundPage";
import { type RouteProps } from "react-router-dom";

export enum AppRoutes {
  MAIN = "main",
  NOT_FOUND = "not_found",
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePaths.main,
    element: <MainPage />,
  },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePaths.not_found,
    element: <NotFoundPage />,
  },
};
