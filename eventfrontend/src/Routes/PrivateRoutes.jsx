import { Navigate } from 'react-router-dom'; // Import Navigate for redirection

// This component will protect routes
const PrivateRoute = ({element}) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists

  return isAuthenticated ? element : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
