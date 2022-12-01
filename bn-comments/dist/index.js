"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const crypto_1 = require("crypto");
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", async (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;
    const commentId = (0, crypto_1.randomBytes)(4).toString("hex");
    const comments = commentsByPostId[postId] || [];
    comments.push({ id: commentId, content: content });
    commentsByPostId[postId] = comments;
    await axios_1.default.post("http://localhost:6060/events", {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId,
        },
    });
    res.status(201).send(commentsByPostId[postId]);
});
app.post('/events', (req, res) => {
    console.log('Received event', req.body.event.type);
    res.send({});
});
app.listen(5050, () => {
    console.log("comments service listens on port 5050");
});
