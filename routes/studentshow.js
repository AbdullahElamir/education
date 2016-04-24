var express = require('express');
var router = express.Router();
var models  = require('../models');
var login = require('../app/login')(router);
var userHelpers = require('../app/userHelpers');
var nationality = require('../Nationality');

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
      res.render('studentshow', {
        title: 'studentshow',
        nats: nationality,
        student: student.rows,
        pagination: pagination,
        collapseEight: 'collapse in',
        activeEightsix: 'active',
        name: req.session.name,
        q: q
      });
    });
});



router.get('/studentSem/:id', userHelpers.isLogin, function (req, res) {
    models.Student.findOne({
        attributes: ['first_name', 'last_name'],
        where: {
          status: 1,
          id: req.params.id
        }
      })
      .then(function (student) {
        models.Department.findAll({
            where: {
              status: 1
            }
          })
          .then(function (department) {
            models.Division.findAll({
                where: {
                  status: 1
                }
              })
              .then(function (Division) {
                models.Semester.findAll({
                    where: {
                      status: 1
                    },
                    order: '`starting_date` DESC',
                    limit: 5
                  })
                  .then(function (semester) {
                    models.SemesterStudent.findAll({
                        where: {
                          status: 1,
                          StudentId: req.params.id
                        },
                        order: '`starting_date` DESC',
                        "include": [
                          {
                            "model": models.Division
                          },
                          {
                            "model": models.Department
                          },
                          {
                            "model": models.User
                          },
                          {
                            "model": models.Semester
                          }
              ],
                      })
                      .then(function (semstudent) {
                        var idstudent = req.params.id;
                        models.sequelize.query('SELECT  sb.id as idsubject,sb.name, ss.StudentId,s.starting_date,at.SemesterStudentId,at.sum_dagree,ss.SemesterId,sb.no_th_unit FROM Departments as dd,Divisions as dev, SemesterStudents AS ss LEFT JOIN Semesters AS s ON ( ss.semesterId = s.id ) left JOIN Students AS st ON ( ss.studentId = st.id ) left JOIN Academic_transcripts AS at ON ( ss.id = at.SemesterStudentId AND at.status=1) left JOIN Sub_groups AS sg ON ( at.SubGroupId = sg.id ) left JOIN Subjects AS sb ON ( sg.SubjectId = sb.id) WHERE st.`id`=? and ss.DepartmentId=dd.id and ss.DivisionId=dev.id   order by s.`starting_date`', {
                            replacements: [idstudent]
                          })
                          .then(function (mix) {
          
                            // this is for semester Ratio
                            var array = getRatioForSemester(mix);
                            console.log(array);
                            // this is for all semester ratio
                            var arrayy = getRatioForALlSemester(mix);
                            if (arrayy != undefined) {
                              arrayy = arrayy.reverse();
                            }
                            if (array != undefined) {
                              array = array.reverse();
                            }
                            var semesterTy = ['الاول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر', 'الحادي العاشر', 'الثاني عشر'];
                            res.render('studentSem', {
                              sId:req.params.id,
                              ar: arrayy,
                              arr: array,
                              title: 'Student Data',
                              student: student,
                              name: req.session.name,
                              std: req.params.id,
                              sem: semester,
                              dept: department,
                              dev: Division,
                              collapseEight: 'collapse in',
                              activeEightsix: 'active',
                              semStudent: semstudent,
                              semty: semesterTy
                            });
                          });
                      });
                  });
              });
          });
      });
  });







module.exports = router;