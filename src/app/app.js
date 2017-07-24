import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our custom react component
import firebase from 'firebase'
import * as ReactGA from "react-ga";

firebase.initializeApp({
    databaseURL: 'https://wolnesady-a9555.firebaseio.com/'
});

ReactGA.initialize("UA-102970235-1");

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(<Main/>, document.getElementById('app'));
