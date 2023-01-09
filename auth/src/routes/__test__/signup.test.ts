import request  from "supertest";
import { app } from "../../app";

it('returns a 201 on successful signup', async ()=> {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password:'data@123'
    })
    .expect(201)
})


it('returns a 400 with invalid email', async ()=> {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test',
        password:'data@123'
    })
    .expect(400)
})


it('returns a 400 with invalid password', async ()=> {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test',
        password:'dat'
    })
    .expect(400)
})

it('returns a 400 with missing email and passowrd', async ()=> {
    return request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400)
})


it('disallows duplicate emails', async ()=> {

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password:'data@123'
    })
    .expect(201)

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password:'data@123'
    })
    .expect(400)
})

it('sets a cookie after a successful singup', async()=>{
    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password:'data@123'
    })
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})



