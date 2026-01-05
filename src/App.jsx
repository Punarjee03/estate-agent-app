/**
 * Main Application Component
 * Estate Agent Property Search Application
 * 
 * This component handles:
 * - Property search functionality
 * - Favourites management
 * - Routing between pages
 * - Drag and drop functionality
 * 
 * @author Nirmanee Munasinghe
 * @id w2120300 20231347
 * @course 5COSC026W Advanced Client-Side Web Development
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import './styles/Aesthetics.css';
import SearchForm from './components/SearchForm';
import PropertyDetails from './components/PropertyDetails';
import DraggablePropertyCard from './components/DraggablePropertyCard';
import Favourites from './components/Favourites';
import propertiesData from './data/properties.json';

function App() {
  // Extract properties array from the JSON structure
  const allProperties = propertiesData.properties;
  
  // State management for search results
  const [searchResults, setSearchResults] = useState(allProperties);
  const [hasSearched, setHasSearched] = useState(false);
  
  // State management for favourites list
  const [favourites, setFavourites] = useState([]);

  /**
   * Converts the date object from JSON to a JavaScript Date for comparison
   * @param {Object} added - Date object with month, day, year properties
   * @returns {Date} JavaScript Date object
   */
  const convertDateToComparable = (added) => {
    const monthMap = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return new Date(added.year, monthMap[added.month], added.day);
  };

  /**
   * Filters properties based on search criteria
   * Supports multiple simultaneous criteria (1-5 criteria)
   * 
   * @param {Object} criteria - Search criteria object containing:
   *   - type: property type (house/flat/any)
   *   - minPrice, maxPrice: price range
   *   - minBedrooms, maxBedrooms: bedroom range
   *   - dateFrom, dateTo: date range
   *   - postcode: postcode area
   */
  const handleSearch = (criteria) => {
    let results = [...allProperties];

    // Filter by property type (case-insensitive)
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

    // Filter by date added from
    if (criteria.dateFrom) {
      const searchDateFrom = new Date(criteria.dateFrom);
      results = results.filter(property => {
        const propertyDate = convertDateToComparable(property.added);
        return propertyDate >= searchDateFrom;
      });
    }

    // Filter by date added to
    if (criteria.dateTo) {
      const searchDateTo = new Date(criteria.dateTo);
      results = results.filter(property => {
        const propertyDate = convertDateToComparable(property.added);
        return propertyDate <= searchDateTo;
      });
    }

    // Filter by postcode area
    if (criteria.postcode) {
      results = results.filter(property => 
        property.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())
      );
    }

    // Update state with filtered results
    setSearchResults(results);
    setHasSearched(true);
  };

  /**
   * Adds a property to the favourites list
   * Prevents duplicate entries
   * 
   * @param {Object} property - Property object to add to favourites
   */
  const handleAddToFavourites = (property) => {
    // Check if property is already in favourites
    const isAlreadyFavourite = favourites.some(fav => fav.id === property.id);
    
    if (isAlreadyFavourite) {
      alert('This property is already in your favourites!');
      return;
    }
    
    // Add to favourites array
    setFavourites(prev => [...prev, property]);
  };

  /**
   * Removes a property from the favourites list
   * @param {string} propertyId - ID of the property to remove
   */
  const handleRemoveFromFavourites = (propertyId) => {
    setFavourites(prev => prev.filter(fav => fav.id !== propertyId));
  };

  /**
   * Clears all properties from the favourites list
   * Shows confirmation dialog before clearing
   */
  const handleClearAllFavourites = () => {
    if (window.confirm('Are you sure you want to clear all favourites?')) {
      setFavourites([]);
    }
  };

  /**
   * Home/Search Page Component
   * Displays search form, results, and favourites sidebar
   */
  const HomePage = () => (
    <>
      {/* Header section */}
      <header className="App-header">
        <h1>Estate Agent Property Search</h1>
        <p>Find your dream property in London</p>
      </header>

      {/* Main content area */}
      <main className="main-content">
        {/* Search form component */}
        <SearchForm onSearch={handleSearch} />

        {/* Search results section */}
        <div className="results-section">
          <h2>
            {hasSearched 
              ? `Found ${searchResults.length} ${searchResults.length === 1 ? 'property' : 'properties'}`
              : `Showing all ${searchResults.length} properties`
            }
          </h2>

          {/* Display property cards or no results message */}
          {searchResults.length > 0 ? (
            <div className="properties-grid">
              {searchResults.map(property => (
                <DraggablePropertyCard
                  key={property.id}
                  property={property}
                  onAddToFavourites={handleAddToFavourites}
                  isFavourite={favourites.some(fav => fav.id === property.id)}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No properties found matching your criteria. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer section */}
      <footer className="App-footer">
        <p>&copy; 2024 Estate Agent App | Westminster University Project</p>
      </footer>

      {/* Favourites sidebar - fixed position on right */}
      <Favourites 
        favourites={favourites}
        onRemove={handleRemoveFromFavourites}
        onClearAll={handleClearAllFavourites}
      />
    </>
  );

  // Set basename for GitHub Pages deployment, empty for localhost
  const basename = process.env.NODE_ENV === 'production' ? '/estate-agent-app' : '';

  return (
    // Wrap entire app with DnD provider for drag and drop functionality
    <DndProvider backend={HTML5Backend}>
      {/* Router for navigation between pages - basename changes based on environment */}
      <Router basename={basename}>
        <div className="App">
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<HomePage />} />
            {/* Individual property details route */}
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;