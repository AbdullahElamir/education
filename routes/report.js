var express = require('express');
var router = express.Router();
var models = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var jsreport = require("jsreport");
var fs = require("fs");
var path = require("path");
var Step = require('step');
var nationality = require('../Nationality');

router.get('/NumberOfStudents', userHelpers.isLogin, function (req, res) {
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
    res.render('NumberOfStudents', {
    title: 'طباعة تقارير',
    name: req.session.name,
    sem: semester,
    dep: department,
    sub:subject,
    collapseEight: 'collapse in',
    activeEightseven: 'active'
    });
    });
  });
});
});

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
            var count=0;
            for(i in obj){
              count++;
              HTML=HTML+' \
               <tr>\
                  <td class="text-center number">'+(count)+'</td>\
                  <td class="text-center">'+obj[i].first_name +' '+obj[i].father_name+' '+obj[i].last_name+'</td> \
                  <td class="text-center number">'+obj[i].set_number+'</td>\
                  <td class="text-center"></td>\
                  <td class="text-center"></td>\
                  <td class="text-center"></td>\
                  <td class="text-center"></td>\
                  <td class="text-center"></td>\
                </tr> ' ;
            }
            var x=count;
            for(var t=0;t<(28-x);t++){
              count++;
                HTML=HTML+' \
               <tr>\
                  <td class="text-center number">'+(count)+'</td>\
                  <td class="text-center"></td> \
                  <td class="text-center number"></td>\
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

function showReportt3(objj,Bdate,gender){
  var HTML=' ';
 HTML='<table class="table table-bordered text-center fontSizeBody"> \
      <tr>\
        <th> رقم </th>\
        <th> رقـم ورقـة الـعـائـلـة </th>\
        <tH> قـيـد الـعـائـلـة </th>\
        <th> اسـم الـطـالـب </th> \
        <th> اسـم الـعـائـلـة </th> \
        <th> تـاريـخ الـمـيـلاد </th> \
        <th> مـكـان الـمـيـلاد </th> \
        <th> الـجـنـس </th> \
        <th> الـمـعـهـد الـعـالـي </th>\
        <tH> رقـم الـقـيد </th> \
        <th> الـقـسـم </th> \
        <th> الـفـصـل </th> \
        <th> الـمـصـرف </th> \
        <th> الـفـرع </th> \
        <th> رقـم الـحـسـاب </th> \
        <th> الـرقـم الـوطـنـي </th> \
      </tr>';
     for(i in objj){
      HTML=HTML+'\
      <tr> \
        <td> 1 </td> \
        <td>'+objj[i].no_paper_family+'</td> \
        <td>'+objj[i].no_reg_family+'</td> \
        <td> '+objj[i].first_name+'</td> \
        <td>'+objj[i].last_name+'</td> \
        <td> '+Bdate[i]+'</td> \
        <td> '+objj[i].place_birth+'</td>\
        <td> '+gender[i]+'</td> \
        <td> المعهد العالي للمهن الشاملة</td> \
        <td> '+objj[i].set_number+'</td> \
        <td>  </td> \
        <td>  </td> \
        <td>  </td> \
        <td>  </td>  \
        <td>  </td> \
        <td> '+objj[i].nid+'</td> \
      </tr> ';
   }
    HTML=HTML+'\
    </table> \
  </body> \
</html>';
  return HTML;
  }

 function showReportt2(res,notice){
   var HTML=' ';
  HTML=HTML+'<div class="col-xs-12"> \
            <div class="row"> \
              <div style="height:70px;"></div> \
              <table class="table">  \
                <thead> \
                  <tr>  \
                    <th class="text-center" style="width: 80px;">رقم المادة</th> \
                    <th class="text-center">اسم المادة</th> \
                    <th class="text-center" style="width: 80px;">الوحدات</th> \
                    <th class="text-center" style="width: 80px;">الدرجة</th> \
                    <th class="text-center" style="width: 80px;">ألنقاط</th> \
                    <th class="text-center">ملاحظات</th> \
                  </tr> \
                </thead> \
                <tbody>';
              for(i in res){ 
                var notice_string=' ';
                if(notice[i]==1){

                } else if(notice[i]==2){
                  notice_string="إعادة";
                } else if(notice[i]==3){
                  notice_string="تكميلي";
                }
              /*  HTML=HTML+'<tr> \
                        <td class="text-center">'+(parseInt(i)+1)+'</td>  \
                        <td class="text-center">'+res[i].Sub_group.Subject.code+'</td>  \
                        <td class="text-center">'+res[i].Sub_group.Subject.name+'</td>  \
                        <td class="text-center">'+res[i].Sub_group.Subject.no_th_unit+'</td>\
                        <td class="text-center">'+notice_string+'</td> \
                      </tr>';*/

                HTML=HTML+'  <tr> \
                    <td class="text-center">'+res[i].Sub_group.Subject.code+'</td> \
                    <td class="text-center">'+res[i].Sub_group.Subject.name+'</td> \
                    <td class="text-center">'+res[i].Sub_group.Subject.no_th_unit+'</td> \
                    <td class="text-center">1</td> \
                    <td class="text-center">1</td> \
                    <td class="text-center">'+notice_string+'</td> \
                  </tr> '; 
              }
           HTML=HTML+' </tbody> \
              </table> \
              <div style="height: 0px;"></div> \
              <table class="table"> \
                <tbody>\
                  <tr> \
                    <td class="text-center" style="border: 0px;"></td> \
                    <td class="text-center" style="width: 100px;">الوحدات الفصلية</td> \
                    <td class="text-center" style="width: 70px;">22</td> \
                    <td class="text-center" style="width: 100px;">النقاط الفصلية</td> \
                    <td class="text-center" style="width: 70px;">635</td> \
                    <td class="text-center" style="width: 100px;">المعدل الفصلي</td> \
                    <td class="text-center" style="width: 67px;">635</td>\
                  </tr>\
                  <tr> \
                    <td class="text-center" style="border: 0px;"></td> \
                    <td class="text-center" style="width: 100px;">الوحدات التراكمية</td> \
                    <td class="text-center" style="width: 70px;">78</td> \
                    <td class="text-center" style="width: 100px;">النقاط التراكمية</td> \
                    <td class="text-center" style="width: 70px;">3555</td> \
                    <td class="text-center" style="width: 100px;">الوحدات المنجزة</td> \
                    <td class="text-center" style="width: 67px;">56</td>\
                  </tr>\
                  <tr>  \
                    <td class="text-center" style="border: 0px;"></td> \
                    <td class="text-center" style="border: 0px;"></td>\
                    <td class="text-center" style="border: 0px;"></td> \
                    <td class="text-center" style="border: 0px;"></td> \
                    <td class="text-center" style="border: 0px;"></td> \
                    <td class="text-center" style="width: 100px;">المعدل التراكمي</td> \
                    <td class="text-center" style="width: 67px;">45.85</td>\
                  </tr> \
                </tbody>  \
              </table> \
            </div> \
          </div> \
          <div style="height: 20px;"></div> \
          <div class="row"> \
            <div class="col-xs-5 col-xs-offset-1"> \
                <div style="height: 30px;"></div> \
                <span>أعتماد رئيس وحدة المنظومة</span> \
            </div>     \
            <div class="col-xs-2"></div>\
            <div class="col-xs-4 col-xs-offset-2"> \
              <div style="height: 30px;"></div> \
              <span>أعتماد رئيس القسم</span> \
            </div> \
          </div>   \
        </div> \
      </div>   \
    </div> \
  </body> \
</html>';
return HTML;
 }

function showReport(res,notice){
  var HTML=' ';
  HTML=HTML+'<div class="col-xs-12"> \
          <div class="row"> \
            <div style="height:70px;"></div> \
            <table class="table"> \
              <thead>  \
                <tr> \
                  <th class="text-center" style="width: 40px;">ت</th>\
                  <th class="text-center" style="width: 100px;">رقم المادة</th> \
                  <th class="text-center">اسم المادة</th> \
                  <th class="text-center" style="width: 100px;">عدد الوحدات</th> \
                  <th class="text-center">ملاحظات</th> \
                </tr> \
              </thead> \
              <tbody> ';
              for(i in res){ 
                var notice_string=' ';
                if(notice[i]==1){

                } else if(notice[i]==2){
                  notice_string="إعادة";
                } else if(notice[i]==3){
                  notice_string="تكميلي";
                }
                HTML=HTML+'<tr> \
                        <td class="text-center">'+(parseInt(i)+1)+'</td>  \
                        <td class="text-center">'+res[i].Sub_group.Subject.code+'</td>  \
                        <td class="text-center">'+res[i].Sub_group.Subject.name+'</td>  \
                        <td class="text-center">'+res[i].Sub_group.Subject.no_th_unit+'</td>\
                        <td class="text-center">'+notice_string+'</td> \
                      </tr>';
              }
           HTML=HTML+'</tbody>   \
            </table> \
          </div> \
        </div> \
        <div style="height: 10px;"></div> \
          <div class="row"> \
            <div class="col-xs-5 col-xs-offset-1"> \
                <div style="height: 20px;"></div> \
                <span>أعتماد رئيس وحدة المنظومة</span> \
            </div> \
          <div class="col-xs-2"></div> \
          <div class="col-xs-4 col-xs-offset-2">\
          <div style="height: 20px;"></div> \
          <span>أعتماد رئيس القسم</span> \
        </div> \
      </div>  \
    </div> \
</div> \
</div> \
  </body> \
</html>';
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
            var rowcounter=0;
            var count=0;
            for(i in obj){
              rowcounter++;
              count++;
              HTML=HTML+' <tr> \
                  <td class="text-center number">'+count+'</td> \
                  <td class="text-center">'+obj[i].first_name +' '+obj[i].father_name+' '+obj[i].last_name+'</td> \
                  <td class="text-center number">'+obj[i].set_number+'</td> \
                  <td class="text-center"></td> \
                </tr> ';
            }
            var emptyRecord = 28-rowcounter;
            for(i=0;i<emptyRecord;i++){
              rowcounter++;
              count++;
              HTML=HTML+' <tr> \
                  <td class="text-center number">'+count+'</td> \
                  <td class="text-center"></td> \
                  <td class="text-center number"></td> \
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

var objReport2={};
router.post('/setData2', userHelpers.isLogin, function (req, res, next) {
  objReport2=req.body;
  res.send(true);
});

router.get('/presenceAbsenceSubject', userHelpers.isLogin, function (req, res, next) {
  var dateSem=objReport.semester+"-01-01"
  dateSem = dateSem.replace(/\s/g, '');
  var date=new Date(dateSem);
  models.sequelize.query('select  std.first_name,std.father_name,std.grand_name,std.last_name,std.set_number from Students as std where std.id in (select at.StudentId from Academic_transcripts as at where at.SubGroupId in (select subg.id from Subjects as sub,Sub_groups as subg where sub.id=? and sub.id=subg.SubjectId) and at.SemesterStudentId in (select ss.id from SemesterStudents as ss where ss.DivisionId=? and ss.level=? and ss.SemesterId in (SELECT sem.id FROM `Semesters` as sem where sem.year=? and sem.sem_type=? and sem.system_type=1))) and status=1', {
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
  var date=new Date(dateSem);
  models.sequelize.query('select std.first_name,std.father_name,std.grand_name,std.last_name,std.set_number from Students as std where std.id in (select at.StudentId from Academic_transcripts as at where at.SubGroupId in (select subg.id from Subjects as sub,Sub_groups as subg where sub.id=? and sub.id=subg.SubjectId) and at.SemesterStudentId in (select ss.id from SemesterStudents as ss where ss.DivisionId=? and ss.level=? and ss.SemesterId in (SELECT sem.id FROM `Semesters` as sem where sem.year=? and sem.sem_type=? and sem.system_type=1))) and status=1', {
    replacements: [objReport.courseId,objReport.devId,objReport.level,date,objReport.semType]
  }).then(function (studentReport) {
    models.sequelize.query('select id from Semesters where year=? and sem_type=?', {
    replacements: [date,objReport.semType]
    }).then(function (semId) {
        var semId;
        if(semId[0][0]== undefined){
        semId=-9;
        } else {
          semId=semId[0][0].id;
        }
      models.sequelize.query('select s.FacultyMemberId,s.sub_group_name from Sub_groups as s where s.SubjectId=? and SemesterId=? and s.DivisionId=?', {
      replacements: [objReport.courseId,semId,objReport.devId]
      }).then(function (subg) {
        var su;
        var subString='';
        if(subg[0][0]== undefined){
          subString="لايوجد";
          su=0;
        } else {
          subString=subg[0][0].sub_group_name;
          su=subg[0][0].FacultyMemberId;
        }
        models.sequelize.query('select name from Faculty_members where id=?', {
          replacements: [su]
        }).then(function (doc) {
          var docString="";
          if(doc[0][0]==undefined){
            docString="لايوجد";
          } else { 
            docString=doc[0][0].name;
          }
          jsreport.render({
          template: {
            content: fs.readFileSync(path.join(__dirname, "../views/presenceAbsenceLectures.html"), "utf8"),
            recipe: "phantom-pdf",
            helpers: PresenceAbsenceLectures.toString()
          },
          data: {
            obj:studentReport[0]  ,
            newObj:objReport,
            sub:subString,
            doct:docString
          }
          }).then(function (response) {
            response.result.pipe(res);
          }); 
        });
      });
    });
  });
});

function facultyMemberReport(obj,newObj) {
  var level = ['الاول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر', 'الحادي العاشر', 'الثاني عشر'];
  HTML=' ';
  HTML=' \
  <body> \
    <div class="container"> \
      <div class="row"> \
        <div class="col-xs-12"> \
          <h5 class="text-center">  \
              الهيئة الوطنية للتعليم التقني والفني \
          </h5> \
          <h5 class="text-center">  \
              المعهد العالي للمهن الشاملة \
          </h5> \
          <h5 class="text-center">  \
              القره بوللــــي \
          </h5> \
          <h5 class="text-center">  \
            كشف بساعات اعضاء هيئة التدريس بقسم '+newObj.department+' \
          </h5> \
          <h5> \
            الشعبة <span>/</span> '+newObj.dev+' \
          </h5> \
          <table class="table condensed"> \
            <thead> \
              <tr> \
                <th class="text-center" width="7%">ت</th> \
                <th class="text-center">الاســــــم<span>/</span>ة</th> \
                <th class="text-center" width="20%">المـــادة</th> \
                <th class="text-center" width="10%">الـفصل</th> \
                <th class="text-center" width="10%">الـوحدات</th> \
                <th class="text-center" width="10%">الـنظرية</th> \
                <th class="text-center" width="10%">الـعملية</th> \
                <th class="text-center" width="10%">عدد الـطلبة</th> \
              </tr> \
            </thead> \
            <tbody> ';
            var rowcounter=0;
            var count=0;
            for(i in obj){
              rowcounter++;
              count++;
              var sum = obj[i].no_pr_unit+obj[i].no_th_unit;
              HTML=HTML+' <tr> \
                  <td class="text-center number">'+count+'</td> \
                  <td class="text-center">'+obj[i].nameF+'</td>';
                  HTML=HTML+'<td class="text-center">'+obj[i].nameC+'</td>';
                  HTML=HTML+'<td class="text-center">'+level[obj[i].level-1]+'</td> \
                  <td class="text-center">'+sum+'</td> \
                  <td class="text-center">'+obj[i].no_th_unit+'</td> \
                  <td class="text-center">'+obj[i].no_pr_unit+'</td> \
                  <td class="text-center">'+obj[i].num+'</td> \
                </tr> ';
            }
            var emptyRecord = 26-rowcounter;
            for(i=0;i<emptyRecord;i++){
              rowcounter++;
              count++;
              HTML=HTML+' <tr> \
                  <td class="text-center number">'+count+'</td> \
                  <td class="text-center"></td> \
                  <td class="text-center"></td> \
                  <td class="text-center"></td> \
                  <td class="text-center"></td> \
                  <td class="text-center"></td> \
                  <td class="text-center"></td> \
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

 router.get('/reportFacultyMemer', userHelpers.isLogin, function (req, res) {
  models.Department.findAll({
    where: {
      status: 1
    }
  }).then(function (department) {
   res.render('reportFacultyMemer', { title: 'كشف المحاضرين',dep: department, collapseEight: 'collapse in', activeEightfour: 'active' });
  });
}); 

router.get('/facultyMemberReport', userHelpers.isLogin, function (req, res, next) {
  models.sequelize.query('select count(*) as num,SU.name as nameC,f.name as nameF,SU.no_th_unit,SU.no_pr_unit,Ss.level from Academic_transcripts as ac,Faculty_members as f ,SemesterStudents as Ss ,Semesters as Se ,Subjects as SU ,Sub_groups as S WHERE  S.SubjectId=SU.id and S.FacultyMemberId=f.id and Ss.SemesterId=S.SemesterId and S.DivisionId=? and S.id = ac.SubGroupId GROUP BY S.id ', {
    replacements: [objReport.devId]
  }).then(function (result) {
    jsreport.render({
      template: {
        content: fs.readFileSync(path.join(__dirname, "../views/facultyMemberReport.html"), "utf8"),
        recipe: "phantom-pdf",
        helpers: facultyMemberReport.toString()
      },
      data: {
        obj:result[0],
        newObj:objReport
      }
      }).then(function (response) {
        response.result.pipe(res);
      }); 
  });
});

function SubjectReport(obj,newObj) {
  var level = ['الاول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر', 'الحادي العاشر', 'الثاني عشر'];
  HTML=' ';
  HTML=' \
  <body> \
    <div class="container"> \
      <div class="row"> \
        <div class="col-xs-12"> \
          <h5 class="text-center">  \
              الهيئة الوطنية للتعليم التقني والفني \
          </h5> \
          <h5 class="text-center">  \
              المعهد العالي للمهن الشاملة \
          </h5> \
          <h5 class="text-center">  \
              القره بوللــــي \
          </h5> \
          <h5 class="text-center">  \
            كشف بالمواد الدراسية لقسم '+newObj.department+' \
          </h5> \
          <h5> \
            الشعبة <span>/</span> '+newObj.dev+' \
          </h5> \
          <table class="table condensed"> \
            <thead> \
              <tr> \
                <th class="text-center" width="7%">ت</th> \
                <th class="text-center" width="20%">المـــادة</th> \
                <th class="text-center" width="10%">عدد الـوحدات</th> \
                <th class="text-center" width="10%">الـفصل</th> \
                <th class="text-center">اسم عضو هيئة التدريس</th> \
                <th class="text-center" width="20%">ملاحظات</th> \
              </tr> \
            </thead> \
            <tbody> ';
            var rowcounter=0;
            var count=0;
            for(i in obj){
              rowcounter++;
              count++;
              var sum = obj[i].no_pr_unit+obj[i].no_th_unit;
              HTML=HTML+' <tr> \
                  <td class="text-center number">'+count+'</td> \
                  <td class="text-center">'+obj[i].nameC+'</td>';
                  HTML=HTML+'<td class="text-center">'+sum+'</td>';
                  HTML=HTML+'<td class="text-center">'+level[obj[i].level-1]+'</td> \
                  <td class="text-center">'+obj[i].nameF+'</td> \
                  <td class="text-center"></td> \
                </tr> ';
            }
            var emptyRecord = 26-rowcounter;
            for(i=0;i<emptyRecord;i++){
              rowcounter++;
              count++;
              HTML=HTML+' <tr> \
                  <td class="text-center number">'+count+'</td> \
                  <td class="text-center"></td> \
                  <td class="text-center"></td> \
                  <td class="text-center"></td> \
                  <td class="text-center"></td> \
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

router.get('/subjectReport', userHelpers.isLogin, function (req, res, next) {
  models.sequelize.query('SELECT SU.name as nameC,f.name as nameF,SU.no_th_unit,SU.no_pr_unit,Ss.level from Faculty_members as f ,SemesterStudents as Ss ,Semesters as Se ,Subjects as SU ,Sub_groups as S WHERE S.SubjectId=SU.id and S.FacultyMemberId=f.id and Ss.SemesterId=S.SemesterId and S.DivisionId=? ', {
    replacements: [objReport.devId]
  }).then(function (result) {
    jsreport.render({
      template: {
        content: fs.readFileSync(path.join(__dirname, "../views/SubjectReport.html"), "utf8"),
        recipe: "phantom-pdf",
        helpers: SubjectReport.toString()
      },
      data: {
        obj:result[0],
        newObj:objReport
      }
      }).then(function (response) {
        response.result.pipe(res);
      }); 
  });
});

router.post('/subject', userHelpers.isLogin, function (req, res) {
  obj=req.body;
  models.Sub_group.findAll({
      include: [{
        model: models.Subject,
        where: {
          status: 1,
        }
      }],
        where: {
          status: 1,
          DivisionId: obj.idDivision,
          SemesterId: obj.idSemester
        }
    }).then(function (sub) {
        res.send(sub);
    });
});

router.get('/resultsOfSubject', userHelpers.isLogin, function (req, res) {
  models.Department.findAll({
    where: {
      status: 1
    }
  }).then(function (department) {
    models.Semester.findAll({
      where: {
        status: 1
      }
    })
    .then(function (semester) {
      res.render('resultsOfSubject', { title: 'كشف المحاضرين',dep: department,sem: semester, collapseEight: 'collapse in', activeEightfive: 'active' });
    });
  });
}); 

function reportresultsOfStudent(obj,newObj) {
  var level = ['الاول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر', 'الحادي العاشر', 'الثاني عشر'];
  var  studentStatus = ['نظامي','غير نظامي','ايقاف قيد','منقطع'];
  HTML=' ';
  HTML=' \
  <body> \
    <div class="container"> \
      <div class="row"> \
        <div class="col-xs-12"> \
          <h5 class="text-center">  \
              الهيئة الوطنية للتعليم التقني والفني \
          </h5> \
          <h5 class="text-center">  \
              المعهد العالي للمهن الشاملة \
          </h5> \
          <h5 class="text-center">  \
              القره بوللــــي \
          </h5> \
          <h5 class="text-center">  \
            كشف بالمواد الدراسية لقسم '+newObj.department+' \
          </h5> \
          <h5> \
            الشعبة <span>/</span> '+newObj.dev+' \
          </h5> \
          <h5> \
            المادة <span>/</span> '+newObj.subname+' \
          </h5> \
          <h5> \
            المحاضر <span>/</span> '+obj[0].name+' \
          </h5> \
          <table class="table condensed"> \
            <thead> \
              <tr> \
                <th class="text-center" width="7%">ت</th> \
                <th class="text-center" width="20%">أســم الطالب<span>/</span>ة</th> \
                <th class="text-center" width="7%">الامتحان الاول</th> \
                <th class="text-center" width="7%">الامتحان التاني</th> \
                <th class="text-center" width="7%">الامتحان النهائي</th> \
                <th class="text-center" width="20%">ملاحظات</th> \
              </tr> \
            </thead> \
            <tbody> ';
            var rowcounter=0;
            var count=0;
            for(i in obj){
              var ss =obj[i].student_status;
              rowcounter++;
              count++;
              HTML=HTML+' <tr> \
                  <td class="text-center number">'+count+'</td> \
                  <td class="text-center">'+obj[i].first_name+' '+obj[i].father_name+' '+obj[i].grand_name+' '+obj[i].last_name+'</td>';
                  HTML=HTML+'<td class="text-center"></td>';
                  HTML=HTML+'<td class="text-center"></td> \
                  <td class="text-center">'+obj[i].final_exam+'</td> \
                  <td class="text-center">'+studentStatus[obj[i].student_status-1]+'</td> \
                </tr> ';
            }
            var emptyRecord = 23-rowcounter;
            for(i=0;i<emptyRecord;i++){
              rowcounter++;
              count++;
              HTML=HTML+' <tr> \
                  <td class="text-center number">'+count+'</td> \
                  <td class="text-center"></td> \
                  <td class="text-center"></td> \
                  <td class="text-center"></td> \
                  <td class="text-center"></td> \
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

router.get('/reportresultsOfStudent', userHelpers.isLogin, function (req, res, next) {
  models.sequelize.query('SELECT Sg.SubjectId,Sg.SemesterId,Sg.DivisionId,Sg.FacultyMemberId,F.id,SS.DivisionId,SS.DepartmentId,SS.SemesterId,SS.level,SS.StudentId,S.id,Act.SemesterStudentId,SS.id,Act.SubGroupId,Sg.id,S.first_name,SS.student_status,S.father_name,S.grand_name,S.last_name,F.name,Act.final_exam FROM Sub_groups AS Sg,Students AS S,SemesterStudents AS SS,Semesters AS Sem,Academic_transcripts AS Act,Faculty_members AS F WHERE Sg.SubjectId=? AND Sg.SemesterId=? AND Sg.DivisionId=? AND Sg.FacultyMemberId =F.id AND SS.DivisionId= Sg.DivisionId AND SS.DepartmentId=? and SS.SemesterId=Sg.SemesterId and SS.level=? AND SS.StudentId=S.id AND Act.SemesterStudentId=SS.id and Act.SubGroupId=Sg.id ', {
    replacements: [objReport.subid,objReport.semid,objReport.devId,objReport.depid,objReport.levelid]
  }).then(function (result) {
    jsreport.render({
      template: {
        content: fs.readFileSync(path.join(__dirname, "../views/reportresultsOfStudent.html"), "utf8"),
        recipe: "phantom-pdf",
        helpers: reportresultsOfStudent.toString()
      },
      data: {
        obj:result[0],
        newObj:objReport
      }
      }).then(function (response) {
        response.result.pipe(res);
      }); 
  });
});

router.get('/report1/:id', function(req, res) {
  //select * from Semesters where id =(select SemesterId from SemesterStudents where id=5)
  models.Academic_transcript.findAll({
    where: {
      SemesterStudentId: req.params.id,
      status: 1
    },
    include: [{
      model: models.Sub_group,
      required: false,
      where: {
        status: 1
      },
      include: [{
        model: models.Subject,
        required: false,
        where: {
          status: 1
        }
      }]
    }]
  })
  .then(function (result) {
    models.sequelize.query('select * from Students where id =(SELECT StudentId FROM SemesterStudents WHERE id = ?)', {
      replacements: [req.params.id]
    }).then(function (studentReport) {
      models.sequelize.query('select * from Semesters where id =(select SemesterId from SemesterStudents where id=?)', {
      replacements: [req.params.id]
    }).then(function (sem) {
    /*models.sequelize.query('select * from Subjects where id in (select SubjectId from Sub_groups where SemesterId=(select SemesterId from SemesterStudents where id=?))', {
      replacements: [req.params.id]
    }).then(function (course) {*/
    var year = sem[0][0].year.getFullYear();
    var sem;
    var semtype=sem[0][0].sem_type;
    if(semtype==1){
      sem="ربيع";
    } else if(semtype==2){
      sem="خريف";
    } else if(semtype==3){
      sem="صيف";
    } 
    var name = studentReport[0][0].first_name;
    var father = studentReport[0][0].father_name;
    var grand = studentReport[0][0].grand_name;
    var last_name= studentReport[0][0].last_name;
    var full_name= name+" "+father+" "+last_name;
    var set_number=studentReport[0][0].set_number;
    var notice=[];
    for(i in result){
    notice.push(result[i].dataValues.notices);
  }
    jsreport.render({
      template: { 
        recipe: "phantom-pdf",
        content: fs.readFileSync(path.join(__dirname, "../views/report1.html"), "utf8"),
        helpers: showReport.toString()
      },
       data: {
          full_name:full_name,
          set_number: set_number,
          sem : sem,
          year:year,
          res:result,
          notice:notice,
        }
    }).then(function (response) {
      response.result.pipe(res);
    });  }); });
  });
});

router.get('/report2/:id', function(req, res) {
   //select * from Semesters where id =(select SemesterId from SemesterStudents where id=5)
  models.Academic_transcript.findAll({
    where: {
      SemesterStudentId: req.params.id,
      status: 1
    },
    include: [{
      model: models.Sub_group,
      required: false,
      where: {
        status: 1
      },
      include: [{
        model: models.Subject,
        required: false,
        where: {
          status: 1
        }
      }]
    }]
  })
  .then(function (result) {
    models.sequelize.query('select * from Students where id =(SELECT StudentId FROM SemesterStudents WHERE id = ?)', {
      replacements: [req.params.id]
    }).then(function (studentReport) {
      models.sequelize.query('select * from Semesters where id =(select SemesterId from SemesterStudents where id=?)', {
      replacements: [req.params.id]
    }).then(function (sem) {
    /*models.sequelize.query('select * from Subjects where id in (select SubjectId from Sub_groups where SemesterId=(select SemesterId from SemesterStudents where id=?))', {
      replacements: [req.params.id]
    }).then(function (course) {*/
    var year = sem[0][0].year.getFullYear();
    var sem;
    var semtype=sem[0][0].sem_type;
    if(semtype==1){
      sem="ربيع";
    } else if(semtype==2){
      sem="خريف";
    } else if(semtype==3){
      sem="صيف";
    } 
    var name = studentReport[0][0].first_name;
    var father = studentReport[0][0].father_name;
    var grand = studentReport[0][0].grand_name;
    var last_name= studentReport[0][0].last_name;
    var full_name= name+" "+father+" "+last_name;
    var set_number=studentReport[0][0].set_number;
    var notice=[];
    for(i in result){
    notice.push(result[i].dataValues.notices);
  }
    jsreport.render({
      template: { 
        recipe: "phantom-pdf",
        content: fs.readFileSync(path.join(__dirname, "../views/report2.html"), "utf8"),
        helpers: showReportt2.toString()
      },
       data: {
          full_name:full_name,
          set_number: set_number,
          sem : sem,
          year:year,
          res:result,
          notice:notice,
        }
    }).then(function (response) {
      response.result.pipe(res);
    });  }); });
  });
 
});
  router.get('/sticalNumberOfStudents', userHelpers.isLogin ,function (req, res, next) {
    models.Semester.findAll({
      where:{
        status:1
      },
      order: '`id` DESC'
    }).then(function(result){
      res.render('statisticalNumberOfStudents', {
      title: 'طباعة تقارير',
      name: req.session.name,
      sem: result,
      collapseEight: 'collapse in',
      activeEightThree: 'active'
      });
    });    
  });
  // this statisticalNumberOfStudents // widght A3
  router.get('/statisticalNumberOfStudents/:id', userHelpers.isLogin,  function (req, res, next) {
    model_step(req.params.id,req, res);
   
  });

  // this statisticalNumberOfStudentsNot // widght A4
  router.get('/statisticalNumberOfStudentsNot', userHelpers.isLogin, function (req, res, next) {
    var date1 = objReport2.semester+"-01-01";
    var date=date1.replace(" ","");
        models.sequelize.query('select * from Students where id in (select StudentId from SemesterStudents where SemesterId=(select id from Semesters where sem_type=? and year=? and status=1) and status=1) and status=1', {
      replacements: [objReport2.type,date]
    }).then(function (studentReport) {
      Bdate=[];
      gender=[];
      for(i in studentReport[0]){
        Bdate.push(studentReport[0][i].birth_date.getFullYear()+"/"+(studentReport[0][i].birth_date.getDate()+1)+"/"+studentReport[0][i].birth_date.getDay());
        if(studentReport[0][i].gender==0){
          gender.push('ذكر');
        } else if(studentReport[0][i].gender==1){
          gender.push('انثي');
        }
        
      }
    jsreport.render({
      template: { 
        recipe: "phantom-pdf",
        content: fs.readFileSync(path.join(__dirname, "../views/statisticalNumberOfStudentsNot.html"), "utf8"),
        helpers: showReportt3.toString(),
        phantom:{
          format: 'A3',
          orientation: "landscape"
        },
      },
        data: {
          objj:studentReport[0],
          Bdate:Bdate,  
          gender:gender,
        }
    })

    .then(function (response) {
      response.result.pipe(res);
    });

  });
  });


  router.get('/report3/:id', function(req, res) {
    //select name from Departments where id =(select DepartmentId from SemesterStudents where id=5)
     models.Academic_transcript.findAll({
    where: {
      SemesterStudentId: req.params.id,
      status: 1
    },
    include: [{
      model: models.Sub_group,
      required: false,
      where: {
        status: 1
      },
      include: [{
        model: models.Subject,
        required: false,
        where: {
          status: 1
        }
      }]
    }]
  })
  .then(function (result) {
     models.sequelize.query('select name from Departments where id =(select DepartmentId from SemesterStudents where id=? and status=1) and status=1', {
      replacements: [req.params.id]
    }).then(function (department) {
    models.sequelize.query('select * from Students where id =(SELECT StudentId FROM SemesterStudents WHERE id = ? and status=1) and status=1', {
      replacements: [req.params.id]
    }).then(function (studentReport) {
      models.sequelize.query('select * from Semesters where id =(select SemesterId from SemesterStudents where id=? and status=1) and status=1', {
      replacements: [req.params.id]
    }).then(function (sem) {
       

    var year = sem[0][0].year.getFullYear();
    var sem;
    var semtype=sem[0][0].sem_type;
    if(semtype==1){
      sem="ربيع";
    } else if(semtype==2){
      sem="خريف";
    } else if(semtype==3){
      sem="صيف";
    } 
    var name = studentReport[0][0].first_name;
    var father = studentReport[0][0].father_name;
    var grand = studentReport[0][0].grand_name;
    var last_name= studentReport[0][0].last_name;
    var full_name= name+" "+father+" "+last_name;
    var set_number=studentReport[0][0].set_number;
    var notice=[];
    for(i in result){
    notice.push(result[i].dataValues.notices);
  }
    jsreport.render({
      template: { 
        recipe: "phantom-pdf",
        content: fs.readFileSync(path.join(__dirname, "../views/report3.html"), "utf8"),
       // helpers: showReportt2.toString()
      },
       data: {
          full_name:full_name,
          set_number: set_number,
          sem : sem,
          year:year,
          dept:department[0][0].name,
         /* res:result,
          notice:notice,*/
        }
    }).then(function (response) {
      response.result.pipe(res);
    });  }); }); });
  });
 
  });

  // this stopStudentID // widght A4
  router.get('/stopStudentID', userHelpers.isLogin, function (req, res, next) {
    jsreport.render({
      template: {
        content:  fs.readFileSync(path.join(__dirname, "../views/stopStudentID.html"), "utf8"),
        recipe: "phantom-pdf"
      },
      // data:{allResults : results , national:nationality}
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  
  // this studentDefinition // widght A4
  router.get('/studentDefinition', userHelpers.isLogin, function (req, res, next) {
    jsreport.render({
      template: {
        content:  fs.readFileSync(path.join(__dirname, "../views/studentDefinition.html"), "utf8"),
        recipe: "phantom-pdf"
      },
      // data:{allResults : results , national:nationality}
    }).then(function (response) {
      response.result.pipe(res);
    });
  });


function model_step(id,req, res){
  Step(
    /* SELECT OLD VALUE FROM DB */
    function SelectStu() {
      selectStu(id,this);
    },
    /* UPDATE VALUE */
    function Updatephone(err,result) {
      rat(result,this);
      
    },
    function rend(err,result) {
      jsreport.render({
        template: {
          content:  fs.readFileSync(path.join(__dirname, "../views/statisticalNumberOfStudents.html"), "utf8"),
          
          phantom:{
            format: 'A3',
            orientation: "landscape",
          },
          recipe: "phantom-pdf"
        },
        data:{data : result }
      }).then(function (response) {
        response.result.pipe(res);
      });
    }
  );
}
function selectStu(id,cb){
  models.sequelize.query('SELECT *,`d`.`name` as dname ,`stu`.`createdAt` as stuAt  FROM `SemesterStudents` ss,`Semesters` sem ,`Departments` d,`Students` stu WHERE `ss`.`DepartmentId`=`d`.`id` AND`stu`.`id`=`ss`.`StudentId` AND `ss`.`level`=6 AND `ss`.`SemesterId`=`sem`.`id` AND `sem`.`id`=? AND ((SELECT count(*) FROM `Academic_transcripts` ac,`SemesterStudents` ssa WHERE `ac`.`StudentId`=`stu`.`id` AND `ac`.`SemesterStudentId`=`ssa`.`id` AND `ssa`.`SemesterId`=? )=(SELECT count(*) FROM `Academic_transcripts` ac,`SemesterStudents` ssa WHERE `ac`.`StudentId`=`stu`.`id` AND `ac`.`SemesterStudentId`=`ssa`.`id` AND `ssa`.`SemesterId`=? AND `ac`.`sum_dagree`>=50))', {
    replacements: [id,id,id]
  })
  .then(function (stu) {
    cb(null,stu[0]);
  });
}
function rat(result,cb){
  for(i in result){
    models.sequelize.query('select subjj.id as idsubject,subjj.name, SemS.StudentId,Sem.starting_date,acad.SemesterStudentId,acad.sum_dagree,SemS.SemesterId,subjj.no_th_unit from `SemesterStudents` as SemS ,`Semesters` as Sem ,`Academic_transcripts` as acad , `Sub_groups` as sub ,`Subjects` as subjj where acad.status=1 and SemS.StudentId=? and Sem.id = SemS.SemesterId and acad.SemesterStudentId = SemS.id and sub.id=acad.SubGroupId and subjj.id=sub.SubjectId order by Sem.starting_date', {
      replacements: [result[i].id]
    })
    .then(function (mix) {
      var array = getRatioForALlSemester(mix);
      var rat = array[array.length - 1];
      result[i]['rat']=[];
      result[i]['rat'].push(rat);
      result[i]['date']='';
      result[i].date=result[i].birth_date.getFullYear()+'/'+result[i].birth_date.getMonth()+1+'/'+result[i].birth_date.getDate();
      result[i]['stuAtd']='';
      result[i].stuAtd=result[i].stuAt.getFullYear()+'/'+result[i].stuAt.getMonth()+1+'/'+result[i].stuAt.getDate();
      if (rat >= 85) {
        statusrat = "ممتاز";
      } else if (rat >= 75 && rat < 85) {
        statusrat = "جيدجدا";
      } else if (rat >= 65 && rat < 75) {
        statusrat = "جيد";
      } else if (rat >= 50 && rat < 65) {
        statusrat = "مقبول";
      } else if (rat >= 35 && rat < 50) {
        statusrat = "ضعيـف";
      } else if (rat >= 0 && rat < 35) {
        statusrat = "ضعيف جدا";
      }
      result[i]['statusrat']=statusrat;
      result[i]['nat']=nationality[result[i]['nationality']-1].name;
      var year = result[i].year.getFullYear();
      var sem;
      var semtype=result[i].sem_type;
      if(semtype==1){
        sem="ربيع "+year;
      } else if(semtype==2){
        sem="خريف "+year;
      } else if(semtype==3){
        sem="صيف "+year;
      } 
      result[i]['semyear']=sem;
      if(i==result.length-1){
        cb(null,result);  
      }
    });

  }

  
}

module.exports = router;