import React from 'react';
import {Component} from 'react';
import {Row} from "react-flexbox-grid";

class ShareSection extends Component {
    componentDidMount() {
        a2a_config.target = '.share-this';
        // Additional instance configs can be set here
        a2a.init('page');
    }

    render() {
        return (
            <div id="share-section">
                <h2 className="banner-h2">Udostępnij innym!</h2>
                <Row center="xs" middle="xs"
                     className="a2a_kit a2a_kit_size_32 a2a_default_style a2a_target share-this">
                    <a className="a2a_button_facebook"/>
                    <a className="a2a_button_twitter"></a>
                    <a className="a2a_button_pinterest"/>
                    <a className="a2a_button_linkedin"/>
                    <a className="a2a_dd a2a_counter" href="https://www.addtoany.com/share"/>
                </Row>
                <script async src="https://static.addtoany.com/menu/page.js"></script>
            </div>
        );
    }
}

export default ShareSection;