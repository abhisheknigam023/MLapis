const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
// const reading = require('./test');
// Key vault
// const msRestAzure = require('ms-rest-azure');
// const KeyVault = require('azure-keyvault');

// const config = require('./config/auzre.config');
// const passport = require('passport');

// create express app
const app = express();

// const http = require('http');
const mongoose = require('mongoose');

const config = require('config');
// const AADCreds = config.get('AADCreds');
// const OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy;



// const isProduction = config.get('Production');
//-----------------------------------------------------
// var index = require('./index');

// Require  routes
const videoRoute = require('./app/routes/videoRoute');

// const deployPath = process.env.deployPath || '';
// const server = http.createServer(app);
// const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    'extended': true
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma');
    res.header('Access-Control-Expose-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


// / -------- Start: Code for development environment ----------

// if (!isProduction) {

    // define a simple route
    app.get('/', (req, res) => {
        res.json({
            'message': 'Welcome to Knowledge Portal application.'
        });
    });

    // configure  routes
    app.use('/api', videoRoute);

    // listen for requests
    app.listen(3000, () => {
        console.log('Server is listening on port 3000');
    });


    // Configuring the database
    const dbConfig = config.get('DB');

    // const dbConfig = require('./config/database.config.js');

    // Connecting to the database
    mongoose.connect(dbConfig.url, {
        'useNewUrlParser': true
    }).then(() => {
        console.log('Successfully connected to the database');
    })
        .catch(err => {
            console.log(`Could not connect to the database. Exiting now...${err}`);
            process.exit();
        });


// }
// / --------End: Code for development environment ----------


// / ----------Start: Code for Azure environments ------------

// // GetDB Password from Keyvault
// const getKeyVaultCredentials = function () {
//     const clientId = AADCreds.clientID;
//     const secret = AADCreds.clientSecret;
//     const domain = AADCreds.tenentId;
//     return msRestAzure.loginWithServicePrincipalSecret(clientId, secret, domain);
// };

// const getKeyVaultSecret = function (credentials) {
//     const vaultUrl = config.get('KeyVaultUrl');
//     const secretName = config.get('SecretName');
//     const keyVaultClient = new KeyVault.KeyVaultClient(credentials);
//     return keyVaultClient.getSecret(vaultUrl, secretName, '');
// };

// if (isProduction) {

//     const users = [];


//     getKeyVaultCredentials().then(getKeyVaultSecret)
//         .then(function (secret) {
//             const DbPassword = secret.value;
//             const DB = config.get('DB');
//             const mongoDB = process.env.MONGODB_URI || DB.url;
//             mongoose.connect(mongoDB, {
//                 'auth': {
//                     'user': DB.auth.user,
//                     'password': DbPassword
//                 }
//             });

//             const db = mongoose.connection;
//             db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//         })
//         .catch(function (err) {
//             throw err;
//         });

//     // #region OIDCBearerStrategy Authentication

//     // We pass these options in to the ODICBearerStrategy.
//     const options = {
//     // The URL of the metadata document for your app. We will put the keys for token validation from the URL found in the jwks_uri tag of the in the metadata.
//         'identityMetadata': AADCreds.identityMetadata,
//         'clientID': AADCreds.clientID,
//         'validateIssuer': AADCreds.validateIssuer,
//         'issuer': AADCreds.issuer,
//         'passReqToCallback': AADCreds.passReqToCallback,
//         'isB2C': AADCreds.isB2C,
//         'policyName': AADCreds.policyName,
//         'allowMultiAudiencesInToken': AADCreds.allowMultiAudiencesInToken,
//         'audience': AADCreds.audience,
//         'loggingLevel': AADCreds.loggingLevel
//     };


//     const findById = function (id, fn) {
//         for (let i = 0, len = users.length; i < len; i++) {
//             const user = users[i];
//             if (user.sub === id) {
//                 return fn(null, user);
//             }
//         }
//         return fn(null, null);
//     };

//     const bearerStrategy = new OIDCBearerStrategy(options,
//         function (token, done) {
//             // var owner = null;
//             findById(token.sub, function (err, user) {
//                 if (err) {
//                     return done(err);
//                 }
//                 if (!user) {
//                     // "Auto-registration"
//                     users.push(token);
//                     //  owner = token.sub;
//                     return done(null, token);
//                 }
//                 // owner = token.sub;
//                 return done(null, user, token);
//             });
//         }
//     );

//     passport.use(bearerStrategy);
//     // Starts passport
//     app.use(passport.initialize());
//     // Provides session support
//     app.use(passport.session());

//     // #endregion


//     // Default handler
//     app.get(deployPath,
//         function (req, res, next) {
//             passport.authenticate('oauth-bearer', function (err, tokenFound, info) {
//                 if (err) {
//                     console.error(err);
//                     return next(err);
//                 }
//                 if (!tokenFound) {
//                     // This is always the result
//                     return res.send(`token: ${tokenFound}, info: ${info}`);
//                 }
//                 return res.send(`Default Handler found && Successfully found token for: ${JSON.stringify(tokenFound)}`);
//             })(req, res, next);
//         }
//     );


//     // configure  routes
//     app.use(`${deployPath}/api`, passport.authenticate('oauth-bearer', {
//         'session': false
//     }), courseRoutes);
//     app.use(`${deployPath}/api`, passport.authenticate('oauth-bearer', {
//         'session': false
//     }), roleRoutes);
//     app.use(`${deployPath}/api`, passport.authenticate('oauth-bearer', {
//         'session': false
//     }), workflowRoutes);
//     app.use(`${deployPath}/api`, passport.authenticate('oauth-bearer', {
//         'session': false
//     }), sliderRoutes);
//     app.use(`${deployPath}/api`, passport.authenticate('oauth-bearer', {
//         'session': false
//     }), userRoutes);

//     // Server creation
//     server.listen(port);
//     console.log(
//         `Server is up and running on port numner ${port} && Deploy Path${deployPath}`
//     );


// }
// / ----------End: Code for Azure environments ------------