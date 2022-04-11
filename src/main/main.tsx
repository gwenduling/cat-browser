import { Routes, Route } from "react-router-dom";
import CatDetailsRoute from "../routes/cat-details/cat-details-route";
import CatsListRoute from "../routes/cats-list/cats-list-route";
import "./main.scss";

function Main () {
  return (
    <div className="body-root">
      <div className="body-header"> {/* TODO: header */} </div>
      <main className="body-main">
        <Routes>
          <Route path="/" element={<CatsListRoute />}></Route>
          <Route path="/cat" element={<CatDetailsRoute />}></Route>
        </Routes>
      </main>
    </div>
  );
}
export default Main;
