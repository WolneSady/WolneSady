import React from 'react';
import {Component} from 'react';
import {CircularProgress, FontIcon} from "material-ui";
import NumericLable from 'react-pretty-numbers';
import firebase from 'firebase'
import {Row} from "react-flexbox-grid";

class CountSection extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showCountLoader: true,
            upvoteCount: 0
        };

        this.upvoteCountRef = firebase.app().database().ref("upvotes/upvotes_count");
    }

    componentDidMount() {
        this.onUpvoteChange = this.upvoteCountRef.on('value', snapshot => {
            this.setState({
                upvoteCount: snapshot.val(),
                showCountLoader: false
            });
        });
    }

    componentWillUnmount() {
        this.upvoteCountRef.off('value', this.onUpvoteChange);
    }

    render() {
        var countOptions = {
            'locales': 'pl-PL',
            'commafy': true,
        };

        let countSection;
        if (this.state.showCountLoader) {
            countSection = <CircularProgress id="progress" size={60} thickness={6} color="#fff"
                                             className="indicator"/>
        } else {
            countSection = <div className="white-border">
                <Row center="xs" middle="xs">
                    <h2 className="banner-count">
                        <NumericLable params={countOptions}>
                            {this.state.upvoteCount}
                        </NumericLable>
                    </h2>
                    <FontIcon className="fa fa-users icon-padding banner-count"/>
                </Row>
                <h2 className="banner-h2">Tyle głosów domaga się WETA Prezydenta!</h2>
            </div>
        }

        return (
            <div id="count-section">
                {countSection}
            </div>
        );
    }
}

export default CountSection;