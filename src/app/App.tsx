import { addToFavoritesActions } from "features/AddToFavorites/model/slice/addToFavoritesSlice";
import { useEffect } from "react";
import AppRouter from "./providers/router/AppRouter";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Navbar } from "widgets/Navbar";
import "./App.scss";
import { Footer } from "widgets/Footer";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(addToFavoritesActions.initializeFavorites());
  }, [dispatch]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <AppRouter />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
