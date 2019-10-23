import Express = require('express')
import * as bodyParser from "body-parser";

import socialController from "./resources/social.controller";

class App {

    public app: Express.Application;

    constructor() {
        this.app = Express();
        this.config();
    }

    private config() {
        this.app.use(bodyParser.json());
        this.app.use(socialController);
    }
}

export default new App().app;