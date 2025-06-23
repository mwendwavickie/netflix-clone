import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {doc, getDoc, setDoc, updateDoc, } from "firebase/firestore";
import { useAuth } from './AuthContext';

const WatchLaterContext = createContext();

export const useWatchLater = () => useContext(WatchLaterContext);

export const WatchLaterProvider = ({ children }) => {
    const [watchList, setWatchList] = useState([]);
    const { currentUser } = useAuth();

    // Fetch on login
    useEffect(() => {
      const fetchWatchlist = async () => {
        if (currentUser) {
          const docRef = doc(db, "watchlists", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setWatchList(docSnap.data().movies || []);
          }
        }
      };
      fetchWatchlist();
    }, [currentUser]);

    //Sync to Firestore
    useEffect(() => {
      const saveToFirestore = async () => {
        if (currentUser) {
          const docRef = doc(db, "watchlists", currentUser.uid);
          await setDoc(docRef, { movies: watchList });
        }
      };
      saveToFirestore();
    }, [watchList, currentUser]);

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
        <WatchLaterContext.Provider value={{ watchList, addToWatchLater, removeFromWatchLater, isInWatchList, setWatchList }} >
            {children}
        </WatchLaterContext.Provider>
    )
}