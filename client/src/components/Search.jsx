import { useState } from "react";

export default function Search({ onSearch }) {
  const [searchText, setSearchText] = useState("");
  const [criteria, setCriteria] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchText.trim(), criteria);
  };

  const handleClear = () => {
    setSearchText("");
    onSearch("", ""); // reset results
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="user"
          className="svg-inline--fa fa-user SearchBar_icon__cXpTg"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3 0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3 448 381.6 370.4 304 274.7 304z"
          ></path>
        </svg>
        <span>Users</span>
      </h2>

      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search users..."
          name="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {searchText && (
          <button
            type="button"
            className="btn close-btn"
            onClick={handleClear}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        )}

        <button className="btn" type="submit">
          <i className="fa-solid fa-magnifying-glass" />
        </button>
      </div>

      <div className="filter">
        <span>Search Criteria:</span>
        <select
          name="criteria"
          className="criteria"
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
        >
          <option value="">Not selected</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>
    </form>
  );
}