/**
 * Search Functionality Tests
 * 
 * Tests the property search filtering logic:
 * - Filter by property type
 * - Filter by price range
 * - Filter by bedrooms
 * - Filter by multiple criteria simultaneously
 */

import propertiesData from '../data/properties.json';

describe('Search Functionality', () => {
  const allProperties = propertiesData.properties;

  // Helper function to convert date object
  const convertDateToComparable = (added) => {
    const monthMap = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return new Date(added.year, monthMap[added.month], added.day);
  };

  test('filters properties by type (House)', () => {
    const criteria = { type: 'house' };
    
    const results = allProperties.filter(property => 
      property.type.toLowerCase() === criteria.type.toLowerCase()
    );
    
    expect(results.length).toBeGreaterThan(0);
    results.forEach(property => {
      expect(property.type.toLowerCase()).toBe('house');
    });
  });

  test('filters properties by type (Flat)', () => {
    const criteria = { type: 'flat' };
    
    const results = allProperties.filter(property => 
      property.type.toLowerCase() === criteria.type.toLowerCase()
    );
    
    expect(results.length).toBeGreaterThan(0);
    results.forEach(property => {
      expect(property.type.toLowerCase()).toBe('flat');
    });
  });

  test('filters properties by minimum price', () => {
    const criteria = { minPrice: 400000 };
    
    const results = allProperties.filter(property => 
      property.price >= criteria.minPrice
    );
    
    expect(results.length).toBeGreaterThan(0);
    results.forEach(property => {
      expect(property.price).toBeGreaterThanOrEqual(400000);
    });
  });

  test('filters properties by maximum price', () => {
    const criteria = { maxPrice: 500000 };
    
    const results = allProperties.filter(property => 
      property.price <= criteria.maxPrice
    );
    
    expect(results.length).toBeGreaterThan(0);
    results.forEach(property => {
      expect(property.price).toBeLessThanOrEqual(500000);
    });
  });

  test('filters properties by price range', () => {
    const criteria = { minPrice: 300000, maxPrice: 600000 };
    
    const results = allProperties.filter(property => 
      property.price >= criteria.minPrice && property.price <= criteria.maxPrice
    );
    
    expect(results.length).toBeGreaterThan(0);
    results.forEach(property => {
      expect(property.price).toBeGreaterThanOrEqual(300000);
      expect(property.price).toBeLessThanOrEqual(600000);
    });
  });

  test('filters properties by minimum bedrooms', () => {
    const criteria = { minBedrooms: 3 };
    
    const results = allProperties.filter(property => 
      property.bedrooms >= criteria.minBedrooms
    );
    
    expect(results.length).toBeGreaterThan(0);
    results.forEach(property => {
      expect(property.bedrooms).toBeGreaterThanOrEqual(3);
    });
  });

  test('filters properties by postcode', () => {
    const criteria = { postcode: 'BR' };
    
    const results = allProperties.filter(property => 
      property.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())
    );
    
    expect(results.length).toBeGreaterThan(0);
    results.forEach(property => {
      expect(property.postcode.toLowerCase()).toContain('br');
    });
  });

  test('filters properties by multiple criteria simultaneously', () => {
    const criteria = { 
      type: 'house', 
      minPrice: 400000,
      minBedrooms: 3
    };
    
    let results = allProperties.filter(property => 
      property.type.toLowerCase() === criteria.type.toLowerCase()
    );
    
    results = results.filter(property => 
      property.price >= criteria.minPrice
    );
    
    results = results.filter(property => 
      property.bedrooms >= criteria.minBedrooms
    );
    
    results.forEach(property => {
      expect(property.type.toLowerCase()).toBe('house');
      expect(property.price).toBeGreaterThanOrEqual(400000);
      expect(property.bedrooms).toBeGreaterThanOrEqual(3);
    });
  });

  test('returns all properties when no criteria specified', () => {
    const criteria = { type: 'any' };
    
    const results = allProperties.filter(property => 
      criteria.type === 'any' || property.type.toLowerCase() === criteria.type.toLowerCase()
    );
    
    expect(results.length).toBe(allProperties.length);
  });

  test('returns empty array when no properties match criteria', () => {
    const criteria = { minPrice: 9999999 }; // Impossibly high price
    
    const results = allProperties.filter(property => 
      property.price >= criteria.minPrice
    );
    
    expect(results.length).toBe(0);
  });
});