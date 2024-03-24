import { addToFavoritesActions } from "features/AddToFavorites/model/slice/addToFavoritesSlice";
import { useEffect } from "react";
import AppRouter from "./providers/router/AppRouter";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(addToFavoritesActions.initializeFavorites());
  }, [dispatch]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
