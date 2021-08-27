// Enviroment Variable
    const path = require('path');
    require('dotenv').config({ path: path.join(__dirname,'.','.env') }); // Configura o path das variaveis de ambiente.

// Dependencies
    import express from "express";
    import errorCatch from "./middlewares/errorCatch";
    import Controller from "./controller";
    import "express-async-errors";
    const app = express();

// Config
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

// Routes
    app.post("/email/send", Controller.Index_POST);

// Middlewares
    app.use(errorCatch);

// Exports
    module.exports = app;
//