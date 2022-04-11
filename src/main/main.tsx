import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CatContext, { CatContextModel } from "../context/cat-context";
import { Breed } from "../models/breeds";
import { LoadingStatus } from "../models/status";
import CatDetailsRoute from "../routes/cat-details/cat-details-route";
import CatsListRoute from "../routes/cats-list/cats-list-route";
import "./main.scss";

function Main () {
  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.None);
  const [breed, setBreed] = useState("" as Breed["id"]);

  const getContextValue = (): CatContextModel => {
    return {
      breed,
      loadingStatus,
      updateBreed: (breedId: Breed["id"]) => {
        setBreed(breedId);
      },
      updateLoadingStatus: (status: LoadingStatus) => {
        setLoadingStatus(status);
      }
    };
  };

  return (
    <CatContext.Provider value={getContextValue()}>
      <div className="body-root">
        <div className="body-header"> {/* TODO: header */} </div>
        <main className="body-main">
          <Routes>
            <Route path="/" element={<CatsListRoute />}></Route>
            <Route path="/cat" element={<CatDetailsRoute />}></Route>
          </Routes>
        </main>
      </div>
    </CatContext.Provider>
  );
}
export default Main;
