import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CatContext from "../../context/cat-context";
import { API_KEY, BASE_URL, DEFAULT_ERROR_MESSAGE } from "../../data/constants";
import { Cat } from "../../models/cat";
import { LoadingStatus } from "../../models/status";
import Button from "../button/button";

import "./cats-list.scss";

function CatsList () {
  const [cats, setCats] = useState([] as Cat[]);
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const catContext = useContext(CatContext);
  const navigate = useNavigate();

  const showError = (message: string): void => {
    toast(message, { type: "error" });
    if (page === 1) {
      setCats([]);
      setShowLoadMore(false);
    }
  };

  const loadCats = () => {
    if (catContext.breed === "") {
      setCats([]);
      setShowLoadMore(false);
      return;
    };

    let pageCount: number;
    catContext.updateLoadingStatus(LoadingStatus.Loading);
    fetch(
      `${BASE_URL}images/search?page=${page}&limit=10&breed_id=${catContext.breed}`,
      { headers: { "x-api-key": API_KEY } }
    )
      .then((res) => {
        const pageCountString = res?.headers?.get("pagination-count");
        if (pageCountString) {
          pageCount = parseInt(pageCountString, 0);
        }

        return res.json();
      })
      .then((res) => {
        // notify errors passed in response with message
        if (res.status &&
          res.status !== 200 &&
          res.message) {
          showError(res.message);
          return;
        }

        /**
         * notify error when info from count expects a
         * response but API responded with empty array
         */
        if (res.length === 0) {
          showError(DEFAULT_ERROR_MESSAGE);
          return;
        }

        setCats(page === 1 ? res : cats.concat(res));

        if (pageCount <= (page * 10)) {
          setShowLoadMore(false);
        } else if (page === 1 && pageCount > 10) {
          setShowLoadMore(true);
        }
        setPage(page + 1);
      }).catch(() => {
        showError(DEFAULT_ERROR_MESSAGE);
      })
      .finally(() => {
        catContext.updateLoadingStatus(LoadingStatus.Loaded);
      });
  };

  useEffect(() => {
    setPage(1);
  }, [catContext.breed]);

  useEffect(() => {
    if (page === 1) {
      loadCats();
    }
  }, [page, catContext.breed]);

  return <div className="cats-list-component">
    <div className="cats-list">
      {cats.map((cat: Cat, index: number) =>
        <div className="cat-item" key={index}>
          <img src={cat.url} alt={cat.breeds?.[0]?.name}/>
          <div className="content">
            <Button
              content="View Details"
              block={true}
              onClick={() => {
                navigate(
                  `../${cat.id}`,
                  { replace: true }
                );
              }}
            />
          </div>
        </div>
      )}
    </div>

    {catContext.loadingStatus === LoadingStatus.Loading && <p>Loading ...</p>}

    {catContext.loadingStatus === LoadingStatus.Loaded &&
      cats.length === 0 && <p>No cats available</p>}

    { showLoadMore
      ? <Button
        content="Load More"
        block={true}
        success={true}
        onClick={() => loadCats()}
        disabled={catContext.loadingStatus === LoadingStatus.Loading}/>
      : ""}
  </div>;
}

export default CatsList;
