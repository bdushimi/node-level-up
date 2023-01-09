import { app } from "./app";
import mongoose from "mongoose"



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
