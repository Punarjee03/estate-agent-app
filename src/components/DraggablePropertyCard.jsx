import React from 'react';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';

function DraggablePropertyCard({ property, onAddToFavourites, isFavourite }) {
  // Set up drag functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY_CARD',
    item: { property },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && dropResult.name === 'FavouritesList') {
        // Property was dropped on favourites list
        onAddToFavourites(property);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={drag}
      className={`property-card ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      <img src={property.picture} alt={property.description} />
      <div className="property-info">
        <h3>{property.description}</h3>
        <p className="property-price">£{property.price.toLocaleString()}</p>
        <p className="property-details">
          <span>{property.bedrooms} bedrooms</span> | 
          <span> {property.type}</span>
        </p>
        <p className="property-location">{property.location}</p>
        
        <div className="card-actions">
          <Link to={`/property/${property.id}`}>
            <button className="btn-view-details">View Details</button>
          </Link>
          
          <button 
            className={`btn-favourite ${isFavourite ? 'is-favourite' : ''}`}
            onClick={() => onAddToFavourites(property)}
            title={isFavourite ? 'Already in favourites' : 'Add to favourites'}
          >
            {isFavourite ? '💙' : '🤍'} {isFavourite ? 'Saved' : 'Save'}
          </button>
        </div>
        
        <p className="drag-hint">👆 Drag me to favourites!</p>
      </div>
    </div>
  );
}

export default DraggablePropertyCard;