import ReactGA from 'react-ga';

export const loadGoogleAnalytics = () => {
    if(process.env.REACT_APP_NODE_ENV === 'development') {
        ReactGA.initialize('UA-135621396-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    } else if (process.env.REACT_APP_NODE_ENV === 'production') {
        ReactGA.initialize('UA-135621396-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
}