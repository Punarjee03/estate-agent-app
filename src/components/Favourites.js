import React from 'react';
import { useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import '../styles/Favourites.css';

function Favourites({ favourites, onRemove, onClearAll }) {
  // Set up drop zone for drag and drop
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROPERTY_CARD',
    drop: () => ({ name: 'FavouritesList' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div 
      ref={drop}
      className={`favourites-sidebar ${isOver ? 'drag-over' : ''}`}
    >
      <div className="favourites-header">
        <h3>❤️ My Favourites</h3>
        {favourites.length > 0 && (
          <button 
            className="btn-clear-all" 
            onClick={onClearAll}
            title="Clear all favourites"
          >
            🗑️ Clear All
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <div className="favourites-empty">
          <p>No favourites yet!</p>
          <p className="hint">Click ❤️ or drag properties here</p>
        </div>
      ) : (
        <div className="favourites-list">
          {favourites.map((property) => (
            <div key={property.id} className="favourite-item">
              <Link to={`/property/${property.id}`} className="favourite-link">
                <img 
                  src={property.picture} 
                  alt={property.description}
                  className="favourite-image"
                />
                <div className="favourite-info">
                  <h4>{property.type}</h4>
                  <p className="favourite-price">£{property.price.toLocaleString()}</p>
                  <p className="favourite-location">{property.bedrooms} beds</p>
                </div>
              </Link>
              <button
                className="btn-remove"
                onClick={(e) => {
                  e.preventDefault();
                  onRemove(property.id);
                }}
                title="Remove from favourites"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="favourites-count">
        {favourites.length} {favourites.length === 1 ? 'property' : 'properties'} saved
      </div>
    </div>
  );
}

export default Favourites;