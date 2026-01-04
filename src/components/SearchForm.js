import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import ReactSlider from 'react-slider';
import '../styles/SearchForm.css';

function SearchForm({ onSearch }) {
  // State to hold all search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    type: 'any',
    minPrice: 0,
    maxPrice: 1000000,
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: null,
    dateTo: null,
    postcode: ''
  });

  // Options for React-Select (Property Type)
  const propertyTypeOptions = [
    { value: 'any', label: 'Any Type' },
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' }
  ];

  // Options for Bedrooms
  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5+' }
  ];

  // Handle property type change
  const handleTypeChange = (selectedOption) => {
    setSearchCriteria(prev => ({
      ...prev,
      type: selectedOption.value
    }));
  };

  // Handle price slider change
  const handlePriceChange = (values) => {
    setSearchCriteria(prev => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1]
    }));
  };

  // Handle min bedrooms change
  const handleMinBedroomsChange = (selectedOption) => {
    setSearchCriteria(prev => ({
      ...prev,
      minBedrooms: selectedOption.value
    }));
  };

  // Handle max bedrooms change
  const handleMaxBedroomsChange = (selectedOption) => {
    setSearchCriteria(prev => ({
      ...prev,
      maxBedrooms: selectedOption.value
    }));
  };

  // Handle date from change
  const handleDateFromChange = (date) => {
    setSearchCriteria(prev => ({
      ...prev,
      dateFrom: date
    }));
  };

  // Handle date to change
  const handleDateToChange = (date) => {
    setSearchCriteria(prev => ({
      ...prev,
      dateTo: date
    }));
  };

  // Handle postcode change
  const handlePostcodeChange = (e) => {
    setSearchCriteria(prev => ({
      ...prev,
      postcode: e.target.value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert dates to string format for the search function
    const criteria = {
      ...searchCriteria,
      dateFrom: searchCriteria.dateFrom ? searchCriteria.dateFrom.toISOString().split('T')[0] : '',
      dateTo: searchCriteria.dateTo ? searchCriteria.dateTo.toISOString().split('T')[0] : ''
    };
    
    onSearch(criteria);
  };

  // Handle reset
  const handleReset = () => {
    const resetCriteria = {
      type: 'any',
      minPrice: 0,
      maxPrice: 1000000,
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: null,
      dateTo: null,
      postcode: ''
    };
    setSearchCriteria(resetCriteria);
    
    // Also reset the search results
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
        
        {/* Property Type - React Select */}
        <div className="form-group">
          <label htmlFor="type">Property Type:</label>
          <Select
            id="type"
            options={propertyTypeOptions}
            value={propertyTypeOptions.find(opt => opt.value === searchCriteria.type)}
            onChange={handleTypeChange}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select property type..."
          />
        </div>

        {/* Price Range - React Slider */}
        <div className="form-group">
          <label>Price Range: £{searchCriteria.minPrice.toLocaleString()} - £{searchCriteria.maxPrice.toLocaleString()}</label>
          <div className="slider-container">
            <ReactSlider
              className="price-slider"
              thumbClassName="slider-thumb"
              trackClassName="slider-track"
              min={0}
              max={1000000}
              step={10000}
              value={[searchCriteria.minPrice, searchCriteria.maxPrice]}
              onChange={handlePriceChange}
              pearling
              minDistance={50000}
            />
          </div>
          <div className="slider-labels">
            <span>£0</span>
            <span>£1,000,000</span>
          </div>
        </div>

        {/* Bedroom Range - React Select */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="minBedrooms">Min Bedrooms:</label>
            <Select
              id="minBedrooms"
              options={bedroomOptions}
              value={bedroomOptions.find(opt => opt.value === searchCriteria.minBedrooms)}
              onChange={handleMinBedroomsChange}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Any"
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxBedrooms">Max Bedrooms:</label>
            <Select
              id="maxBedrooms"
              options={bedroomOptions}
              value={bedroomOptions.find(opt => opt.value === searchCriteria.maxBedrooms)}
              onChange={handleMaxBedroomsChange}
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Any"
            />
          </div>
        </div>

        {/* Date Range - React Datepicker */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateFrom">Date Added From:</label>
            <DatePicker
              id="dateFrom"
              selected={searchCriteria.dateFrom}
              onChange={handleDateFromChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select start date"
              className="date-picker-input"
              isClearable
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateTo">Date Added To:</label>
            <DatePicker
              id="dateTo"
              selected={searchCriteria.dateTo}
              onChange={handleDateToChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select end date"
              className="date-picker-input"
              isClearable
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              minDate={searchCriteria.dateFrom}
            />
          </div>
        </div>

        {/* Postcode - Standard Input */}
        <div className="form-group">
          <label htmlFor="postcode">Postcode Area:</label>
          <input
            id="postcode"
            type="text"
            name="postcode"
            value={searchCriteria.postcode}
            onChange={handlePostcodeChange}
            placeholder="e.g. BR1, NW1, SW1"
            className="postcode-input"
          />
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn-search">🔍 Search Properties</button>
          <button type="button" className="btn-reset" onClick={handleReset}>🔄 Reset</button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;