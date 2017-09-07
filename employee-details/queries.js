var pg = require('pg');
var connectionString = 'postgres://postgres:victor123@localhost:5432/EMP_MASTER';

function query(sql, values, cb){
	pg.connect(connectionString, function(err, client, done){
		if(err){throw err;}
		client.query(sql, values, function(err, result){
			done();
			cb(err, result);
		});
	});
}

exports.getAllEmployees = function(req, res, next){
	query("select * from EMP_DTL", {}, function(err, result){
		if(err){return next(err);}
		res.status(200)
		.json({
			status: 'success',
			employees: result.rows,
			message: 'Retrieved All employees'
		});	
	});
};

exports.updateEmployee = function(req, res, next){
	console.log(req);
	query("update EMP_DTL set email=$1 where ID=$2", 
			[req.query.email, req.params.id], function(err, result){
		if(err){return next(err);}
		res.status(200)
		.json({
			status: 'success',
			message: 'Updated employee'
		});
	});
}; 

exports.addEmployee = function(req, res, next){
	console.log(req);
	query("insert into EMP_DTL (email,name,grade)  values($1,$2,$3)", 
			[req.body.email, req.body.name, req.body.grade], function(err, result){
		if(err){return next(err);}
		res.status(200)
		.json({
			status: 'success',
			message: 'Inserted employee'
		});
	});
};


exports.deleteEmployee = function(req, res, next){
	console.log(req);
	query("delete from EMP_DTL where id=$1", [req.params.id], function(err, result){
		if(err){return next(err);}
		res.status(200)
		.json({
			status: 'success',
			message: 'Deleted employee'
		});
	});
}; 


exports.getEmployee = function(req, res, next){
	console.log(req);
	query("select * from EMP_DTL where id=$1", [req.params.id], function(err, result){
		if(err){return next(err);}
		res.status(200)
		.json({
			status: 'success',
			data: result.rows,
			message: 'Retrieved employee'
		});
	});
}; 

exports.getGrades = function(req, res, next){
	query("select DISTINCT grade from EMP_DTL ORDER BY grade ASC", {}, function(err, result){
		if(err){return next(err);}
		res.status(200)
		.json({
			status: 'success',
			grades: result.rows,
			message: 'Retrieved All grades'
		});	
	});
};

exports.getEmployeesByGrade = function(req, res, next){
	query("select * from EMP_DTL where grade=$1", [req.params.grade], function(err, result){
		if(err){return next(err);}
		res.status(200)
		.json({
			status: 'success',
			employees: result.rows,
			message: 'Retrieved All employees by grades'
		});	
	});
};