"use strict";
/* eslint-disable consistent-return */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_connector_1 = __importDefault(require("./module/db/create_connector"));
const person_repository_1 = __importDefault(require("./module/api/repository/person.repository"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // parse application/json
app.use(express_1.default.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err)
        return res.status(400).send(err.message); // check request body is valid json
    next();
});
const port = 4001;
const prefix = '/api';
(async () => {
    await create_connector_1.default.authenticate(); // connect with database
    await create_connector_1.default.sync(); // sync models with database tables
    app.get(`${prefix}/`, (req, res) => res.sendStatus(200));
    app.put(`${prefix}/person`, (req, res) => (0, person_repository_1.default)(req, res));
    app.listen(port, () => console.log(`API is listening on port ${port}`)); // eslint-disable-line no-console
})();
