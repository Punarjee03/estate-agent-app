# Security Implementation

## Client-Side Security Measures

This application implements several security measures to protect against common client-side attacks:

### 1. Content Security Policy (CSP)

A Content Security Policy has been implemented via meta tag in `public/index.html` to:

- **Prevent XSS attacks**: By restricting where scripts can be loaded from
- **Control resource loading**: Only allowing resources from trusted sources
- **Restrict inline scripts**: Limiting the execution of inline JavaScript
- **Control frame sources**: Only allowing Google Maps iframes

**CSP Configuration:**
```
default-src 'self'
script-src 'self' 'unsafe-inline' 'unsafe-eval'
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
img-src 'self' data: https: http:
font-src 'self' https://fonts.gstatic.com
connect-src 'self' https://maps.googleapis.com https://maps.google.com
frame-src https://maps.google.com
```

**Note**: Some 'unsafe-inline' and 'unsafe-eval' directives are required for React in development mode and for certain React libraries. In a production environment, these should be further restricted.

### 2. React's Built-in XSS Protection

React automatically escapes content rendered in JSX, providing protection against Cross-Site Scripting (XSS) attacks:

- All user input is automatically escaped
- HTML entities are converted to safe strings
- No use of `dangerouslySetInnerHTML` anywhere in the codebase

**Example:**
```javascript
// React automatically escapes this - safe from XSS
<h3>{property.description}</h3>
<p>{searchCriteria.postcode}</p>
```

### 3. Input Validation

All form inputs use HTML5 validation attributes:

- **Type validation**: `type="number"`, `type="date"`, `type="text"`
- **Min/Max constraints**: Price and bedroom inputs have appropriate ranges
- **Pattern matching**: Postcode input accepts alphanumeric characters
- **Required fields**: Critical fields are marked as required

### 4. URL Parameter Sanitization

Property IDs from URL parameters are validated before use:

```javascript
// In PropertyDetails.js
const property = propertiesData.properties.find(p => p.id === id);

if (!property) {
  return <div className="property-not-found">Property not found</div>;
}
```

This prevents injection attacks through URL manipulation.

### 5. Safe Data Handling

- **No eval() usage**: The application does not use `eval()` or `Function()` constructor
- **JSON parsing**: All JSON data is safely parsed using `JSON.parse()`
- **No localStorage/sessionStorage**: State is managed in React components only during the session

### 6. Third-Party Dependencies

All third-party libraries are from trusted sources:
- React (Facebook/Meta)
- React Router (React Training)
- React-Select, React-Datepicker, React-Slider (well-maintained community libraries)
- React-DnD (Dan Abramov's drag-and-drop library)

Regular `npm audit` checks are performed to identify and fix vulnerabilities.

### 7. HTTPS Enforcement (Production)

When deployed, the application should be served over HTTPS to ensure:
- Encrypted data transmission
- Protection against man-in-the-middle attacks
- Secure cookie transmission (if cookies are added in future)

## Security Best Practices Followed

1.  **No inline event handlers in HTML** - All events use React's synthetic event system
2.  **No direct DOM manipulation** - All UI updates through React state
3.  **Parameterized queries** - No string concatenation for dynamic content
4.  **No sensitive data in client code** - No API keys, passwords, or secrets
5.  **Safe routing** - React Router handles navigation securely
6.  **No arbitrary code execution** - No dynamic imports of untrusted code

## Limitations

As a client-side only application:
- All data validation happens on the client (in a real application, server-side validation is essential)
- No authentication/authorization implemented (would require backend)
- No rate limiting (would require backend)
- CSP includes some 'unsafe' directives required for React development

## Future Enhancements

If this were a production application, additional security measures would include:
- Server-side validation and sanitization
- Authentication and authorization
- Rate limiting and DDoS protection
- CSRF token protection
- Secure session management
- Database query parameterization
- Server-side Content Security Policy headers (more secure than meta tags)
- Stricter CSP without 'unsafe-inline' directives

## Testing Security

To test the security measures:

1. **Test XSS Protection**: Try entering `<script>alert('XSS')</script>` in the postcode field - it should be displayed as text, not executed
2. **Test CSP**: Check browser console for any CSP violations
3. **Test URL manipulation**: Try accessing `/property/invalid-id` - should show error page
4. **Run npm audit**: `npm audit` to check for known vulnerabilities in dependencies

---

**Last Updated**: January 2026  
**Application**: Estate Agent Property Search  
**Institution**: University of Westminster