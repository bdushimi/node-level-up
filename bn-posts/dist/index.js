"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const posts = {};
app.get('/posts', (_req, res) => {
    res.send(posts);
});
app.post('/posts', (req, res) => {
    const id = (0, crypto_1.randomBytes)(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
        id, title
    };
    res.status(201).send(posts[id]);
});
app.listen(4040, () => {
    console.log('bn listening on port 4040');
});
