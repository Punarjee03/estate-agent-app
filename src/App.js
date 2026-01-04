import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import propertiesData from './data/properties.json';

function App() {
  // State to hold search results
  const [searchResults, setSearchResults] = useState(propertiesData);
  const [hasSearched, setHasSearched] = useState(false);

  // Search function - filters properties based on criteria
  const handleSearch = (criteria) => {
    let results = [...propertiesData];

    // Filter by type
    if (criteria.type !== 'any') {
      results = results.filter(property => property.type === criteria.type);
    }

    // Filter by minimum price
    if (criteria.minPrice) {
      results = results.filter(property => property.price >= Number(criteria.minPrice));
    }

    // Filter by maximum price
    if (criteria.maxPrice) {
      results = results.filter(property => property.price <= Number(criteria.maxPrice));
    }

    // Filter by minimum bedrooms
    if (criteria.minBedrooms) {
      results = results.filter(property => property.bedrooms >= Number(criteria.minBedrooms));
    }

    // Filter by maximum bedrooms
    if (criteria.maxBedrooms) {
      results = results.filter(property => property.bedrooms <= Number(criteria.maxBedrooms));
    }

    // Filter by date from
    if (criteria.dateFrom) {
      results = results.filter(property => new Date(property.dateAdded) >= new Date(criteria.dateFrom));
    }

    // Filter by date to
    if (criteria.dateTo) {
      results = results.filter(property => new Date(property.dateAdded) <= new Date(criteria.dateTo));
    }

    // Filter by postcode
    if (criteria.postcode) {
      results = results.filter(property => 
        property.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())
      );
    }

    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Estate Agent Property Search</h1>
        <p>Find your dream property in London</p>
      </header>

      <main className="main-content">
        <SearchForm onSearch={handleSearch} />

        {/* Search Results */}
        <div className="results-section">
          <h2>
            {hasSearched 
              ? `Found ${searchResults.length} ${searchResults.length === 1 ? 'property' : 'properties'}`
              : `Showing all ${searchResults.length} properties`
            }
          </h2>

          {searchResults.length > 0 ? (
            <div className="properties-grid">
              {searchResults.map(property => (
                <div key={property.id} className="property-card">
                  <img src={property.images[0]} alt={property.description} />
                  <div className="property-info">
                    <h3>{property.description}</h3>
                    <p className="property-price">£{property.price.toLocaleString()}</p>
                    <p className="property-details">
                      <span>{property.bedrooms} bedrooms</span> | 
                      <span> {property.type}</span>
                    </p>
                    <p className="property-location">{property.location}</p>
                    <button className="btn-view-details">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No properties found matching your criteria. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>&copy; 2024 Estate Agent App | Westminster University Project</p>
      </footer>
    </div>
  );
}

export default App;