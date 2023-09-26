const request = require('supertest');
const { User } = require('../../models/user');
const { Genre } = require('../../models/genre');
const port = require('../../helpers/port');
const mongoose = require('mongoose');

let server;

describe('auth middleware', () => {

    let token;

    beforeEach(() => { 
        server = require('../../index')(port());
        token = new User().generateAuthToken();
    });
    afterEach( async () => { 
        await server.close();
        await Genre.deleteMany({});
    });

    afterAll(async () => {   // This is the added hook
        await mongoose.disconnect();
    });

    const execReq = () => {
        
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
        
    }

    it('should return 404 if no token is provided', async () => {

        token = '';

        const res = await execReq();
        expect(res.status).toBe(401);

    });

    it('should return 400 if no token is provided', async () => {

        token = 'a';

        const res = await execReq();
        expect(res.status).toBe(400);

    });

    it('should return 200 if no token is valid', async () => {
        const res = await execReq();
        expect(res.status).toBe(200);
    });

});
