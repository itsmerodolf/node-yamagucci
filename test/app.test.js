process.env.RECIPES_DB="mongodb://localhost:27017/yama_test"

var mongoose = require('mongoose');
var expect = require('chai').expect;
const request = require('supertest'); 
var app = require('../app');
app.listen(3000);


describe ('simple test', function() {
	it ('always true', function() {
		expect(true).to.be.true;
	});
});

describe ('api tests', function() {

    before(function(done) {
		mongoose.connect(process.env.RECIPES_DB,function(){
		    /* Drop the DB */
		    mongoose.connection.db.dropDatabase(function() {
			    done();
			});
		});    	
    })

	it ('add /api/ingredients', function(done) {
		request(app)
		  .post('/api/ingredients')
		  .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNob3VoZWkueWFtYXVjaGlAbGl2ZS5jb20iLCJpYXQiOjE0OTY3MjMzNDV9.OYGPO3_SNs0j17117MqKaVCB0ZjhkFq1lJpeICPvBPA')
		  .query({name: "chocolate"})
		  .expect('Content-Type', /json/)
		  .expect(200)
	      .end(function(err, res) {
	      	console.log("Reached end of add", res)
	        done(err);
	      });		  
	});


	it ('check /api/ingredients', function(done) {
		request(app)
		  .get('/api/ingredients')
		  .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNob3VoZWkueWFtYXVjaGlAbGl2ZS5jb20iLCJpYXQiOjE0OTY3MjMzNDV9.OYGPO3_SNs0j17117MqKaVCB0ZjhkFq1lJpeICPvBPA')
		  .expect('Content-Type', /json/)
		  .expect(200)
		  .expect(function(res) {
		  	expect(res.body).to.have.lengthOf(1);
		  })
	      .end(function(err, res) {
	      	console.log("Reached end", res)
	        done(err);
	      });		  
	});
});