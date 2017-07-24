import React from 'react';
import {Component} from 'react';
import {ModalContainer, ModalDialog} from "react-modal-dialog";
import LetterSection from "./LetterSection";
import {RaisedButton} from "material-ui";
import {Row} from "react-flexbox-grid";

class SendMailSection extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isShowingModal: false
        };
    }

    sendLetter = () => {
        this.setState({isShowingModal: true});
    };

    handleClose = () => {
        this.setState({isShowingModal: false});
    };

    render() {
        return (
            <div id="send-mail-section">
                <Row center="xs">
                    <h2 className="banner-h2">Chcesz zrobić więcej?<br/>Wyślij mail do Kancelarii Prezydenta</h2>
                    <RaisedButton className="banner-button"
                                  onTouchTap={this.sendLetter}
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
                                  label="WYŚLIJ MAIL"
                                  primary={true}/>
                </Row>
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

export default SendMailSection;