import express from "express"
import "express-async-errors"
import { json } from "body-parser"
import mongoose from "mongoose"
import cookieSession from "cookie-session"

import { currentUserRouter } from "./routes/currentUser"
import { signOutRouter } from "./routes/signout"
import { signInRouter } from "./routes/signin"
import { signUpRouter } from "./routes/signup"
import { errorHandler } from "./middlewares/error-handler"
import { RouteNotFoundError } from "./errors/RouteNotFoundError"

const app = express();
app.set ('trust proxy', true)
app.use(json())
app.use(cookieSession({
  signed: false,
  secure: true
}))

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.all("*", async () => {
  throw new RouteNotFoundError()
});

app.use(errorHandler);

const startUp = async () => {

  if(!process.env.jwt_key){
    throw new Error('JWT_KEY must be provided')
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-clusterip-srv:27017/auth");
    console.log('Connected to Mongo DB successfully')
  } catch (err) {
    console.log(err)
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000")
  });
};

startUp()
