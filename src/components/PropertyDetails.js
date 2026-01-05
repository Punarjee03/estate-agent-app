import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/PropertyDetails.css';
import propertiesData from '../data/properties.json';

function PropertyDetails() {
  const { id } = useParams(); // Get property ID from URL
  const navigate = useNavigate();
  
  // Find the property with matching ID from the properties array
  const property = propertiesData.properties.find(p => p.id === id);
  
  // State for the main image being displayed
  const [selectedImage, setSelectedImage] = useState(0);

  // If property not found, show error
  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property not found</h2>
        <button onClick={() => navigate('/')}>Back to Search</button>
      </div>
    );
  }

  // Format the added date
  const formatDate = (added) => {
    return `${added.month} ${added.day}, ${added.year}`;
  };

  return (
    <div className="property-details-container">
      {/* Back Button */}
      <button className="btn-back" onClick={() => navigate('/')}>
        ← Back to Search
      </button>

      {/* Property Header */}
      <div className="property-header">
        <h1>{property.description}</h1>
        <p className="property-price">£{property.price.toLocaleString()}</p>
        <p className="property-meta">
          <span>{property.bedrooms} Bedrooms</span> | 
          <span> {property.type}</span> | 
          <span> {property.tenure}</span>
        </p>
        <p className="property-location">{property.location}</p>
      </div>

      {/* Image Gallery */}
      <div className="image-gallery">
        {/* Main Image */}
        <div className="main-image">
          <img 
            src={property.images[selectedImage]} 
            alt={`${property.description} - Image ${selectedImage + 1}`}
          />
        </div>

        {/* Thumbnail Images */}
        <div className="thumbnail-gallery">
          {property.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={selectedImage === index ? 'active' : ''}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className="gallery-arrow arrow-left"
          onClick={() => setSelectedImage(prev => 
            prev === 0 ? property.images.length - 1 : prev - 1
          )}
        >
          ‹
        </button>
        <button 
          className="gallery-arrow arrow-right"
          onClick={() => setSelectedImage(prev => 
            prev === property.images.length - 1 ? 0 : prev + 1
          )}
        >
          ›
        </button>
      </div>

      {/* Tabs Section */}
      <Tabs className="property-tabs">
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Location Map</Tab>
        </TabList>

        {/* Description Tab */}
        <TabPanel>
          <div className="tab-content">
            <h3>Property Description</h3>
            <p>{property.longDescription}</p>
            
            <div className="property-features">
              <h4>Key Features:</h4>
              <ul>
                <li>{property.bedrooms} Bedrooms</li>
                <li>Property Type: {property.type}</li>
                <li>Tenure: {property.tenure}</li>
                <li>Located in {property.location}</li>
                <li>Postcode area: {property.postcode}</li>
                <li>Added: {formatDate(property.added)}</li>
              </ul>
            </div>
          </div>
        </TabPanel>

        {/* Floor Plan Tab */}
        <TabPanel>
          <div className="tab-content">
            <h3>Floor Plan</h3>
            <div className="floor-plan-container">
              <img 
                src={property.floorPlan} 
                alt="Floor Plan"
                className="floor-plan-image"
              />
            </div>
          </div>
        </TabPanel>

        {/* Map Tab */}
        <TabPanel>
          <div className="tab-content">
            <h3>Location</h3>
            <p className="location-info" style={{ fontSize: '16px', marginBottom: '20px', color: '#34495e' }}>
              📍 {property.location}
            </p>
            <div className="map-placeholder" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              height: '450px',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center',
              padding: '40px'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📍</div>
              <h4 style={{ marginBottom: '15px', fontSize: '24px' }}>{property.location}</h4>
              <p style={{ marginBottom: '25px', fontSize: '16px', opacity: 0.9 }}>
                Postcode: {property.postcode}
              </p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'white',
                  color: '#667eea',
                  padding: '12px 30px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  display: 'inline-block',
                  transition: 'transform 0.3s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                🗺️ View on Google Maps
              </a>
            </div>
          </div>
        </TabPanel>
      </Tabs>

      {/* Action Buttons */}
      <div className="property-actions">
        <button className="btn-favourite">❤️ Add to Favourites</button>
        <button className="btn-contact">📧 Contact Agent</button>
      </div>
    </div>
  );
}

export default PropertyDetails;