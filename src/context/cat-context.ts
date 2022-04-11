import React from "react";
import { Breed } from "../models/breeds";
import { LoadingStatus } from "../models/status";

export const defaultValue: CatContextModel = {
  breed: "",
  updateBreed: (breedId: Breed["id"]) => {},
  loadingStatus: LoadingStatus.None,
  updateLoadingStatus: (status: LoadingStatus) => {}
};

const CatContext = React.createContext(defaultValue);
export default CatContext;

export interface CatContextModel {
  breed: Breed["id"];
  updateBreed: (breedId: Breed["id"]) => void;
  loadingStatus: LoadingStatus;
  updateLoadingStatus: (status: LoadingStatus) => void;
}
