import React, { useState } from 'react';
import '../styles/SearchForm.css';

function SearchForm({ onSearch }) {
  // State to hold all search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: '',
    dateTo: '',
    postcode: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  // Handle reset
  const handleReset = () => {
    setSearchCriteria({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: '',
      dateTo: '',
      postcode: ''
    });
    onSearch({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: '',
      dateTo: '',
      postcode: ''
    });
  };

  return (
    <div className="search-form-container">
      <h2>Search Properties</h2>
      <form onSubmit={handleSubmit} className="search-form">
        
        {/* Property Type */}
        <div className="form-group">
          <label htmlFor="type">Property Type:</label>
          <select 
            id="type"
            name="type" 
            value={searchCriteria.type} 
            onChange={handleChange}
          >
            <option value="any">Any</option>
            <option value="house">House</option>
            <option value="flat">Flat</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="minPrice">Min Price (£):</label>
            <input
              id="minPrice"
              type="number"
              name="minPrice"
              value={searchCriteria.minPrice}
              onChange={handleChange}
              placeholder="e.g. 200000"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxPrice">Max Price (£):</label>
            <input
              id="maxPrice"
              type="number"
              name="maxPrice"
              value={searchCriteria.maxPrice}
              onChange={handleChange}
              placeholder="e.g. 500000"
              min="0"
            />
          </div>
        </div>

        {/* Bedroom Range */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="minBedrooms">Min Bedrooms:</label>
            <input
              id="minBedrooms"
              type="number"
              name="minBedrooms"
              value={searchCriteria.minBedrooms}
              onChange={handleChange}
              placeholder="e.g. 1"
              min="0"
              max="10"
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxBedrooms">Max Bedrooms:</label>
            <input
              id="maxBedrooms"
              type="number"
              name="maxBedrooms"
              value={searchCriteria.maxBedrooms}
              onChange={handleChange}
              placeholder="e.g. 3"
              min="0"
              max="10"
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateFrom">Date Added From:</label>
            <input
              id="dateFrom"
              type="date"
              name="dateFrom"
              value={searchCriteria.dateFrom}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateTo">Date Added To:</label>
            <input
              id="dateTo"
              type="date"
              name="dateTo"
              value={searchCriteria.dateTo}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Postcode */}
        <div className="form-group">
          <label htmlFor="postcode">Postcode Area:</label>
          <input
            id="postcode"
            type="text"
            name="postcode"
            value={searchCriteria.postcode}
            onChange={handleChange}
            placeholder="e.g. BR1, NW1"
          />
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn-search">Search Properties</button>
          <button type="button" className="btn-reset" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;