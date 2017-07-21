import React from 'react';
import {Component} from 'react';
import {CircularProgress, FlatButton, FontIcon, RaisedButton, TextField} from "material-ui";
import Fingerprint2 from 'fingerprintjs2';
import * as $ from "jquery";
import firebase from 'firebase'
import NumericLable from 'react-pretty-numbers';
import {Row} from "react-flexbox-grid";
import {FloatingActionButton} from "material-ui";
import ContentInfo from 'material-ui/svg-icons/action/info';

class StillOk extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showCountLoader: true,
            showVoteLoader: false,
            showUpvote: true,
            upvoteCount: 0
        };

        this.upvoteCountRef = firebase.app().database().ref("upvotes/upvotes_count");
    }


    componentDidMount() {
        a2a_config.target = '.share-this';
        // Additional instance configs can be set here
        a2a.init('page');

        var self = this;

        new Fingerprint2().get(function (result, components) {
            self.setState({fingerPrintId: result});
        });

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

    handleUpvote = () => {
        this.setState({showVoteLoader: true});

        var self = this;
        var data = {};

        $.ajax({
            url: "https://us-central1-wolnesady-a9555.cloudfunctions.net/upvoteVeto",
            headers: {
                'Authorization': 'Bearer ' + self.state.fingerPrintId,
            },
            data: data,
            method: "POST",
            dataType: "json"
        }).done(function (data) {
            self.setState({
                showUpvote: false
            });
        }).fail(function (jqXhr) {
            self.setState({
                showUpvote: true
            });
            console.log('failed to register');
        });
    };

    render() {
        var countOptions = {
            'locales': 'pl-PL',
            'commafy': true,
        };

        let countSection;
        if (this.state.showCountLoader) {
            countSection = <CircularProgress id="progress" size={60} thickness={6} color="#fff"
                                             className="indicator"/>
        } else if (!this.state.showAnswer) {
            countSection = <div className="white-border">
                <Row center="xs" middle="xs">
                    <h1 className="banner-count"><NumericLable
                        params={countOptions}>{this.state.upvoteCount}</NumericLable>
                    </h1>
                    <FontIcon className="fa fa-users icon-padding banner-count"/>
                </Row>
                <h1>Tyle głosów domaga się WETA Prezydenta!</h1>
            </div>
        }

        let voteSection;
        if (this.state.showUpvote) {
            voteSection = <RaisedButton className="banner-button"
                                        onTouchTap={this.handleUpvote}
                                        fullWidth={true}
                                        style={{
                                            height: '100%',
                                            lineHeight: '90%'
                                        }}
                                        labelStyle={{
                                            margin: '8px',
                                            fontSize: '55px'
                                        }}
                                        label="CHCĘ WETA"
                                        secondary={true}/>
        } else {
            voteSection = <div/>
        }

        return (
            <div>
                <h1 className="call-quote">JESZCZE TAK!</h1>
                {voteSection}

                <p/><p/>
                {countSection}

                <h3 className="banner-h3">Chcesz zostać poinformowany, gdy nie będzie już w Polsce wolnych sądów?</h3>
                <Row center="xs" middle="xs">
                    <TextField hintText="Zostaw swój email"/>
                    <FlatButton backgroundColor="#FFF"
                                hoverColor="#ccc"

                                className="banner-button extra-small-margin"
                                onTouchTap={this.handleSubscribe}
                                label="Dopisz się" primary={true}/>
                </Row>

                <Row center="xs" middle="xs">
                    <h2 className="itallic">"Niniejsza inicjatywa jest inicjatywą wyłącznie obywatelską. Nie jest ona
                        powiązana z działalnością jakiejkolwiek partii politycznej czy organizacji."</h2>
                </Row>

                <h2 className="banner-h2">Udostępnij innym!</h2>

                <Row center="xs" middle="xs"
                     className="a2a_kit a2a_kit_size_32 a2a_default_style a2a_target share-this">
                    <a className="a2a_button_facebook a2a_counter"/>
                    <a className="a2a_button_pinterest a2a_counter"/>
                    <a className="a2a_button_linkedin a2a_counter"/>
                    <a className="a2a_button_reddit a2a_counter"/>
                    <a className="a2a_dd a2a_counter" href="https://www.addtoany.com/share"/>
                </Row>
            </div>

        );
    }
}

export default StillOk;