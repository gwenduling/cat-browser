import { useParams } from "react-router-dom";
import CatDetails from "../../components/cat-details/cat-details";

function CatDetailsRoute () {
  const params = useParams();

  return <CatDetails id={params.id!}/>;
}

export default CatDetailsRoute;
