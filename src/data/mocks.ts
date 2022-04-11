import { CatContextModel } from "../context/cat-context";
import { Breed } from "../models/breeds";
import { Cat } from "../models/cat";
import { LoadingStatus } from "../models/status";

export const mockBreedsResponse: Breed[] = [
  {
    id: "test",
    name: "Test"
  }
];

export const mockCatResponse: Cat = {
  id: "test",
  url: "img.jpg",
  breeds: [{
    name: "Abyssinian",
    origin: "Egypt",
    temperament: "Active, Energetic, Independent, Intelligent, Gentle",
    description: "lorem ipsum dolor ismet"
  }]
};

export const mockCatsResponse: Cat[] = [mockCatResponse, mockCatResponse];

export const mockContextValue: CatContextModel = {
  breed: "bsho",
  updateBreed: jest.fn().mockImplementation(() => ({})),
  loadingStatus: LoadingStatus.Loaded,
  updateLoadingStatus: () => {}
};

export const mockNavigator = jest.fn().mockImplementation(() => ({}));
