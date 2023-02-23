import {  MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import request  from "supertest";
import { app } from '../app'

declare global {
    function signin(): string[]
}

let mongo: MongoMemoryServer

beforeAll(async () => {
    
    process.env.JWT_KEY = 'asdf'
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri(); 
    
    await mongoose.connect(mongoUri)
})


// Delete existing collections before each test
beforeEach(async ()=> {
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections){
        await collection.deleteMany({})
    }
})


afterAll(async ()=> {

    await mongo.stop()
    await mongoose.connection.close()

})

global.signin = () => {
    // Build a JWT payload
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'data@data.com'
    }

    const token = jwt.sign(payload, process.env.JWT_KEY!)

    const session = { jwt: token}

    const sessionJSON = JSON.stringify(session)

    const base64 = Buffer.from(sessionJSON).toString('base64')

    

    return [`session=${base64}`]

}