import CatFilter from "../../components/cat-filter/cat-filter";
import CatsList from "../../components/cats-list/cats-list";

import "./cats-list-route.scss";

function CatsListRoute () {
  return <div className="cats-list-route _container">
    <CatFilter/>
    <CatsList/>
  </div>;
}

export default CatsListRoute;
