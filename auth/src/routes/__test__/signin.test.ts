import request  from "supertest";
import { app } from "../../app";

it('returns a 200 on successful signin', async ()=> {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password:'data@123'
    })
    .expect(201)


    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password:'data@123'
    })
    .expect(200)
})

it('fails when an email that does not exist is supplied', async()=>{
    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'data@gmail.com',
        password:'data@123'
    })
    .expect(400)
})

it('fails when an incorrrect password is supplied',  async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password:'data@123'
    })
    .expect(201)


    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password:'data'
    })
    .expect(400)
})

it('returns a cookie on a successful signin', async()=>{

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password:'data@123'
    })
    .expect(201)

    const response = await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password:'data@123'
    })
    .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined()
})




