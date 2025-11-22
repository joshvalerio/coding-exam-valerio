import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Send cookies (session / sanctum) with requests so API routes using
// cookie-based auth work from the frontend.
window.axios.defaults.withCredentials = true;
