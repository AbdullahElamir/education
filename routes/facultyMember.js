var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var nationality = require('../Nationality');

// ///  Start facility member  ////////////////////////////////////////////////
router.get('/',userHelpers.isLogin, function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  var q = userHelpers.getQuery(req);
  if (q == undefined){
    models.Faculty_member.findAndCountAll({
      include: [{
        model: models.Department,
        where: { status: 1 }
      }],
      where: {
        status: 1
      },
      limit : 10,
      offset: limit,
    }).then(function(facultyMembers) {
      models.Department.findAll({
        where: {
          status: 1
        }
      }).then(function(allDepartments) {
        var pageCount = userHelpers.getPageCount(facultyMembers.count);
        var pagination = userHelpers.paginate(page,pageCount);
        res.render('facultyMember', { title: 'عرض المحاضرين',nationalityJade:nationality,depts:allDepartments,pagination:pagination,collapseSix: 'collapse in', faculty_Members:facultyMembers.rows, activeSixOne: 'active', name:req.session.name });
      });
    });
  } else {
    models.Faculty_member.findAndCountAll({
      include: [{
        model: models.Department,
        where: { status: 1 }
      }],
      where: {
        status: 1,
        name :{$like:'%'+q+'%'}
      },
      limit : 10,
      offset: limit,
    }).then(function(facultyMembers) {
      models.Department.findAll({
        where: {
          status: 1
        }
      }).then(function(allDepartments) {
        var pageCount = userHelpers.getPageCount(facultyMembers.count);
        var pagination = userHelpers.paginate(page,pageCount);
        res.render('facultyMember', { title: 'عرض المحاضرين',nationalityJade:nationality,depts:allDepartments,pagination:pagination,collapseSix: 'collapse in', faculty_Members:facultyMembers.rows, activeSixOne: 'active', name:req.session.name });
      });
    });
  }
});

router.get('/newFacultyMember',userHelpers.isLogin, function(req, res) {
  models.Department.findAll({
    where: {
      status: 1
    }
  }).then(function(Departments) {
    res.render('newFacultyMember', { title: 'إضافة محاضر جديد', name:req.session.name,nationalityJade:nationality, departments:Departments , collapseSix: 'collapse in', activeSixTwo: 'active' });
  });
});

router.post('/addFacultyMembers',userHelpers.isLogin, function(req, res) {
  req.body.UserId=req.session.idu;
  models.Faculty_member.create(req.body).then(function() {
    res.redirect('/facultyMember?msg=1');
  });
});

// delete FaculityMembers
router.get('/deleteFaculityMembers/:id',userHelpers.isLogin, function(req, res) {
  models.Faculty_member.destroy({
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

// updateFacultyMember
router.post('/updateFacultyMember',userHelpers.isLogin, function(req, res) {
  id = req.body.id;
  delete req.body.id;
  models.Faculty_member.update(req.body,{
    where: {
      id: id
    }
  }).then(function (result) {
    models.Faculty_member.findOne({
      where : {
        id : id
      },
      include:[{
        model: models.Department,
        required:false,
          where:{
          status:1
        }
      }]
    }).then(function (result){
      var country = findCountry(nationality,result.nationality);
      result.dataValues.nationalityName = country.name;
      res.send(result);  
    });
  });
});

router.get('/facultyMembersearch/:name',function(req, res) {
  models.Faculty_member.findAll({
    include: [{
      model: models.Department,
      where: { status: 1 }
    }],
    where: {
      status: 1,
      name: {$like:'%'+req.params.name+'%'}
    }
  }).then(function(facultymember) {
    console.log(nationality);
    res.send(facultymember);
  });
});

findCountry = function(countryList,id) {
  var found=null;
  for (obj in countryList) {
    if(countryList[obj].id==id){
      found= countryList[obj];
      break;
    }
  }
  return found;
}
// ///  End facility member  //////////////////////////////////////////////

module.exports = router;