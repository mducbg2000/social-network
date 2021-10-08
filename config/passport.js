const passport = require("passport");
const passportJWT = require("passport-jwt");
const passportAzure = require("passport-azure-ad-oauth2")
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const AzureAdOAuth2Strategy = passportAzure.Strategy
const User = require('../models/user')
require("dotenv").config();
const jwt = require("jsonwebtoken");
let host = `http://localhost:${process.env.PORT}`;
if (process.env.NODE_ENV === 'production') host = 'https://bk-social-network.herokuapp.com'

let cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["token"];
    }
    return token;
};

const jwtOptions = {
    secretOrKey: process.env.SECRETKEY || "heheboiz",
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
};

const jwtStrategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    User
        .findOne({
            _id: jwt_payload.id
        })
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => done(err, null));
});

const azureStrategy = new AzureAdOAuth2Strategy({
        clientID: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        callbackURL: `${host}/auth/azure/callback`,
    },
    async (accessToken, refresh_token, params, profile, done) => {
        let azureProfile = jwt.decode(params.id_token, {complete: true});
        let user = await User.findOne({
            email: azureProfile.payload.upn.toLowerCase()
        })
        if (user == null) {
            user = await User.create({
                email: azureProfile.payload.upn.toLowerCase(),
                name: azureProfile.payload.name.slice(0, azureProfile.payload.name.length-8),
                mssv: azureProfile.payload.name.slice(-8),
                pwd: 'wutdafuk'
            })
        }
        return done(null, user)
    })

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = (passport) => {
    passport.use(jwtStrategy);
    passport.use(azureStrategy);
};
