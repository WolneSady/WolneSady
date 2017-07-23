import React from 'react';
import {Component} from 'react';
import {CircularProgress, RaisedButton} from "material-ui";
import {Col, Row} from "react-flexbox-grid";
import Fingerprint2 from 'fingerprintjs2';
import * as $ from "jquery";
import LetterSection from "./LetterSection";
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

class VoteSection extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            showVoteLoader: false,
            showUpvote: true,
            showMessage: "",
            fingerPrintId: VoteSection.makeid(),
            isShowingModal: false
        };
    }

    static makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }


    componentDidMount() {
        var self = this;

        new Fingerprint2().get(function (result, components) {
            self.setState({fingerPrintId: result});
        });

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
                showMessage: data.status
            });
        }).fail(function (jqXhr) {
            self.setState({
                showMessage: "Błąd. Przeciążenie serwera. :("
            });
            console.log('failed to register');
        }).always(function () {
            self.setState({
                showUpvote: false,
                showVoteLoader: false
            });
        });

        this.sendLetter();
    };


    sendLetter = () => {
        this.setState({isShowingModal: true});
    };

    handleClose = () => {
        this.setState({isShowingModal: false});
    };

    render() {
        let voteSection;
        if (this.state.showVoteLoader) {
            voteSection = <CircularProgress id="progress" size={60} thickness={6} color="#fff"
                                            className="indicator"/>
        } else if (this.state.showUpvote) {
            voteSection =
                <Row center="xs">
                    <h1 className="banner-h1">Chcesz, żeby Prezydent zawetował ustawy?</h1>
                    <h2 className="banner-h2">Wyślij mail do Kancelarii Prezydenta</h2>
                    <RaisedButton className="banner-button"
                                  onTouchTap={this.handleUpvote}
                                  style={{
                                      height: '100%',
                                      lineHeight: '90%',
                                  }}
                                  buttonStyle={{
                                      padding: '8px 16px'
                                  }}
                                  labelStyle={{
                                      padding: '8px',
                                      fontSize: '44px'
                                  }}
                                  label="ODDAJ GŁOS, WYŚLIJ MAIL"
                                  primary={true}/>
                </Row>
        } else {
            voteSection = <Row center="xs">
                <Col xs={12}>
                    <h3>{this.state.showMessage}</h3>
                </Col>
            </Row>
        }

        return (
            <div id="vote-section">
                {voteSection}
                {
                    this.state.isShowingModal &&
                    <ModalContainer onClose={this.handleClose}>
                        <ModalDialog
                            style={{
                                width: '80%',
                            }}
                            onClose={this.handleClose}
                            dismissOnBackgroundClick={false}>
                            <LetterSection handleClose={this.handleClose}/>
                        </ModalDialog>
                    </ModalContainer>
                }
            </div>
        );
    }
}

export default VoteSection;