var express = require('express');
var router = express.Router();
var models = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var jsreport = require("jsreport");
var fs = require("fs");
var path = require("path");

router.get('/', userHelpers.isLogin, function (req, res) {
   models.Semester.findAll({
      where: {
        status: 1
      }
    }).then(function (semester) {
      models.Department.findAll({
          where: {
            status: 1
          }
        }).then(function (department) {
           models.Subject.findAll({
          where: {
            status: 1
          }
        }).then(function (subject) {
    res.render('reports', {
    title: 'طباعة تقارير',
    name: req.session.name,
    sem: semester,
    dep: department,
    sub:subject,
    collapseEight: 'collapse in',
    activeEightThree: 'active'
    });
    });
  });
});
});


function PresenceAbsenceLectures(obj,newObj,sub,doct) {
  var semText='';
  if(newObj.semType==1){
    semText='ربيع';
  } else if(newObj.semType==2){
    semText='خريف';
  } else if(newObj.semType==3){
    semText='صيف';
  }
  var level = ['الاول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر', 'الحادي العاشر', 'الثاني عشر'];
  HTML=' ';
  HTML=' <body> \
    <div class="container"> \
      <div class="row"> \
        <div class="col-xs-12"> \
          <h5 class="text-center">  \
            المعهد العالي للمهن الطبية القره بوللي \
          </h5> \
          <h5 class="text-center">  \
           كشف حضور وغياب المحاضرات للفصل '+level[newObj.level-1]+' '+newObj.dev+' للفصل الدراسي '+semText+'  \
            <span class="number">'+newObj.semester+'</span> م \
          </h5> \
          <div class="col-xs-6"> \
            <h5 class="text-center"> \
              المادة <span>/</span> '+newObj.courseName+' \
            </h5> \
          </div> \
          <div class="col-xs-6"> \
            <h5 class="text-center"> \
              استاذ المادة <span>/ '+doct+' </span> \
            </h5> \
          </div> \
          <h5 class="text-center"> \
              المجموعة <span>/ '+sub+'</span> \
            </h5> \
          <table class="table condensed"> \
            <thead> \
              <tr> \
                <th class="text-center" rowspan="2" width="5%" style="line-height: 40px;">ت</th> \
                <th class="text-center" rowspan="2" width="30%" style="line-height: 40px;">اســـــــــــــــــــــــم الطالب<span>/</span>ة</th> \
                <th class="text-center" rowspan="2" width="1%" style="line-height: 40px;">رقم القيد</th> \
                <th class="text-center" colspan="5">شهر <span>.............................</span></th> \
              </tr> \
              <tr> \
                <th class="text-center">.............</th> \
                <th class="text-center">.............</th> \
                <th class="text-center">.............</th> \
                <th class="text-center">.............</th> \
                <th class="text-center">.............</th> \
              </tr> \
            </thead> \
            <tbody> \
            ';
            for(i in obj){
              HTML=HTML+' \
               <tr>\
                  <td class="text-center number">1</td>\
                  <td class="text-center">'+obj[i].first_name +' '+obj[i].father_name+' '+obj[i].last_name+'</td> \
                  <td class="text-center number">209103304</td>\
                  <td class="text-center"></td>\
                  <td class="text-center"></td>\
                  <td class="text-center"></td>\
                  <td class="text-center"></td>\
                  <td class="text-center"></td>\
                </tr> ' ;
            }
          HTML=HTML+' </tbody> \
          <table>\
        </div>\
      </div>\
    </div>\
  </body>';
return HTML;
}





function presenceAbsenceSubject(obj,newObj) {
  var semText='';
  if(newObj.semType==1){
    semText='ربيع';
  } else if(newObj.semType==2){
    semText='خريف';
  } else if(newObj.semType==3){
    semText='صيف';
  }
  var level = ['الاول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر', 'الحادي العاشر', 'الثاني عشر'];
  HTML=' ';
  HTML=' \
  <body> \
    <div class="container"> \
      <div class="row"> \
        <div class="col-xs-12"> \
          <h5 class="text-center">  \
            المعهد العالي للمهن الطبية القره بوللي \
          </h5> \
          <h5 class="text-center">  \
            كشف حضور وغياب الامتحان النهائي للفصل '+level[newObj.level-1]+' '+newObj.dev+' للفصل الدراسي '+semText+'  \
            <span class="number">'+newObj.semester+'</span> م \
          </h5> \
          <h5> \
            المادة <span>/</span> '+newObj.courseName+' \
          </h5> \
          <table class="table condensed"> \
            <thead> \
              <tr> \
                <th class="text-center" width="7%">ت</th> \
                <th class="text-center">اسم الطالب<span>/</span>ة</th> \
                <th class="text-center" width="20%">رقم القيد</th> \
                <th class="text-center" width="22%">التوقيع</th> \
              </tr> \
            </thead> \
            <tbody> ';
            for(i in obj){
            HTML=HTML+' <tr> \
                <td class="text-center number">1</td> \
                <td class="text-center">'+obj[i].first_name +' '+obj[i].father_name+' '+obj[i].last_name+'</td> \
                <td class="text-center number">209103304</td> \
                <td class="text-center"></td> \
              </tr> ';
            }
            HTML=HTML+'</tbody> \
          <table> \
            </div> \
            <div class="col-xs-6"> \
              <h5 class="text-center"> \
                اسم الملاحظ <span>/</span> \
              </h5> \
              <h5 class="text-center"> \
                <span>..................................................</span> \
              </h5> \
            </div> \
            <div class="col-xs-6"> \
              <h5 class="text-center"> \
                التوقيع <span>/</span> \
              </h5> \
              <h5 class="text-center"> \
                <span>.............................</span> \
              </h5> \
            </div> \
          </div> \
        </div> \
      </body> \
    </html>';
  return HTML;
  }


var objReport={};
router.post('/setData', userHelpers.isLogin, function (req, res, next) {
  objReport=req.body;
  res.send(true);
});

router.get('/presenceAbsenceSubject', userHelpers.isLogin, function (req, res, next) {
  var dateSem=objReport.semester+"-01-01"
  dateSem = dateSem.replace(/\s/g, '');
  console.log(dateSem);
  var date=new Date(dateSem);
  console.log(date);
  models.sequelize.query('select std.first_name,std.father_name,std.grand_name,std.last_name,std.set_number from Students as std where std.id in (select at.StudentId from Academic_transcripts as at where at.SubGroupId = (select subg.id from Subjects as sub,Sub_groups as subg where sub.id=? and sub.id=subg.SubjectId) and at.SemesterStudentId in (select ss.id from SemesterStudents as ss where ss.DivisionId=? and ss.level=? and ss.SemesterId in (SELECT sem.id FROM `Semesters` as sem where sem.year=? and sem.sem_type=? and sem.system_type=1)))', {
    replacements: [objReport.courseId,objReport.devId,objReport.level,date,objReport.semType]
  }).then(function (studentReport) {
    jsreport.render({
      template: {
        content: fs.readFileSync(path.join(__dirname, "../views/presenceAbsenceSubject.html"), "utf8"),
        recipe: "phantom-pdf",
         helpers: presenceAbsenceSubject.toString()
      },
       data: {
              obj:studentReport[0]  ,
              newObj:objReport
       }
    }).then(function (response) {
      response.result.pipe(res);
    });
  });
});

router.get('/PresenceAbsenceLectures', userHelpers.isLogin, function (req, res, next) {
  var dateSem=objReport.semester+"-01-01"
  dateSem = dateSem.replace(/\s/g, '');
  console.log(dateSem);
  var date=new Date(dateSem);
  models.sequelize.query('select std.first_name,std.father_name,std.grand_name,std.last_name,std.set_number from Students as std where std.id in (select at.StudentId from Academic_transcripts as at where at.SubGroupId in (select subg.id from Subjects as sub,Sub_groups as subg where sub.id=? and sub.id=subg.SubjectId) and at.SemesterStudentId in (select ss.id from SemesterStudents as ss where ss.DivisionId=? and ss.level=? and ss.SemesterId in (SELECT sem.id FROM `Semesters` as sem where sem.year=? and sem.sem_type=? and sem.system_type=1)))', {
    replacements: [objReport.courseId,objReport.devId,objReport.level,date,objReport.semType]
  }).then(function (studentReport) {
    models.sequelize.query('select id from Semesters where year=? and sem_type=?', {
    replacements: [date,objReport.semType]
    }).then(function (semId) {
      models.sequelize.query('select s.FacultyMemberId,s.sub_group_name from Sub_groups as s where s.SubjectId=? and SemesterId=? and s.DivisionId=?', {
      replacements: [objReport.courseId,semId[0][0].id,objReport.devId]
      }).then(function (subg) {
        models.sequelize.query('select name from Faculty_members where id=?', {
          replacements: [subg[0][0].FacultyMemberId]
        }).then(function (doc) {
          jsreport.render({
          template: {
            content: fs.readFileSync(path.join(__dirname, "../views/presenceAbsenceLectures.html"), "utf8"),
            recipe: "phantom-pdf",
            helpers: PresenceAbsenceLectures.toString()
          },
          data: {
            obj:studentReport[0]  ,
            newObj:objReport,
            sub:subg[0][0].sub_group_name,
            doct:doc[0][0].name
          }
          }).then(function (response) {
            response.result.pipe(res);
          }); 
        });
      });
    });
  });
});

module.exports = router;