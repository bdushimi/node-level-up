import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import {
  errorHandler,
  RouteNotFoundError,
  verifyCurrentUser,
} from "@dushberd/common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { IndexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(verifyCurrentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(IndexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async () => {
  throw new RouteNotFoundError();
});

app.use(errorHandler);

export { app };
