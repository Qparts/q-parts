import ReactGA from 'react-ga';

export const loadGoogleAnalytics = () => {
    ReactGA.initialize(process.env.REACT_APP_GA);
    ReactGA.pageview(window.location.pathname + window.location.search);
}