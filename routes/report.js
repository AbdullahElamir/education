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
  console.log(objReport);
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
  jsreport.render({
    template: {
      content: fs.readFileSync(path.join(__dirname, "../views/presenceAbsenceLectures.html"), "utf8"),
      recipe: "phantom-pdf",
    },
  }).then(function (response) {
    response.result.pipe(res);
  });
});

module.exports = router;