import * as express from "express";
import * as bodyParser from "body-parser";
const errorHandler = require('errorhandler');
const cors = require('cors');
import { Routes } from "./routes";

/** Configure isProduction variable */
const isProduction = process.env.NODE_ENV === 'production';

class App {

    public app: express.Application;
    public routes: Routes;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.config();
        this.routes = new Routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));

        if (!isProduction) {
            this.app.use(errorHandler());
        }
    }

}

export default new App().app;