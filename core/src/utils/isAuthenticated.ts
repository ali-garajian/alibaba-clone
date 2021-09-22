import Cookies from 'js-cookie';

export const isAuthenticated = () => Cookies.get('logged-in') === 'true';
