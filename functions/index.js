// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
let firebaseConfig = functions.config().firebase;
firebaseConfig.databaseAuthVariableOverride = {
    uid: 'ThisIsRandomAdminUID7$ys*&a',
};
admin.initializeApp(firebaseConfig);

const cors = require('cors');
const corsOptions = {
    origin: ['https://wolnesady.github.io', 'http://wolnesady.pl', 'http://wolnesądy.pl', 'http://chcemyweta.pl'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const corsFn = cors(corsOptions);

let upvoteVetoFn = functions.https.onRequest((req, res) => {
    let fingerPrintId;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        fingerPrintId = req.headers.authorization.split('Bearer ')[1];

        // Push the new message into the Realtime Database using the Firebase Admin SDK.
        let fingerprint_ref = admin.database().ref('/upvotes/fingerprints/' + fingerPrintId);
        fingerprint_ref.once("value").then(snapshot => {
            if (snapshot.exists()) {
                res.status(200).send({status: "Możesz zagłosować tylko raz."});
            } else {
                fingerprint_ref.set({fingerPrintId}).then(snapshot => {
                    res.status(200).send({status: "Głos dodany"});
                });
            }
        });
    } else {
        res.status(403).send('Unauthorized');
    }
});

exports.upvoteVeto = functions.https.onRequest((req, res) => {
    corsFn(req, res, function () {
        upvoteVetoFn(req, res);
    });
});

exports.upvoteCounts = functions.database.ref('/upvotes/fingerprints').onWrite(event => {
    let numChildren = event.data.numChildren() + 123;
    return event.data.ref.parent.child('upvotes_count').set(numChildren);
});

// exports.subscribeEmail = functions.https.onRequest((req, res) => {
//     //Check if it's store in DB if not then generate confirm link and send it to user
//
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     admin.database().ref('/messages').push({original: original}).then(snapshot => {
//         // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//         res.redirect(303, snapshot.ref);
//     });
// });
//
// exports.confirmEmail = functions.https.onRequest((req, res) => {
//     //Check if it's store in DB if not then generate confirm link and send it to user
//
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     admin.database().ref('/messages').push({original: original}).then(snapshot => {
//         // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//         res.redirect(303, snapshot.ref);
//     });
// });