import Express = require('express')
import * as bodyParser from "body-parser";

import commandProcesor from "./commands/command.processor";
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
        this.app.use(commandProcesor);
    }
}

export default new App().app;