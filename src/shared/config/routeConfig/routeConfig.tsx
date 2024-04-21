import MainPage from "pages/MainPage/ui/MainPage";
import ArrivalsPage from "pages/ArrivalsPage/ui/ArrivalsPage";
import { AboutPage } from "pages/AboutPage";
import NotFoundPage from "pages/NotFoundPage/ui/NotFoundPage";
import { type RouteProps } from "react-router-dom";
import { ContactsPage } from "pages/ContactsPage";
import { SearchPage } from "pages/SearchPage";

export enum AppRoutes {
  MAIN = "main",
  SEARCH = "search",
  ARRIVALS = "arrivals",
  ABOUT = "about",
  CONTACTS = "contacts",
  NOT_FOUND = "not_found",
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.SEARCH]: "search",
  [AppRoutes.ARRIVALS]: "arrivals",
  [AppRoutes.ABOUT]: "about",
  [AppRoutes.CONTACTS]: "contacts",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePaths.main,
    element: <MainPage />,
  },

  [AppRoutes.SEARCH]: {
    path: RoutePaths.search,
    element: <SearchPage />,
  },

  [AppRoutes.ARRIVALS]: {
    path: RoutePaths.arrivals,
    element: <ArrivalsPage />,
  },

  [AppRoutes.ABOUT]: {
    path: RoutePaths.about,
    element: <AboutPage />,
  },

  [AppRoutes.CONTACTS]: {
    path: RoutePaths.contacts,
    element: <ContactsPage />,
  },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePaths.not_found,
    element: <NotFoundPage />,
  },
};
