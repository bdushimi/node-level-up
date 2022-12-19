"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const posts = {};
app.get('/posts', (_req, res) => {
    res.send(posts);
});
app.post('/posts/create', async (req, res) => {
    const id = (0, crypto_1.randomBytes)(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
        id, title
    };
    // sends events to the event bus
    await axios_1.default.post('http://event-clusterip-srv:4003/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    });
    res.status(201).send(posts[id]);
});
app.post('/events', (req, res) => {
    console.log('Received event', req.body.event.type);
    res.send({});
});
app.listen(4001, () => {
    console.log('New APIs');
    console.log('bn listening on port 4001');
});
