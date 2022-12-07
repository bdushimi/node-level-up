"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const posts = {};
const handleEvent = (event) => {
    const { type, data } = event;
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
};
app.post("/events", (req, res) => {
    const { event } = req.body;
    handleEvent(event);
    res.send({ status: "OK" });
});
//@ts-ignore
app.get("/events", (req, res) => {
    res.send(posts);
});
app.listen(4005, async () => {
    console.log("listening on port 4005");
    // Make a request to the event bus to get events that this service might have missed out when it was offline
    const res = await axios_1.default.get('http://localhost:4003/events');
    for (let event of res.data) {
        console.log('Processing event: ', event.type);
        handleEvent(event);
    }
});
