"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import axios from "axios";
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const posts = {};
app.post("/events", (req, res) => {
    const { type, data } = req.body.event;
    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = {
            id,
            title,
            comments: [],
        };
    }
    else if (type === "CommentCreated") {
        const { id, content, postId, status } = data;
        const tempPost = posts[postId];
        tempPost.comments.push({ id, content, status });
    }
    else if (type === "CommentUpdated") {
        const { postId, status, id } = data;
        posts[postId].comments.map((comment) => {
            if (comment.id === id) {
                comment.status = status;
            }
            return comment;
        });
    }
    console.log("posts", posts);
    res.send({ status: 'OK' });
});
//@ts-ignore
app.get("/events", (req, res) => {
    res.send(posts);
});
app.listen(4005, () => {
    console.log("listening on port 4005");
});
