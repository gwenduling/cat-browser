import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../data/constants";
import { Cat } from "../../models/cat";
import Button from "../button/button";

import "./cat-details.scss";

function CatDetails (props: Props) {
  const [cat, setCat] = useState(null as null | Cat);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(BASE_URL + `images/${props.id}`, { headers: { "x-api-key": API_KEY } })
      .then((res) => res.json())
      .then((res) => {
        setCat(res);
      }).catch(() => {
        // TODO: Notify error
      });
  }, [props.id]);

  return <div className="cat-details _container">
    <Button content="Go Back" onClick={() => {
      navigate(
        "../",
        { replace: true }
      );
    }}/>

    {cat
      ? <div>
        <img src={cat.url} alt={cat.breeds?.[0]?.name}/>
        <p className="name">{cat.breeds?.[0]?.name}</p>
        <p className="origin">{cat.breeds?.[0]?.origin}</p>
        <p className="temperament">{cat.breeds?.[0]?.temperament}</p>
        <p className="description">{cat.breeds?.[0]?.description}</p>
      </div>
      : <p>Loading ...</p>
    }

  </div>;
}

export default CatDetails;

interface Props {
  id: string;
}
