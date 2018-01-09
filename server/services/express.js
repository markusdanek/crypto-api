const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    cors = require('cors');

module.exports = function(app, config) {
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({secret: '56950fe494af8e88204adf6d', resave: true, saveUninitialized: true}));

    app.use(cors());

    app.use(function(req, res, next) {
        if (req.session.error) {
            var msg = req.session.error;
            req.session.error = undefined;
            app.locals.errorMessage = msg;
        } else {
            app.locals.errorMessage = undefined;
        }
        next();
    });
}
