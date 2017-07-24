import React from 'react';
import {Component} from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {Checkbox, MuiThemeProvider, RaisedButton, TextField} from "material-ui";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Col, Row} from "react-flexbox-grid";
import {grey100, grey400, grey500, indigo500, indigo700, orangeA200} from "material-ui/styles/colors";
import CopyToClipboard from 'react-copy-to-clipboard';

const customTheme = getMuiTheme(lightBaseTheme, {
    palette: {
        primary1Color: indigo500,
        primary2Color: indigo700,
        primary3Color: grey400,
        accent1Color: orangeA200,
        accent2Color: grey100,
        accent3Color: grey500,
    },
});

const RECEIPENTS = [
    "halina.szymanska@prezydent.pl",
    "anna.surowka-pasek@prezydent.pl",
    "grazyna.ignaczak-bandych@prezydent.pl",
    "urszula.doroszewska@prezydent.pl",
    "barbara.fedyszak-radziejowska@prezydent.pl",
    "marta.gajecka@prezydent.pl",
    "agnieszka.lenartowicz-lysik@prezydent.pl",
    "zofia.romaszewska@prezydent.pl",
    "dorota.skrzypek@prezydent.pl",
    "grazyna.wereszczynska@prezydent.pl",
    "anna.kasprzyszak@prezydent.pl",
    "agnieszka.marciniak@prezydent.pl",
    "malgorzata.paprocka@prezydent.pl",
    "paulina.palka@prezydent.pl",
    "ewelina.bielinska@prezydent.pl",
    "krzysztof.szczerski@prezydent.pl",
    "pawel.mucha@prezydent.pl",
    "andrzej.dera@prezydent.pl",
    "adam.kwiatkowski@prezydent.pl",
    "krzysztof.lapinski@prezydent.pl",
    "wojciech.kolarski@prezydent.pl",
    "tadeusz.deszkiewicz@prezydent.pl",
    "marek.dietl@prezydent.pl",
    "konrad.dziobek@prezydent.pl",
    "cezary.kochalski@prezydent.pl",
    "piotr.nowacki@prezydent.pl",
    "zdzislaw.sokal@prezydent.pl",
    "andrzej.wasko@prezydent.pl",
    "andrzej.zybertowicz@prezydent.pl",
    "mieszko.pawlak@prezydent.pl",
    "mikolaj.rysiewicz@prezydent.pl",
    "wojciech.chojnowski@prezydent.pl",
    "kazimierz.kuberski@prezydent.pl",
];

const ARGUMENTS = {
    arg1: "Oczekuję, że Prezydent RP zawetuje nowelizacje ustaw dot. KRS oraz Sądu Najwyższego.",
    arg2: "Nie chcę aby jakakolwiek partia - nawet ta, którą popieram - miała bezpośredni wpływ na Sąd Najwyższy.",
    arg3: "Ustawa dot. Sądu Najwyższego jest prawnie wadliwa, jawnie łamie konstytucję i likwiduje ustrój demokratyczny Polski, umożliwiając politykom na przejęcie SN w celu uzyskania wpływu na wyniki wyborów oraz na wolność mediów.",
    arg4: "Boję się o przyszłość moją, mojej rodziny, przyjaciół i kraju, ponieważ moje prawa i wolności będą zagrożone przy wejściu w życie ww. ustawy.",
    arg5: "Weto byłoby sukcesem Prezydenta i ruch ten docenią wszyscy Polacy niezależnie od poglądów politycznych.",
    arg6: "Jednocześnie opowiadam się za dobrze przygotowaną reformą sądownictwa, która nie zagraża prawom obywateli, którą to reformę mógłby podjąć Prezydent Duda.",
    arg7: "Obiecuję obywatelski opór i walkę o naszą wolność jeżeli Prezydent podpisze ten projekt lub skieruje go do uzależnionego od rządzącej partii Trybunału Konstytucyjnego.",
};

const TITLES = [
    '3xWeto',
    'Żądam weta',
    'Mój obywatelski apel do Prezydenta',
    'Prezydenckie weto uratuje Polskę',
    'Apel o weto',
    'Prezydencie, tylko weto!',
];

const NL = "%0D%0A";


class LetterSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            occupation: "",
            title: "",
            name: "",
            showResult: false,
            body: "",
        };
    }

    handleInputChange = (event, newValue) => {
        const name = event.target.name;

        this.setState({
            [name]: newValue
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        var self = this;

        let warning = "";

        let str = "mailto:";
        for (let i = 0; i < RECEIPENTS.length; i++) {
            str += RECEIPENTS[i] + ","
        }
        str += "?subject=";

        let title = this.state.title;
        if (title.length > 0) {
            str += title;
        } else {
            warning += "Musisz uzupełnić tytuł. "
        }

        str += "&body=";
        let body = "Szanowna Pani / Szanowny Panie ," + NL + NL;

        let occupation = this.state.occupation;
        if (occupation.length > 0) {
            body += "Jestem " + occupation + "." + NL + NL;
        } else {
            warning += "Uzupełnij kim jesteś."
        }

        console.log(this.state);
        for (var key in ARGUMENTS) {
            if (this.state[key]) {
                body += ARGUMENTS[key] + NL + NL;
            }
        }

        let name = this.state.name;
        if (name.length > 0) {
            body += "Z poważaniem," + NL + name;
        }
        str += body;
        this.setState({
            body: body.replace(/%0D%0A/g, "<br/>"),
        });

        if (warning.length > 0) {
            //TODO show error
            alert(warning)
        }
        else {
            this.setState({
                showResult: true,
            });
            location.href = str;
        }
    };

    render() {

        const hintStyle = {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        };
        let letter;

        if (!this.state.showResult) {
            letter = <div id="letter-section">
                <form id="form" onSubmit={this.handleSubmit}>
                    <Row middle="xs" className="no-side-margin">
                        <Col>
                            <h3>Tytuł</h3>
                        </Col>
                        <Col xs>
                            <TextField
                                name="title"
                                fullWidth={true}
                                onChange={this.handleInputChange}
                                hintStyle={hintStyle}
                                hintText="Wpisz swój tytuł np. 3x WETO, Mój obywatelski apel do Prezydenta ..."
                            />
                        </Col>
                    </Row>
                    <p/>
                    <span>Szanowna Pani / Szanowny Panie ,</span>
                    <Row middle="xs" className="no-side-margin">
                        <Col>
                            <span>Jestem </span>
                        </Col>
                        <Col xs>
                            <TextField
                                name="occupation"
                                fullWidth={true}
                                onChange={this.handleInputChange}
                                hintStyle={hintStyle}
                                hintText="studentem, matką, ojcem, własny wpis..."
                            />
                        </Col>
                        <Col>
                            <span>.</span>
                        </Col>
                    </Row>
                    <Checkbox
                        name="arg1"
                        label={ARGUMENTS["arg1"]}
                        onCheck={this.handleInputChange}
                    />
                    <Checkbox
                        name="arg2"
                        label={ARGUMENTS["arg2"]}
                        onCheck={this.handleInputChange}
                    />
                    <Checkbox
                        name="arg3"
                        label={ARGUMENTS["arg3"]}
                        onCheck={this.handleInputChange}
                    />
                    <Checkbox
                        name="arg4"
                        label={ARGUMENTS["arg4"]}
                        onCheck={this.handleInputChange}
                    />
                    <Checkbox
                        name="arg5"
                        label={ARGUMENTS["arg5"]}
                        onCheck={this.handleInputChange}
                    />
                    <Checkbox
                        name="arg6"
                        label={ARGUMENTS["arg6"]}
                        onCheck={this.handleInputChange}
                    />
                    <b>
                        <Checkbox
                            name="arg7"
                            label={ARGUMENTS["arg7"]}
                            onCheck={this.handleInputChange}
                        />
                    </b>
                    <p/>
                    <span>Z poważaniem,</span>
                    <TextField
                        name="name"
                        fullWidth={true}
                        onChange={this.handleInputChange}
                        hintStyle={hintStyle}
                        hintText="(Opcjonalnie) Twoje imię, nazwisko"
                    />
                    <a id="send"><RaisedButton
                        label="Wyślij e-mail"
                        type="submit"
                        primary={true}
                    /></a>
                </form>
            </div>
        } else {
            letter = <div id="letter-section">
                <h1>Nie masz klienta poczty w systemie? Wyślij maila samodzielnie. Skopiuj
                    wartości.</h1>
                <Row top="xs" className="no-side-margin">

                    <Col xs={6} sm className="ellipsize-text">
                        <b className="letter-text-title">Odbiorcy</b>
                        <br/>
                        <span>
                            {
                                RECEIPENTS.map(function (receipent) {
                                    return <span>{receipent} </span>;
                                })
                            }
                        </span>
                    </Col>
                    <Col xs={6} sm={1}>
                        <br/><br/>
                        <CopyToClipboard text={RECEIPENTS.join(" ")}>
                            <RaisedButton label="Skopiuj"
                                          secondary={true}/>
                        </CopyToClipboard>
                    </Col>
                </Row>
                <br/><br/>
                <Row top="xs" className="no-side-margin">
                    <Col xs={6} sm>
                        <b className="letter-text-title">Tytuł</b>
                        <br/>
                        <span>{this.state.title}</span>
                    </Col>
                    <Col xs={6} sm={1}>
                        <br/><br/>
                        <CopyToClipboard text={this.state.title}>
                            <RaisedButton label="Skopiuj"
                                          secondary={true}/>
                        </CopyToClipboard>
                    </Col>
                </Row>
                <br/><br/>
                <Row top="xs" className="no-side-margin">
                    <Col xs={6} sm>
                        <b className="letter-text-title">Treść</b>
                        <br/>
                        <span><div dangerouslySetInnerHTML={{__html: this.state.body}}/></span>
                    </Col>
                    <Col xs={6} sm={1}>
                        <br/><br/>
                        <CopyToClipboard text={this.state.body.replace(/<br\/>/g, "\n")}>
                            <RaisedButton label="Skopiuj"
                                          secondary={true}/>
                        </CopyToClipboard>
                    </Col>
                </Row>
                <br/><br/>
                <RaisedButton
                    label="Zamknij"
                    primary={true}
                    onTouchTap={this.props.handleClose}
                />
            </div>
        }

        return (
            <MuiThemeProvider muiTheme={customTheme}>
                {letter}
            </MuiThemeProvider>
        );
    }
}

export default LetterSection;

