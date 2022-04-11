import { useContext, useEffect, useState } from "react";
import CatContext from "../../context/cat-context";
import { BASE_URL } from "../../data/constants";
import { Breed } from "../../models/breeds";
import { LoadingStatus } from "../../models/status";

import "./cat-filter.scss";

function CatFilter () {
  const [breeds, setBreeds] = useState([] as Breed[]);
  const catContext = useContext(CatContext);

  const defaultOption: Breed = {
    id: "",
    name: "Select Breed"
  };

  useEffect(() => {
    fetch(BASE_URL + "breeds")
      .then((res) => res.json())
      .then((res) => {
        setBreeds(res);
      });
  }, []);

  return <div className="cat-filter">
    <p className="label">Breed:</p>&nbsp;
    <select
      className="_input"
      onChange={(val) => catContext.updateBreed(val.target.value)}
      value={catContext.breed}
      disabled={catContext.loadingStatus === LoadingStatus.Loading}
    >
      {[defaultOption].concat(breeds).map((breed: Breed, i: number) => (
        <option key={i} value={breed.id}> {breed.name} </option>
      ))}
    </select>
  </div>;
}

export default CatFilter;
