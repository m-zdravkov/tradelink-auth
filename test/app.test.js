let assert  = require('chai').assert,
    request = require('supertest'),
    app     = require('../app');

describe('App', () => {
    /**
     * Checks to see if it runs on the correct port for testing.
     */
    
    it('should run on 8083', () => {
        assert.equal(app.port, 8083);
    });

    it('should return 404 status on main route', (done) => {
        request(app).get('/')
            .expect(404, done);
    });
});