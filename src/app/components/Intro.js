import React from 'react';
import {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Row, Col} from 'react-flexbox-grid';
import StillOk from "./StillOk";
import CircularProgress from 'material-ui/CircularProgress';


class Intro extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            showLoader: false,
            showAnswer: false
        };
    }

    handleEstimateTap = () => {
        this.setState({showLoader: true});

        setTimeout(function () {
            this.setState({
                showAnswer: true,
                showLoader: false
            });
        }.bind(this), 1500);
    };

    render() {
        let answer;
        if (this.state.showLoader) {
            answer = <CircularProgress id="progress" size={60} thickness={6}
                                       className="indicator"/>
        } else if (!this.state.showAnswer) {
            answer = <RaisedButton className="banner-button"
                                   fullWidth={true}
                                   style={{
                                       height: '100%',
                                       lineHeight: '90%'
                                   }}
                                   buttonStyle={{
                                       padding: '16px'
                                   }}
                                   labelStyle={{
                                       margin: '8px',
                                       fontSize: '36px'
                                   }}
                                   onTouchTap={this.handleEstimateTap}
                                   label="SPRAWDŹ" primary={true}/>
        } else {
            answer = <h1 className="call-quote">JESZCZE TAK!</h1>
        }

        let info;
        if (this.state.showAnswer) {
            info = <StillOk/>;
        }

        return (
            <div id="intro">
                <img src="assets/images/background.jpg" className="bg" alt=""/>
                <div className="banner-container">
                    <Row center="xs" middle="xs"
                         className="inner-container">
                        <Paper className="banner-main center banner-main-apla" zDepth={3}>
                            <Row middle="xs">
                                <Col xs={12} xsOffset={0} sm={10} smOffset={1} md={8} mdOffset={2}>
                                    <h1 className={this.state.showAnswer ? "banner-h2" : "banner-h1"}>
                                        Czy w Polsce mamy Wolne Sądy?
                                    </h1>
                                    {answer}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} xsOffset={0} sm={10} smOffset={1} md={8} mdOffset={2}>
                                    {info}
                                </Col>
                            </Row>

                        </Paper>
                    </Row>
                </div>
            </div>

        );
    }
}

export default Intro;