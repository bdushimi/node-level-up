import request from 'supertest'
import {app} from '../../app'

it('has a route handler listening to /api/tickets for post requests', async()=>{
    const res = await request(app)
    .post('/api/tickets')
    .send({})

    expect(res.status).toEqual(401)
})

it('can only be accessed it the user is authenticated', async()=>{
    await request(app).post('/api/tickets').send({}).expect(401)
})

it('returns a status other than 401 if the user is signed it', async()=>{
    const res = await request.agent(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send()

    expect(res.status).not.toEqual(401)
})
