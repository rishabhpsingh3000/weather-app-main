import { useState } from "react";
import searchIcon from "./assets/searchIcon.svg";

export function Search({ query, setQuery, getForecastData}) {
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (query.trim().length > 0) {
      setOpenSearchModal(false);
    }

    getForecastData();
  };

  return (
    <>
      <button
        className="btn btn-dark mx-auto my-3"
        onClick={() => setOpenSearchModal(true)}
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        <img src={searchIcon} alt="" style={{ width: "16px" }} />
        Search Location
      </button>

      {openSearchModal && (
        <div
          id="modal"
          className={`modal fade ${
            openSearchModal ? "d-block show" : "d-none"
          }`}
          role="dialog"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Location</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => setOpenSearchModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form method="get" onSubmit={onFormSubmit}>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    type="search"
                    name=""
                    id=""
                    className="w-100 py-1 px-2 rounded-3"
                    placeholder="Enter your location."
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
