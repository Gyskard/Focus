"use strict";
/* eslint-disable consistent-return */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const dotenv = __importStar(require("dotenv"));
const create_connector_1 = __importDefault(require("./module/db/create_connector"));
const person_repository_1 = require("./module/api/repository/person.repository");
dotenv.config();
const dbConfig = config_1.default.get('portConfig');
const app = (0, express_1.default)();
app.use(express_1.default.json()); // parse application/json
app.use(express_1.default.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err)
        return res.status(400).send(err.message); // check request body is valid json
    next();
});
const port = process.env.ENV === 'test' ? dbConfig.test : dbConfig.default;
const prefix = '/api';
(async () => {
    await create_connector_1.default.authenticate(); // connect with database
    await create_connector_1.default.sync(); // sync models with database tables
    app.get(`${prefix}/`, (req, res) => res.sendStatus(200));
    app.put(`${prefix}/person`, (req, res) => (0, person_repository_1.createPerson)(req, res));
    app.put(`${prefix}/person/:name`, (req, res) => (0, person_repository_1.updatePerson)(req, res));
    app.listen(port, () => console.log(`API is listening on port ${port}`)); // eslint-disable-line no-console
})();
