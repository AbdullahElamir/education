var express = require('express');
var router = express.Router();
var models  = require('../models');
var url=require('url');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var nationality = require('../Nationality.json');
var Sequelize = require('sequelize')
// var jsr = require("jsreport");
var fs = require("fs");
var path = require("path");
var obj = {
  subjects :[{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'}],
  classes :[{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:2,class_name:'الثاني',subjects:[{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'}]},{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:3,class_name:'الاول',subjects:[{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'}]},{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:3,class_name:'الثالث'},{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:4,class_name:'الرابع'},{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:5,class_name:'الخامس'}],
 
}



/* GET home page. */

router.get('/', function(req, res) {
  res.render('authentication', { title: 'Login' });
});

router.get('/cPanel',userHelpers.isLogin, function(req, res) {
  res.render('cPanel', { title: 'Control Panel', activeCPanel: 'active' });l
});

router.get('/cPanelTest',userHelpers.isLogin, function(req, res) {
  res.render('cPanelTest', { title: 'Control Panel', active: 'active' });
});

// get all seme //
router.get('/semesters',userHelpers.isLogin, function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  models.Semester.findAndCountAll({
    where: {
      status: 1
    },
    limit : 10,
    offset: limit,
  }).then(function(semester) {
    var pageCount = userHelpers.getPageCount(semester.count);
    var pagination = userHelpers.paginate(page,pageCount);
      res.render('semesters', { title: 'View Semesters', semester: semester.rows,pagination:pagination, collapseOne: 'collapse in', activeOneOne: 'active' });
  });
});

router.get('/newSemester',userHelpers.isLogin, function(req, res) {
  res.render('newSemester', { title: 'New Semester',collapseOne: 'collapse in', activeOneTwo: 'active' });
});



router.get('/transcript', function(req, res, next) {
 jsr.render({
    template: { 

      content:  fs.readFileSync(path.join(__dirname, "../views/transcript.html"), "utf8"),
        // content: "<h1>Hello world</h1>",
        recipe: "phantom-pdf"
    },

    data:obj
}).then(function (response) {
   //you can for example pipe it to express.js response
   response.result.pipe(res);
});
});

router.get('/semester/:id',userHelpers.isLogin, function(req, res) {
  models.Semester.findOne({
    where: {
      id: req.params.id,
      status: 1
    }
  }).then(function(semester) {
    models.Department.findAll({
      where: {
        status: 1
      }
    }).then(function(departments) {
      var semType="";
      if(semester.sem_type==0)
      {
        semType = "سنة";
      }
      if(semester.sem_type==1)
      {
        semType = "ربيعي";
      }
      if(semester.sem_type==2)
      {
      semType = "خريفي";
      }
      if(semester.sem_type==3)
      {
      semType = "صيفي";
      }

      res.render('semester', { title: 'Semester',sem:semType,semester:semester,departments:departments });
        //res.render('locations', { title: 'View Locations', loc: location, collapseTwo: 'collapse in', activeTwoOne: 'active' });
    });
  });
});

router.get('/semester/:id/:id',userHelpers.isLogin, function(req, res) {
  res.render('subGroup', { title: 'Get Sub Group' });
});

router.post('/newSemester',userHelpers.isLogin, function(req, res) {

  req.body.UserId=1;//req,session.id
  models.Semester.create(req.body).then(function() {
    res.redirect('/semesters');
  });
});

router.get('/locations',userHelpers.isLogin, function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  models.Location.findAndCountAll({
    where: {
      status: 1
    },
    limit : 10,
    offset: limit,
  }).then(function(location) {
    var pageCount = userHelpers.getPageCount(location.count);
    var pagination = userHelpers.paginate(page,pageCount);
      res.render('locations', { title: 'View Locations', loc: location.rows,pagination:pagination, collapseTwo: 'collapse in', activeTwoOne: 'active' });
  });
});

router.get('/newLocation',userHelpers.isLogin, function(req, res) {
  res.render('newLocation', { title: 'New Location', collapseTwo: 'collapse in', activeTwoTwo: 'active' });
});

router.post('/newLocation',userHelpers.isLogin, function(req, res) {
  req.body.UserId=1;//req,session.id
  models.Location.create(req.body).then(function() {
    res.redirect('/locations');
  });
});

router.get('/departments',userHelpers.isLogin, function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  models.Department.findAndCountAll({
    where: {
      status: 1
    },
    limit : 10,
    offset: limit,
  }).then(function(department) {
    var pageCount = userHelpers.getPageCount(department.count);
    var pagination = userHelpers.paginate(page,pageCount);
    res.render('departments', { title: 'View departments',pagination:pagination,collapseFour: 'collapse in', dept:department.rows, activeFourOne: 'active' });
  });
});

// view editDepartments


router.get('/getLocation/:id', function(req, res) {
   models.Location.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(location) {
    res.send(location);
  });
});

router.get('/getFacultyMember/:id', function(req, res) {
  models.Faculty_member.findAll({
    include: [{
      model: models.Department,
      where: { status: 1 }
    }],
    where: {
      id: req.params.id,
      status: 1
    }
  }).then(function(faculty) {
    res.send(faculty);
  });
});


router.get('/getSubject/:id', function(req, res) {
   models.Subject.findAll({
    where: { status: 1 , id: req.params.id},
        "include" : [
              {"model" : models.User},
              {"model"  : models.Department}
        ],

  }).then(function(subject) {
    res.send(subject);
  });
});




router.get('/editDepartments/:id', function(req, res) {
   models.Department.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(department) {
    res.send(department);
  });
});

// edit department
router.post('/updateDepartment', function(req, res) {
  id = req.body.id;
  delete req.body.id;
  models.Department.find({
    where: {
      id: id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
        var rel = {result : todo ,stat : true};
        res.send(rel);
    }).catch(function (err) {
        console.log(err);
    });
  });
});

router.post('/editLocation', function(req, res) {
  id = req.body.locid;
  models.Location.find({
    where: {
      id: id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      res.redirect('/locations');
    }).catch(function (err) {
        console.log(err);
    });
  });
});

///editSubject

router.post('/editSubject', function(req, res) {
  
  // genral عام
  if(req.body.subject_type==1)
  {
    req.body.DepartmentId=1;
    req.body.UserId=1;
     models.Subject.find({
    where: {
      id: req.body.id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      res.redirect('/subjects');
    }).catch(function (err) {
        console.log(err);
    });

     });

  } else if(req.body.subject_type==2){

    //console.log(req.body);
    req.body.UserId=1;
     models.Subject.find({
    where: {
      id: req.body.id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      res.redirect('/subjects');
    }).catch(function (err) {
        console.log(err);
    });
  });
  } else if(req.body.subject_type==3){

      req.body.UserId=1;
     models.Subject.find({
    where: {
      id: req.body.id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      res.redirect('/subjects');
    }).catch(function (err) {
        console.log(err);
    });
  });

  }

});


///semester/#{semester.id}/updateSemester

router.post('/semester/:id/updateSemester', function(req, res) {
  if(req.body.sem_type == "ربيعي")
    {
      req.body.sem_type= 1;
    } 

    if(req.body.sem_type == "خريفي"){
    req.body.sem_type = 2;
    } 

    if(req.body.sem_type == "صيفي")
    {
      req.body.sem_type = 3;
    } 

   id = req.params.id;
  models.Semester.find({
    where: {
      id: id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      res.redirect('/semester/'+req.params.id);
    }).catch(function (err) {
        console.log(err);
    });

     });
     });
 
// delete Department
router.get('/deleteDepartment/:id', function(req, res) {
  models.Department.find({
    where: {
      id: req.params.id
    }
    }).then(function (todo) {
    todo.updateAttributes({
        status: 0
    }).then(function (todo) {
        res.send(todo);
    }).catch(function (err) {
        console.log(err);
    });
  });
});


router.get('/deleteLocation/:id', function(req, res) {
  models.Location.find({
    where: {
      id: req.params.id
    }
    }).then(function (todo) {
    todo.updateAttributes({
        status: 0
    }).then(function (todo) {
        res.send(todo);
    }).catch(function (err) {
        console.log(err);
    });
  });
});



router.get('/deleteSubject/:id', function(req, res) {
  models.Subject.find({
    where: {
      id: req.params.id
    }
    }).then(function (todo) {
    todo.updateAttributes({
        status: 0
    }).then(function (todo) {
        res.send(todo);
    }).catch(function (err) {
        console.log(err);
    });
  });
});

router.get('/deleteSemesters/:id', function(req, res) {
  models.Semester.find({
    where: {
      id: req.params.id
    }
    }).then(function (todo) {
    todo.updateAttributes({
        status: 0
    }).then(function (todo) {
        res.send(todo);
    }).catch(function (err) {
        console.log(err);
    });
  });
});

// updateFacultyMember
router.post('/updateFacultyMember', function(req, res) {
  models.Faculty_member.find({
    where: {
      id: req.body.id
    }
  }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      res.redirect('/facultyMembers');
    }).catch(function (err) {
        console.log(err);
    });
  });
});

router.get('/newDepartment',userHelpers.isLogin, function(req, res) {
  res.render('newDepartment', { title: 'New Department', collapseFour: 'collapse in', activeFourTwo: 'active' });
});

router.post('/newDepartment',userHelpers.isLogin, function(req, res) {
  req.body.UserId=1;//req,session.id
  models.Department.create(req.body).then(function() {
    res.redirect('/departments');
  });
});


router.post('/saveSubject',function(req, res) {

 var PrerequisiteId=req.body.idd;
 if(PrerequisiteId == undefined)
 {
 req.body.UserId=1;
  models.Subject.create(req.body).then(function(result) {
   res.send(true);
});

}
 else
 {
   var PrerequisiteId=req.body.idd;
  req.body.UserId=1;
  models.Subject.create(req.body).then(function(result) {
   var SubjectId=result.id;

   for(var i=0;i<PrerequisiteId.length;i++)
   {
    var obj = {PrerequisiteId:PrerequisiteId[i],SubjectId:SubjectId};
     models.sequelize.query('INSERT INTO `SubjectHasPrerequisites`(`SubjectId`, `PrerequisiteId`) VALUES ("'+SubjectId+'","'+PrerequisiteId[i]+'")').then(function(results){
     console.log(result);
     res.send(true);

    });
   }
    res.send(true);
  });
 }





  });

router.get('/divisions',userHelpers.isLogin, function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  models.Division.findAndCountAll({
    include: [{
      model: models.Department,
      where: { status: 1 }
    }],
    where: {
      status: 1
    },
    limit : 10,
    offset: limit,
  }).then(function(division) {
    var pageCount = userHelpers.getPageCount(division.count);
    var pagination = userHelpers.paginate(page,pageCount);
    models.Department.findAll({
    where: {
      status: 1
    }
  }).then(function(department) { 
  res.render('divisions', { title: 'View divisions', departments: department, divisions: division.rows,pagination:pagination, collapseFour: 'collapse in', activeFourThree: 'active' });
  });
  });
});

router.get('/division/:id',userHelpers.isLogin, function(req, res) {
  models.sequelize.query('SELECT * FROM `Divisions` d,`Subjects` s WHERE `s`.`system_type` = 1 AND `d`.`id` = ? AND `d`.`DepartmentId`= `s`.`DepartmentId` AND `s`.`id` NOT IN (SELECT `SubjectId` FROM `DivisionSubjects` WHERE `DivisionId` = ? );', { replacements: [req.params.id,req.params.id] }
).then(function(subjectsS){
  models.sequelize.query('SELECT * FROM `Divisions` d,`Subjects` s WHERE `s`.`system_type` = 2 AND `d`.`id` = ? AND `d`.`DepartmentId`= `s`.`DepartmentId` AND `s`.`id` NOT IN (SELECT `SubjectId` FROM `DivisionSubjects` WHERE `DivisionId` = ? );', { replacements: [req.params.id,req.params.id] }
  ).then(function(subjectsY){
    models.sequelize.query('SELECT * FROM `DivisionSubjects` d ,`Subjects` s WHERE `d`.`DivisionId` = ? AND `d`.`SubjectId`= `s`.`id` AND `s`.`system_type`=1; ', { replacements: [req.params.id] }
    ).then(function(semester){
      models.sequelize.query('SELECT * FROM `DivisionSubjects` d ,`Subjects` s WHERE `d`.`DivisionId` = ? AND `d`.`SubjectId`= `s`.`id` AND `s`.`system_type`=2; ', { replacements: [req.params.id] }
      ).then(function(year){
        res.render('division', { title: 'View division',subjectsS:subjectsS[0],subjectsY:subjectsY[0],semester:semester[0],year:year[0],id_div:req.params.id ,collapseFour: 'collapse in', activeFourThree: 'active' });
      });
    });
  });
});
});

//SELECT * FROM `DivisionSubject` d ,`Subjects` s WHERE `d`.`DivisionId` = ? AND `d`.`SubjectId`= `s`.`id` AND `s`.`system_type`=2;
//////////////////////////

router.post('/updateDivision', function(req, res) {
  var id = req.body.id;
  models.Division.find({
    where: {
      id: id
    }
    }).then(function (todo) {
    todo.updateAttributes(req.body).then(function (todo) {
      models.Department.findAll({
        where: 
         { status: 1,
           id :todo.DepartmentId
         }
    }).then(function(Departments) {
        var rel = {result : Departments ,stat : true};
        res.send(rel);
    }).catch(function (err) {
        console.log(err);
    });
  });
  });
});

router.get('/newDivision',userHelpers.isLogin, function(req, res) {
  models.Department.findAll({
    where: {
      status: 1
    }
  }).then(function(departments) {
    res.render('newDivision', { title: 'New Division', departments: departments, collapseFour: 'collapse in', activeFourFour: 'active' });
  });
});

router.post('/newDivision',userHelpers.isLogin, function(req, res) {
  req.body.UserId=1;//req,session.id
  models.Division.create(req.body).then(function() {
    res.redirect('/newDivision');
  });
});

router.get('/deleteDivision/:id', function(req, res) {
  models.Division.find({
    where: {
      id: req.params.id
    }
    }).then(function (todo) {
    todo.updateAttributes({
        status: 0
    }).then(function (todo) {
        res.send(todo);
    }).catch(function (err) {
        console.log(err);
    });
  });
});

// router.get('/facultyMembers',userHelpers.isLogin, function(req, res) {
//   res.render('facultyMembers', { title: 'View Faculty Members', collapseSix: 'collapse in', activeSixOne: 'active' });
// });

router.get('/newFacultyMember',userHelpers.isLogin, function(req, res) {
  models.Department.findAll({
    where: {
      status: 1
    }
  }).then(function(Departments) {
    res.render('newFacultyMember', { title: 'New Faculty Member', nationalityJade:nationality, departments:Departments , collapseSix: 'collapse in', activeSixTwo: 'active' });
  });
  
});

router.post('/addFacultyMembers',userHelpers.isLogin, function(req, res) {
  req.body.UserId=1;//req,session.id
  // req.body.DepartmentId=5;
  models.Faculty_member.create(req.body).then(function() {
    res.redirect('/facultyMembers');
  });
});

// delete FaculityMembers
router.get('/deleteFaculityMembers/:id', function(req, res) {
  models.Faculty_member.find({
    where: {
      id: req.params.id
    }
    }).then(function (todo) {
    todo.updateAttributes({
        status: 0
    }).then(function (todo) {
        res.send(todo);
    }).catch(function (err) {
        console.log(err);
    });
  });
});

router.get('/facultyMembers',userHelpers.isLogin, function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
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
    var pageCount = userHelpers.getPageCount(facultyMembers.count);
    var pagination = userHelpers.paginate(page,pageCount);
    res.render('facultyMembers', { title: 'View faculty members',pagination:pagination,collapseSix: 'collapse in', faculty_Members:facultyMembers.rows, activeSixOne: 'active' });
  });
});


router.get('/students',userHelpers.isLogin, function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  models.Student.findAndCountAll({
    where: {
      status: 1
    },
    limit : 10,
    offset: limit,
  }).then(function(student) {
    var pageCount = userHelpers.getPageCount(student.count);
    var pagination = userHelpers.paginate(page,pageCount);
  res.render('students', { title: 'View Students', student:student.rows,pagination:pagination,collapseFive: 'collapse in', activeFiveOne: 'active' });
});
});

router.get('/newStudent',userHelpers.isLogin, function(req, res) {
  res.render('newStudent', { title: 'New Student', collapseFive: 'collapse in', activeFiveTwo: 'active' });
});

router.post('/newStudent', userHelpers.isLogin,function(req, res) {
  userHelpers.addUser(req.body, function (results){
    res.redirect('/students');
  });
});
// ---------------------------------------
router.get('/testPage',userHelpers.isLogin, function(req, res) {
  res.render('testPage', { title: 'HTML Test Page' });
});

router.get('/newUser',userHelpers.isLogin, function(req, res) {
    res.render('newUser', { title: 'New User', activeUser: 'active' });
});

router.post('/newUser',userHelpers.isLogin, function(req, res) {
  console.log(req.body);
  userHelpers.addUser(req.body,function(result){
    res.redirect('/newUser');
  });
});

router.get('/users',userHelpers.isLogin, function(req, res) {
  models.User.findAll({
    where: {
      status: 1
    }
  }).then(function(user) {
  res.render('users', { title: 'View users',Users: user , activeUser: 'active' });
  });
});
/////////////// delete Users 
router.get('/deleteUsers/:id', function(req, res) {
  models.User.find({
    where: {
      id: req.params.id
    }
    }).then(function (todo) {
    todo.updateAttributes({
        status: 0
    }).then(function (todo) {
        res.send(todo);
    }).catch(function (err) {
        console.log(err);
    });
  });
});

router.get('/timelines',userHelpers.isLogin, function(req, res) {
  res.render('timelines', { title: 'View Timelines' });
});


router.get('/subjects', function(req, res) {
  var page = userHelpers.getPage(req);
  var limit = userHelpers.getLimit(page);
  models.Subject.findAndCountAll({
    where: {
      status: 1
    },
    limit : 10,
    offset: limit,
  }).then(function(Subject) {
    var pageCount = userHelpers.getPageCount(Subject.count);
    var pagination = userHelpers.paginate(page,pageCount);    
   models.Department.findAll({
      where: {
        status: 1
      }
    }).then(function(departments) {

        res.render('subjects', { title: 'subjects',dep:departments,pagination:pagination,collapseThree: 'collapse in', activeThreeOne: 'active' ,Sub : Subject.rows});
    }); 
  }); 
});

router.get('/deleteDivisionsbject/:ids/:idd', function(req, res) {
   models.DivisionSubject.destroy({
    where: {
      SubjectId:req.params.ids,
      DivisionId:req.params.idd
    }
  }).then(function(results){
    models.Subject.findOne({where:{
      id:req.params.ids
       }}).then(function(result){
        res.send(result);
    });
  });
});


router.post('/addDivisionSubject',function(req,res){
 models.DivisionSubject.create(req.body).then(function(result){
  models.Subject.findOne({where:{
    id:req.body.SubjectId
  }}).then(function(result){
    res.send(result);
  });
  
 });
});
router.get('/newSubject', function(req, res) {

    models.Subject.findAll({
    where: {
      status: 1
    }
  }).then(function(subject) {
     models.Department.findAll({
      where: {
        status: 1
      }
    }).then(function(departments) {
  //console.log(departments);
  res.render('newSubject', {title: 'New Subject',dept:departments, collapseThree: 'collapse in', activeThreeTwo: 'active',sub:subject});
});
});
});

module.exports = router;