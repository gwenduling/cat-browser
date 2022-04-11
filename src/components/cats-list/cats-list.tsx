import { useContext, useEffect, useState } from "react";
import CatContext from "../../context/cat-context";
import { API_KEY, BASE_URL } from "../../data/constants";
import { Cat } from "../../models/cat";
import { LoadingStatus } from "../../models/status";
import Button from "../button/button";

import "./cats-list.scss";

function CatsList () {
  const [cats, setCats] = useState([] as Cat[]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const catContext = useContext(CatContext);

  const loadCats = () => {
    if (catContext.breed === "") return;

    catContext.updateLoadingStatus(LoadingStatus.Loading);
    fetch(
      `${BASE_URL}images/search?order=ASC&page=${page}&limit=10&breed_id=${catContext.breed}`,
      { headers: { "x-api-key": API_KEY } }
    )
      .then((res) => {
        const paginationCount = res.headers.get("pagination-count");
        if (paginationCount) {
          setPageCount(parseInt(paginationCount, 0));
        }

        return res.json();
      })
      .then((res) => {
        if (page === 1) {
          setCats(res);
        } else {
          setCats(cats.concat(res));
        }

        if (pageCount <= (page * 10)) {
          setShowLoadMore(false);
        } else if (page === 1 && pageCount > 10) {
          setShowLoadMore(true);
        }
        setPage(page + 1);
      }).catch(() => {
        // TODO: Notify error
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

  return <div>
    <div className="cats-list">
      {cats.length === 0
        ? <p>No cats available</p>
        : cats.map((cat: Cat, index: number) =>
          <div className="cat-item" key={index}>
            <img src={cat.url} alt={cat.breeds?.[0]?.name}/>
            <div className="content">
              <Button
                content="View Details"
                block={true}
                onClick={() => {
                /* TODO: navigate to details route */
                }}
              />
            </div>
          </div>
        )}
    </div>

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
