import React from 'react';
import {Component} from 'react';
import {Row} from "react-flexbox-grid";
import CountSection from "./CountSection";
import VoteSection from "./VoteSection";
import ShareSection from "./ShareSection";
import {FadeIn} from "animate-components";
import SendMailSection from "./SendMailSection";

class StillOk extends Component {

    render() {
        return (
            <div>
                <FadeIn duration="2s" timingFunction="ease-out">
                    <VoteSection id="vote_section"/>
                </FadeIn>
                <CountSection id="count_section"/>
                <SendMailSection/>

                {/*<h3 className="banner-h3">Chcesz zostać poinformowany, gdy nie będzie już w Polsce wolnych sądów?</h3>*/}
                {/*<Row center="xs" middle="xs">*/}
                {/*<TextField hintText="Zostaw swój email"/>*/}
                {/*<FlatButton backgroundColor="#FFF"*/}
                {/*hoverColor="#ccc"*/}
                {/*className="banner-button extra-small-margin"*/}
                {/*onTouchTap={this.handleSubscribe}*/}
                {/*label="Dopisz się" primary={true}/>*/}
                {/*</Row>*/}

                <Row center="xs" middle="xs">
                    <h2 className="italic">"Niniejsza inicjatywa jest inicjatywą wyłącznie obywatelską. Nie jest ona
                        powiązana z działalnością jakiejkolwiek partii politycznej czy organizacji."</h2>
                </Row>

                <ShareSection id="share_section"/>
            </div>

        );
    }
}

export default StillOk;