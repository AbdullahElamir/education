var express = require('express');
var router = express.Router();
var models = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var nationality = require('../Nationality');

// /// Start students //////////////////////////////
router.get('/', userHelpers.isLogin, function (req, res) {
	var page = userHelpers.getPage(req);
	var limit = userHelpers.getLimit(page);
	var q = userHelpers.getQuery(req);
	var first_name = userHelpers.getname(req);
	var father_name = userHelpers.getfather_name(req);
	var last_name = userHelpers.getlast_name(req);
	var obj = {
		where: {
			status: 1
		}
	};
	if (q != "") {
		obj.where.set_number = {
			$like: '%' + q + '%'
		};
	}
	if (first_name != "") {
		obj.where.first_name = {
			$like: '%' + first_name + '%'
		};
	}
	if (father_name != "") {
		obj.where.father_name = {
			$like: '%' + father_name + '%'
		};
	}
	if (last_name != "") {
		obj.where.last_name = {
			$like: '%' + last_name + '%'
		};
	}
	obj.limit = 10;
	obj.offset = limit;
	models.Student.findAndCountAll(obj)
		.then(function (student) {
			var pageCount = userHelpers.getPageCount(student.count);
			var pagination = userHelpers.paginate(page, pageCount);
			console.log(pagination);
			res.render('students', {
				title: 'View Students',
				nats: nationality,
				student: student.rows,
				pagination: pagination,
				collapseFive: 'collapse in',
				activeFiveOne: 'active',
				q: q
			});
		});
});
router.get('/newStudent', userHelpers.isLogin, function (req, res) {
	res.render('newStudent', {
		title: 'تسجيل طالب جديد',
		name: req.session.name,
		collapseFive: 'collapse in',
		nats: nationality,
		activeFiveTwo: 'active'
	});
});

router.post('/newStudent', userHelpers.isLogin, function (req, res) {
	req.body.UserId = 1;
	models.Student.create(req.body)
		.then(function () {
			res.redirect('/student?msg=1');
		});
});

// getAllNationality
router.get('/getAllNationality', userHelpers.isLogin, function (req, res) {
	res.send(nationality);
});

/////////////// delete deleteStudent
router.get('/deleteStudent/:id', userHelpers.isLogin, function (req, res) {
	models.Student.destroy({
		where: {
			id: req.params.id
		}
	}).then(function (todo) {
      	res.send({
        	msg: "1"
      	}); //got deleted successfully
    }).catch(function (err) {
      	res.send({
        	msg: "2"
      	}); //has foreign-key restriction
    });
});

// updateStudent
router.post('/updateStudent', userHelpers.isLogin, function (req, res) {
	id = req.body.id;
	delete req.body.id;
	models.Student.find({
			where: {
				id: id
			}
		})
		.then(function (todo) {
			todo.updateAttributes(req.body)
				.then(function (todo) {
					res.send(true);
				})
				.catch(function (err) {
					console.log(err);
				});
		});
});

router.get('/studentsearch/:name', function (req, res) {
	var page = userHelpers.getPage(req);
	var limit = userHelpers.getLimit(page);
	models.Student.findAndCountAll({
			where: {
				first_name: {
					$like: '%' + req.params.name + '%'
				}
			},
			limit: 10,
			offset: limit,
		})
		.then(function (students) {
			var pageCount = userHelpers.getPageCount(students.count);
			var pagination = userHelpers.paginate(page, pageCount);
			console.log(students, pagination);
			var obj = {
				students: students,
				pagination: pagination
			};
			res.send(obj);
		});
});
// //////End students /////////////////////////////////////////

module.exports = router;
