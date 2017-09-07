var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var server = require('./../app');

describe('Get/api/employees', function(){
	it('should return employees from EMP_DTL Table', function(done){
		chai.request(server)
		.get('/api/employees')
		.end(function(err,res){
			res.status.should.equal(200);
			res.text.should.contain('Sumeet Muchhal');
			done();
		});
	});
	it('should return employee Sumeet Muchhal from EMP_DTL Table', function(done){
		chai.request(server)
		.get('/api/employees/1')
		.end(function(err,res){
			res.status.should.equal(200);
			res.text.should.contain('Sumeet Muchhal');
			done();
		});
	});
	it('should update employee Sumeet Muchhal email to sumeet@yash.com from EMP_DTL Table', function(done){
		chai.request(server)
		.put('/api/employees/1?email=summeet@yash.com')
		.end(function(err,res){
			res.status.should.equal(200);
			res.text.should.contain('success');
			done();
		});
	});
	it('should add employee Anvesh with email anvesh@yash.com into EMP_DTL Table', function(done){
		chai.request(server)
		.post('/api/employees')
		.send({ name: 'Anvesh', email: 'anvesh@yash.com' })
		.end(function(err,res){
			res.status.should.equal(200);
			res.text.should.contain('success');
			done();
		});
	});
	it('should delete employee anvesh from EMP_DTL Table', function(done){
		chai.request(server)
		.delete('/api/employees/6')
		.end(function(err,res){
			res.status.should.equal(200);
			res.text.should.contain('success');
			done();
		});
	});
	it('should return error', function(done){
		chai.request(server)
		.get('/api/employees/vic')
		.end(function(err,res){
			res.status.should.equal(500);
			done();
		});
	});
	it('should get all grades', function(done){
		chai.request(server)
		.get('/api/employees/grades')
		.end(function(err,res){
			res.status.should.equal(200);
			res.text.should.contain('E1');
			done();
		});
	});
});