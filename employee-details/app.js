
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http');


var cors = require('cors');

var model = require("./queries");

var app = express();
app.use(cors({origin: '*'}));
app.set('port',process.env.PORT || 4000);
app.use(express.bodyParser());
app.use(app.router);


app.get('/api/employees', model.getAllEmployees);
app.get('/api/employees/:id', model.getEmployee);
app.put('/api/employees/:id', model.updateEmployee);
app.post('/api/employees', model.addEmployee);
app.delete('/api/employees/:id', model.deleteEmployee);
//Grades
app.get('/api/grades', model.getGrades);
app.get('/api/grades/:grade/employees', model.getEmployeesByGrade);

app.use(function(err,req,res,next){
	res.status(err.status || 500)
	.json({
		status: 'error',
		message: err.message
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


module.exports = app; 