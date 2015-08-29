var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var Sequelize = require('sequelize')
var jsr = require("jsreport");
var fs = require("fs");
var path = require("path");
var nationality = require('../Nationality');

// Start transcript /////////////////////////////////////////////////////////
   router.get('/transcript/:id', function(req, res, next) {
      models.sequelize.query('SELECT * FROM SemesterStudents AS ss INNER JOIN Semesters AS s ON ( ss.semesterId = s.id ) INNER JOIN Students AS st ON ( ss.studentId = st.id ) INNER JOIN Academic_transcripts AS at ON ( ss.id = at.SemesterStudentId ) INNER JOIN Sub_groups AS sg ON ( at.SubGroupId = sg.id ) INNER JOIN Subjects AS sb ON ( sg.SubjectId = sb.id ) where st.id ='+req.params.id+' ORDER BY s.starting_date LIMIT 0 , 30').then(function(subjectsS){   
        var obb = {obbs:subjectsS[0]}
        models.Subject.findAll({
          where: { 
          status: 1 
          
        }
       
      }).then(function(sem) {
        console.log(sem);

      });
      jsr.render({
        template: { 
          content:  fs.readFileSync(path.join(__dirname, "../views/transcript.html"), "utf8"),
          recipe: "phantom-pdf"
        },
        data:obb
      }).then(function (response) {
        response.result.pipe(res);
        });
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
      res.render('academicTranscripts', { title: 'Academic Transcripts',nats:nationality, student:student.rows,pagination:pagination,collapseSeven: 'collapse in', activeSevenOne: 'active' });
    });
});


router.get('/studentSemesters',userHelpers.isLogin, function(req, res) {
  res.render('studentSemesters', { title: 'Academic Transcripts' });
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
          var idstudent =req.params.id;
            models.sequelize.query('select SemS.StudentId,Sem.starting_date,acad.SemesterStudentId,acad.sum_dagree,SemS.SemesterId,subjj.no_th_unit from `SemesterStudents` as SemS ,`Semesters` as Sem ,`Academic_transcripts` as acad , `Sub_groups` as sub ,`Subjects` as subjj where SemS.StudentId=? and Sem.id = SemS.SemesterId and acad.SemesterStudentId = SemS.id and sub.id=acad.SubGroupId and subjj.id=sub.SubjectId order by Sem.starting_date',{ replacements: [idstudent]}
            ).then(function(mix){

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
                  if(mix[0][i].sum_dagree>=50){
                  summ=summ+(mix[0][i].sum_dagree*mix[0][i].no_th_unit);
                  sumUnitt=sumUnitt+mix[0][i].no_th_unit;
                }
                } else {
                   arrayy.push(summ/sumUnitt);
                  summ=0.0;
                  sumUnitt=0.0;
                  tt=mix[0][i].SemesterId;
                  --i;
                }      
              }
                arrayy.push(summ/sumUnitt);
              }

              console.log(arrayy);
              var ratio=[];
              var sum=0;
              var l=0;
              for(var i=0;i<arrayy.length;i++)
              {
               sum=sum+arrayy[i];
               console.log(sum);
               l=sum/(i+1);
               ratio.push(l);
              }
            //  console.log(ratio);


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
                  sum=sum+(mix[0][i].sum_dagree*mix[0][i].no_th_unit);
                  sumUnit=sumUnit+mix[0][i].no_th_unit;
                } else {
                   array.push(sum/sumUnit);
                  sum=0.0;
                  sumUnit=0.0;
                  t=mix[0][i].SemesterId
                  --i;
                }      
              }
                array.push(sum/sumUnit);
              }
             // console.log(array);
              res.render('studentData', {ar:ratio,arr:array, title: 'Student Data' ,std:req.params.id,sem:semester,dept:department,dev:Division,semStudent: semstudent});
            });
          });
        });
      });
    });
 });
  
router.post('/addSemesterStudent',function(req,res){
 objStudent=req.body;
 objStudent.UserId=1;
  models.SemesterStudent.create(req.body).then(function(result) {
        res.send(true);
      });
  });

router.get('/addStudentSubject/:id',userHelpers.isLogin, function(req, res) {
  models.SemesterStudent.findOne({
    where:{
      id:req.params.id,
      status:1
    }
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
            res.render('addStudentSubject', { title: 'Add Student Subject',res:result ,sem:sem,dept:dept[0],gen:gen,div:div});
          });
        });
      });
    });
  }); 
});

router.post('/addStudentSubject',userHelpers.isLogin,function(req,res){
  req.body.UserId=1;
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

module.exports = router;