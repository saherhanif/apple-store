import React from "react";
import "./filter.css";

function Filter({ filters, setFilters }) {
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(5500);
  const [type, setType] = React.useState("all");

  function handleMinPriceChange(event) {
    setMinPrice(event.target.value);
  }

  function handleMaxPriceChange(event) {
    setMaxPrice(event.target.value);
  }

  function handleTypeChange(event) {
    setType(event.target.value);
  }
  
  React.useEffect(() => {
    setFilters({
      minPrice,
      maxPrice,
      type
    });
  }, [minPrice, maxPrice, type, setFilters]);

  return (
    <form className="filterContainer">
      <label>
        Min price:
        <input
          type="range"
          id="min-price"
          min="0"
          max="5500"
          step="10"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        {minPrice}
      </label>
      <label>
        Max price:
        <input
          type="range"
          id="min-price"
          min="0"
          max="5500"
          step="10"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
        {maxPrice} 
      </label>
      <label>
        Type:
        <select value={type} onChange={handleTypeChange}>
          <option value="all">All</option>
          <option value="iphone">iPhone</option>
          <option value="ipad">iPad</option>
          <option value="airpods">AirPods</option>
        </select>
      </label>
    </form>
  );
}

export default Filter;
