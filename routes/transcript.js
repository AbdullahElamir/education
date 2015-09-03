var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var Sequelize = require('sequelize')
var jsr = require("jsreport");
var fs = require("fs");
var path = require("path");
var Math = require("math");
var nationality = require('../Nationality');
var ratioo = require('../app/ratio');

  var obj = {
    subjects :[{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'}],
    classes :[{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:2,class_name:'الثاني',subjects:[{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'}]},{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:3,class_name:'الاول',subjects:[{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'},{subject_ar:'رياضيات',subject_en:'math',subject_id:'5cs4',degree:'60.6'}]},{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:3,class_name:'الثالث'},{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:4,class_name:'الرابع'},{ student:[{name:'محمد',id:'123450',name_en:'mohammed'}],class_id:5,class_name:'الخامس'}],
  }


  router.get('/transcript', userHelpers.isLogin,function(req, res, next) {
function draw(obj){
  var str='';
  for(key in obj){
    str+="<p>"+key+"</p>";
  }
  return str;
}
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/transcript.html"), "utf8"),
        recipe: "phantom-pdf",
        helpers: draw.toString()
      },
      data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  router.get('/newTranscript', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/newTranscript.html"), "utf8"),
        recipe: "phantom-pdf"
      },
      data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  router.get('/',function(req, res){
    models.sequelize.query('SELECT * FROM `Divisions` d,`Subjects` s WHERE `s`.`system_type` = 1 AND `d`.`id` = ? AND `s`.`status`=1 AND `d`.`DepartmentId`= `s`.`DepartmentId` AND `s`.`id` NOT IN (SELECT `SubjectId` FROM `DivisionSubjects` WHERE `DivisionId` = ? );', { replacements: [req.params.id,req.params.id] }
      ).then(function(subjectsS){
      console.log(subjectsS);
      res.render();
    });
  });


router.get('/academicTranscripts',userHelpers.isLogin, function(req, res) {
  var page = userHelpers.getPage(req);
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
      res.render('academicTranscripts', { title: 'Academic Transcripts', name:req.session.name,nats:nationality, student:student.rows,pagination:pagination,collapseSeven: 'collapse in', activeSevenOne: 'active' });
    });
});


router.get('/studentSemesters',userHelpers.isLogin, function(req, res) {
  res.render('studentSemesters', { title: 'Academic Transcripts', name:req.session.name });
});



router.get('/studentData/:id',userHelpers.isLogin, function(req, res) {
   models.Department.findAll({
      where: {
        status: 1
      }
    }).then(function(department) {
      models.Division.findAll({
        where: {
        status: 1
      }
      }).then(function(Division) { 
          models.Semester.findAll({
          where: {
          status: 1
          }
         }).then(function(semester) {
         models.SemesterStudent.findAll({
          where: {
          status: 1,
          StudentId: req.params.id
          },
      "include" : [
        {"model" : models.Division},
        {"model"  : models.Department},
        {"model"  : models.User},
        {"model"  : models.Semester,
      },
      ],
         }).then(function(semstudent) {
          console.log(semstudent);
          var idstudent =req.params.id;
            models.sequelize.query('select SemS.StudentId,Sem.starting_date,acad.SemesterStudentId,acad.sum_dagree,SemS.SemesterId,subjj.no_th_unit from `SemesterStudents` as SemS ,`Semesters` as Sem ,`Academic_transcripts` as acad , `Sub_groups` as sub ,`Subjects` as subjj where acad.status=1 and SemS.StudentId=? and Sem.id = SemS.SemesterId and acad.SemesterStudentId = SemS.id and sub.id=acad.SubGroupId and subjj.id=sub.SubjectId order by Sem.starting_date',{ replacements: [idstudent]}
            ).then(function(mix){
         // console.log(ratioo.getRatio());
         var arrayy=[];
              if(mix[0][0]!= undefined)
              {
              var t=mix[0][0].SemesterId;
              var tt=mix[0][0].SemesterId;
              var summ=0.0;
              var sumUnitt=0.0;
              var semesterCount=0;
            // make the nested for 
              for(var i=0;i<mix[0].length;i++)
              { 
                if(mix[0][i].SemesterId==tt)
                {
                  summ=round(summ+(mix[0][i].sum_dagree*mix[0][i].no_th_unit),3);
                  sumUnitt=round(sumUnitt+mix[0][i].no_th_unit,3);
                  
                } else {
                   arrayy.push(summ/sumUnitt);
                  summ=0.0;
                  sumUnitt=0.0;
                  tt=mix[0][i].SemesterId;
                  --i;
                }      
              }
                arrayy.push(round((summ/sumUnitt),3));
              }

              console.log("this "+arrayy);
              var ratio=[];
              var sum=0;
              var l=0;
              for(var i=0;i<arrayy.length;i++)
              {
               sum=sum+arrayy[i];
               console.log(sum);
               l=sum/(i+1);
               ratio.push(round(l,3));
              }
              console.log("rat"+ratio);


 //****************************************************************************

              var array=[];
              if(mix[0][0]!= undefined)
              {
              var t=mix[0][0].SemesterId;
              var tt=mix[0][0].SemesterId;
              var sum=0.0;
              var sumUnit=0.0;
              var semesterCount=0;
              for(var i=0;i<mix[0].length;i++)
              {
                if(mix[0][i].SemesterId==t)
                {
                  sum=round(sum+(mix[0][i].sum_dagree*mix[0][i].no_th_unit),3);
                  sumUnit=round(sumUnit+mix[0][i].no_th_unit,3);
                } else {
                   array.push(sum/sumUnit);
                  sum=0.0;
                  sumUnit=0.0;
                  t=mix[0][i].SemesterId
                  --i;
                }      
              }
                array.push(round((sum/sumUnit),3));
              }
              var semesterTy=['الاول','الثاني','الثالث','الرابع','الخامس','السادس','السابع','الثامن','التاسع','العاشر','الحادي العاشر','الثاني عشر'];
              res.render('studentData', {ar:ratio,arr:array,arrr:arrayy, title: 'Student Data' , name:req.session.name,std:req.params.id,sem:semester,dept:department,dev:Division,semStudent: semstudent,semty:semesterTy});
            });
          });
        });
      });
    });
 });

 function round(value, ndec){
    var n = 10;
    for(var i = 1; i < ndec; i++){
        n *=10;
    }

    if(!ndec || ndec <= 0)
        return Math.round(value);
    else
        return Math.round(value * n) / n;
}

  
router.post('/addSemesterStudent',userHelpers.isLogin,function(req,res){
 objStudent=req.body;
 objStudent.UserId=req.session.idu;
  models.SemesterStudent.create(req.body).then(function(result) {
        res.send(true);
      });
  });

router.get('/addStudentSubject/:id',userHelpers.isLogin, function(req, res) {
  models.SemesterStudent.findOne({
    where:{
      id:req.params.id,
      status:1
    },
      include:[{
        model: models.Semester,
          required:false,
          where:{
            status:1
          }
      }]
  }).then(function(sem){
    models.Sub_group.findAll({
      where:{
        SemesterId:sem.SemesterId,
        DivisionId:1,
        status:1
      },
      include:[{
        model: models.Subject,
          required:false,
          where:{
            status:1
          }
      }]

    }).then(function(gen){
      models.Sub_group.findAll({
        where:{
          SemesterId:sem.SemesterId,
          DivisionId:sem.DivisionId,
          status:1
        },
        include:[{
          model: models.Subject,
            required:false,
            where:{
              status:1
            }
        }]
      }).then(function(div){
        models.sequelize.query('SELECT * FROM `Sub_groups` sg ,`Subjects` s WHERE `sg`.`SubjectId`=`s`.id AND `s`.`status`=1 AND `sg`.`DivisionId` IN(SELECT id FROM `Divisions` WHERE `status`=1 AND `DepartmentId`= ? ); ', { replacements: [sem.DepartmentId] }
        ).then(function(dept){
          models.Academic_transcript.findAll({
            where:{
              SemesterStudentId:req.params.id,
              status:1
            },
            include:[{
              model: models.Sub_group,
                required:false,
                where:{
                  status:1
                },
              include:[{
                model: models.Subject,
                required:false,
                where:{
                  status:1
                }       
              }]
            }]
          }).then(function(result){
            res.render('addStudentSubject', { sys:sem.Semester.system_type,title: 'Add Student Subject', name:req.session.name,res:result ,sem:sem,dept:dept[0],gen:gen,div:div});
          });
        });
      });
    });
  }); 
});

router.post('/addStudentSubject',userHelpers.isLogin,function(req,res){
  req.body.UserId=req.session.idu;
  req.body.sum_dagree= parseFloat(req.body.chapter_degree)+parseFloat(req.body.final_exam);
  models.Academic_transcript.findOrCreate({where: {StudentId:req.body.StudentId,status:1,SubGroupId: req.body.SubGroupId}, defaults: req.body})
  .spread(function(result, created) {
    if(created){
      models.Academic_transcript.findOne({
        where:{
          id:result.id
        },
        include:[{
          model: models.Sub_group,
            required:false,
            where:{
              status:1
            },
          include:[{
            model: models.Subject,
            required:false,
            where:{
              status:1
            }       
          }]
        }]
      }).then(function(acTr){
        res.send(acTr);
      });
    }else{
      res.send(false);
    }

  });
});

router.post('/updateG',userHelpers.isLogin,function(req,res){
  req.body.body.sum_dagree= parseFloat(req.body.body.chapter_degree)+parseFloat(req.body.body.final_exam);
  models.Academic_transcript.update(req.body.body,{
    where: {
      id:req.body.id
    }
    }).then(function(result){
      models.Academic_transcript.findOne({
        where:{
          id:req.body.id
        },
        include:[{
          model: models.Sub_group,
            required:false,
            where:{
              status:1
            },
          include:[{
            model: models.Subject,
            required:false,
            where:{
              status:1
            }       
          }]
        }]
      }).then(function(acTr){
        res.send(acTr);
      });
    });
});

router.get('/deletetranscript/:id',userHelpers.isLogin,function(req,res){
  models.Academic_transcript.update({
    status:0
  },{
    where: {
      id:req.params.id
    }
    }).then(function(result){
      res.send(true);
    });
});

router.get('/division/:id',userHelpers.isLogin,function(req,res){
  models.Division.findAll({
    where:{
      status:1,
      DepartmentId:req.params.id
    }
  }).then(function(div){
    res.send(div);
  });
});


module.exports = router;