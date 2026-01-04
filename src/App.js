import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SearchForm from './components/SearchForm';
import PropertyDetails from './components/PropertyDetails';
import propertiesData from './data/properties.json';

function App() {
  // Extract properties array from the JSON structure
  const allProperties = propertiesData.properties;
  
  // State to hold search results
  const [searchResults, setSearchResults] = useState(allProperties);
  const [hasSearched, setHasSearched] = useState(false);

  // Helper function to convert date object to comparable format
  const convertDateToComparable = (added) => {
    const monthMap = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return new Date(added.year, monthMap[added.month], added.day);
  };

  // Search function - filters properties based on criteria
  const handleSearch = (criteria) => {
    let results = [...allProperties];

    // Filter by type (case-insensitive)
    if (criteria.type !== 'any') {
      results = results.filter(property => 
        property.type.toLowerCase() === criteria.type.toLowerCase()
      );
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
      const searchDateFrom = new Date(criteria.dateFrom);
      results = results.filter(property => {
        const propertyDate = convertDateToComparable(property.added);
        return propertyDate >= searchDateFrom;
      });
    }

    // Filter by date to
    if (criteria.dateTo) {
      const searchDateTo = new Date(criteria.dateTo);
      results = results.filter(property => {
        const propertyDate = convertDateToComparable(property.added);
        return propertyDate <= searchDateTo;
      });
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

  // Home/Search Page Component
  const HomePage = () => (
    <>
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
                  <img src={property.picture} alt={property.description} />
                  <div className="property-info">
                    <h3>{property.description}</h3>
                    <p className="property-price">£{property.price.toLocaleString()}</p>
                    <p className="property-details">
                      <span>{property.bedrooms} bedrooms</span> | 
                      <span> {property.type}</span>
                    </p>
                    <p className="property-location">{property.location}</p>
                    <Link to={`/property/${property.id}`}>
                      <button className="btn-view-details">View Details</button>
                    </Link>
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
    </>
  );

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;