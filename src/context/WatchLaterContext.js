import React, { createContext, useContext, useState } from "react";

const WatchLaterContext = createContext();

export const useWatchLater = () => useContext(WatchLaterContext);

export const WatchLaterProvider = ({ children }) => {
    const [watchList, setWatchList] = useState([]);

    const addToWatchLater = (movie) => {
        setWatchList((prev) =>
          prev.find((m) => m.id === movie.id) ? prev : [...prev, movie]
        );
      };      
      const removeFromWatchLater = (id) => {
        setWatchList((prev) => prev.filter((m) => m.id !== id));
      };      
    const isInWatchList = (movieId) => {
        return watchList.some((m) => m.id === movieId);
      };

    return (
        <WatchLaterContext.Provider value={{ watchList, addToWatchLater, removeFromWatchLater, isInWatchList }} >
            {children}
        </WatchLaterContext.Provider>
    )
}