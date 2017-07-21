/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey100, grey400, grey500, orangeA200, indigo700, indigo500, white} from "material-ui/styles/colors";
import Intro from "./components/Intro";

const customTheme = getMuiTheme(darkBaseTheme, {
    palette: {
        primary1Color: indigo500,
        primary2Color: indigo700,
        primary3Color: grey400,
        accent1Color: orangeA200,
        accent2Color: grey100,
        accent3Color: grey500,
        alternateTextColor: white,
    },
});

class Main extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <MuiThemeProvider muiTheme={customTheme}>
                <div className="menu-padding">
                    <Intro/>

                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;
