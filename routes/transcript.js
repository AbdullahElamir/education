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

  router.get('/',userHelpers.isLogin, function(req, res) {
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
      res.render('printTranscript', { title: 'عرض الطلبة', name:req.session.name,nats:nationality, student:student.rows,pagination:pagination,collapseEight: 'collapse in', activeEightOne: 'active' });
    });
  });

  returnFullName=function(fullName){
    var name=fullName[0][1].first_name;
    var fatherName=fullName[0][1].father_name;
    var grandName=fullName[0][1].grand_name;
    var lastName=fullName[0][1].last_name;
    return name+" "+fatherName+" "+grandName+" "+lastName;
  },

   returnFullNameEng=function(fullName){
    var name=fullName[0][1].first_name_en;
    var fatherName=fullName[0][1].father_name_en;
    var grandName=fullName[0][1].grand_name_en;
    var lastName=fullName[0][1].last_name_en;
    return name+" "+fatherName+" "+grandName+" "+lastName;
  }

  // return string system type
  systemTypeAndSemType=function(system){
    var sem=system[0][1].system_type;
    var semType=system[0][1].sem_type;
    // if seasone system return string season 
    if(sem==1){
      if(semType==1){
        return "ربيع";
      } else if(semType==2){
        return "خريف";
      } else if(semType==3){
        return "صيف";
      }
     // if year system return string year
    } else if(sem==2){
      return "سنة";
    }
  }


  function htmlTagsDrawEnglish(obj,ob,o){
    allunit=0;
    for(i in ob[0]){
      allunit+=ob[0][i].no_th_unit;
    }
    var unithaveDone=0;
    var days=["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th"];
    var numberOfSemester=0,counter=0,index=[];
    var t=obj[0][0].SemesterStudentId;
    var printTwoSemesterTableInOnePage=0;
    for(i=0;i<obj[0].length;i++){
      if(i!=0){
      if(t!=obj[0][i].SemesterStudentId || obj[0][i].SemesterStudentId==null ){
        index.push(i);
        t=obj[0][i].SemesterStudentId; 
        numberOfSemester++;
        counter++;
      }
     }
    }
    index.push(obj[0].length);
    var htmldraw=' ';
    var status;
    var someDegres;
    var zero=0;
    var k=0;
    var c=0; 
      for(var j=0;j<index.length;j++) {
        var sem=obj[0][k].system_type;
        var semType=obj[0][k].sem_type;
        var semTypeVaribal;
        var date=new Date(obj[0][k].year);
        k=index[j];
    // if seasone system return string season 
        if(sem==1){
          if(semType==1){
            semTypeVaribal="Spring";
          } else if(semType==2){
            semTypeVaribal="Fall";
          } else if(semType==3){
            semTypeVaribal="Summer";
          }
         // if year system return string year
        } else if(sem==2){
          semTypeVaribal="Year";
        }
        var sumFail=0;
        var Ratiostatus="nothing";
        htmldraw+='\
        <div style="height: 10px;"></div>\
           <div class="pull-left">\
              <span> Semester : '+days[j]+' '+semTypeVaribal+' '+date.getFullYear()+'  </span>\
        </div>\
        <div style="height: 12px;"></div>';
        htmldraw+=' <table class="table condensed">\
                      <thead>\
                        <tr>\
                          <th class="text-center" width="1%">No</th>\
                          <th class="text-center" width="10%">Course No</th>\
                          <th class="text-center" width="35%">Course Name</th>\
                          <th class="text-center" width="1%">Units</th>\
                          <th class="text-center" width="1%">Credits</th>\
                          <th class="text-center" width="1%">Grade</th>\
                          <th class="text-center" width="15%">Remarks</th>\
                        </tr>\
                      </thead>\
                    <tbody>';
        var sumRatio=0.0,sum=0.0;
        var counter=1;   
        for(var i=zero;i<index[j];i++){  
        
          if(obj[0][i].sum_dagree>=50){
            sumFail=sumFail+obj[0][i].no_th_unit;
            unithaveDone+=obj[0][i].no_th_unit;
          }
        //******************* student Average quarterly ***********
          sumRatio=sumRatio+parseFloat(obj[0][i].no_th_unit*obj[0][i].sum_dagree);
          sum=sum+parseFloat(obj[0][i].no_th_unit);
        //***************** this section for Assess student  ************
        someDegres=obj[0][i].sum_dagree;
          if(someDegres>=85 ){
            status="Excellent";
          } else if(someDegres>=75 && someDegres<85) {
            status="Very Good";
          } else if(someDegres>=65 && someDegres<75) {
            status="Good";
          } else if(someDegres>=50 && someDegres<65) {
              status="Pass";
          } else if(someDegres>=35 && someDegres<50) {
              status="Week";
          } else if(someDegres>=0 && someDegres<35) {
              status="Very Week";
          } 
        //***********************************************
          var not="";
        if(obj[0][i].notices ==2){
          not="Restoration";

        } else if(obj[0][i].notices ==3){
          not="Supplementary";
        }

        htmldraw+='<tr> \
              <td class="text-center">'+counter+'</td>\
              <td class="text-center" height="12%">'+obj[0][i].code+'</td> \
              <td class="text-center">'+obj[0][i].name_en+'</td> \
              <td class="text-center">'+obj[0][i].no_th_unit+'</td> \
              <td class="text-center">'+obj[0][i].sum_dagree+'</td> \
              <td class="text-center" width="10%">'+status+'</td> \
              <td class="text-center">'+not+'</td> \
            </tr>';
            counter++;
        }
      var tableStatic=0;
       tableStatic=(7-counter);
       for(var i=0;i<tableStatic;i++){
         htmldraw+='<tr> \
              <td class="text-center">'+counter+'</td>\
              <td class="text-center"></td> \
              <td class="text-center"></td> \
              <td class="text-center"></td> \
              <td class="text-center"></td> \
              <td class="text-center"></td> \
              <td class="text-center"></td> \
            </tr>';
          counter++;
       }
        var sumation=sumRatio/sum;
        if(sumation>=85 ){
          Ratiostatus="Excellent";
        } else if(sumation>=75 && sumation<85) {
          Ratiostatus="Very Good";
        } else if(sumation>=65 && sumation<75) {
          Ratiostatus="Good";
        } else if(sumation>=50 && sumation<65) {
            Ratiostatus="Pass";
        } else if(sumation>=35 && sumation<50) {
            Ratiostatus="Week";
        } else if(sumation>=0 && sumation<35) {
            Ratiostatus="Very Week";
        } 
        rat=0;
        if(obj[0][zero].SemesterStudentId==null){
            rat = 0;
        } else {
           rat=o[c];
           c++;
        }
        if(!sum){
           sum=0;
        } 
        if(!sumation){
          sumation=0;
        }
        htmldraw+='<td colspan="3" style="padding: 5px;">Semester Average &nbsp;&nbsp; '+sumation+'%</td>\
            <td align="center">'+sum+'</td>\
            <td style="border-bottom-color: #fff;"></td>\
            <td align="center">'+Ratiostatus+'</td>';
        htmldraw+='</tr>\
                    </tbody>\
                      </table>\
                  <div class="row">\
                    <div class="col-xs-10">\
                      <table class="table table-condensed">\
                        <thead>\
                          <tr>\
                            <th class="text-center" width="27%">Total Registered Credits</th>\
                            <th class="text-center">'+sum+'</th>\
                            <th class="text-center" width="27%">Total Passed Credits</th>\
                            <th class="text-center">'+sumFail+'</th>\
                          </tr>\
                          <tr>\
                            <th class="text-center">Total Points</th>\
                            <th class="text-center">'+Ratiostatus+'</th>\
                            <th class="text-center">General Cumulative Average</th>\
                            <th class="text-center">'+rat+'</th>\
                          </tr>\
                        </thead>\
                      </table>\
                    </div>\
                  </div>';
        zero=index[j];
        printTwoSemesterTableInOnePage++;
        if(printTwoSemesterTableInOnePage==2){
           htmldraw+='<div  style="page-break-before: always;">';
           printTwoSemesterTableInOnePage=0;
        }
      }
      var semm=obj[0][0].system_type;
      var semTypee=obj[0][0].sem_type;
      var date=new Date(obj[0][0].year);
      var semTypeVariball;
    // if seasone system return string season 
      if(semm==1){
        if(semTypee==1){
          semTypeVariball="Spring";
        } else if(semTypee==2){
          semTypeVariball="Fall";
        } else if(semTypee==3){
          semTypeVariball="Summer";
        }
       // if year system return string year
      } else if(semm==2){
        semTypeVariball="year";
      }
      var semmm=obj[0][obj[0].length-1].system_type;
      var semTypeee=obj[0][obj[0].length-1].sem_type;
      var datee=new Date(obj[0][obj[0].length-1].year);
      var semTypeVariballl;
    // if seasone system return string season 
      if(semmm==1){
        if(semTypeee==1){
          semTypeVariballl="Spring";
        } else if(semTypeee==2){
          semTypeVariballl="Fall";
        } else if(semTypeee==3){
          semTypeVariballl="Summer";
        }
       // if year system return string year
      } else if(semmm==2){
        semTypeVariballl="year";
      }
      var xy=o[o.length-1];
      var ostatus;
      if(xy>=85 ){
        ostatus="Excellent";
      } else if(xy>=75 && xy<85) {
        ostatus="Very Good";
      } else if(xy>=65 && xy<75) {
        ostatus="Good";
      } else if(xy>=50 && xy<65) {
          ostatus="Pass";
      } else if(xy>=35 && xy<50) {
          ostatus="Week";
      } else if(xy>=0 && xy<35) {
         ostatus="Very Week";
      } 
    htmldraw+='\
      <br>\
      <br>\
      <br>\
      <table class="table table-condensed">\
        <thead>\
          <tr>\
            <th class="text-center" width="27%">Date of Admission</th>\
            <th class="text-center">'+semTypeVariball+' '+date.getFullYear()+'</th>\
            <th class="text-center" width="24%">Total Registred Credits</th>\
            <th class="text-center">'+allunit+'</th>\
          </tr>\
          <tr>\
            <th class="text-center">Date of Graduation</th>\
            <th class="text-center">'+semTypeVariballl+' '+datee.getFullYear()+'</th>\
            <th class="text-center">Total Passed Credits</th>\
            <th class="text-center">'+unithaveDone+'</th>\
          </tr>\
          <tr>\
            <th class="text-center">Final Evaluation Total</th>\
            <th class="text-center">'+ostatus+'</th>\
            <th class="text-center">General Cumulative Average</th>\
            <th class="text-center">'+o[o.length-1]+'</th>\
          </tr>\
        </thead>\
      </table>\
      <div class="pull-left">\
        <span>Grading System :</span>\
      </div>\
      <div class="row">\
        <div class="col-xs-8">\
          <table class="table table-condensed">\
            <thead>\
              <tr>\
                <th class="text-center" width="1%">Excellent</th>\
                <th class="text-center" width="1%">Very Good</th>\
                <th class="text-center" width="1%">Good</th>\
                <th class="text-center" width="1%">Pass</th>\
              </tr>\
              <tr>\
                <th class="text-center">100 - 85 %</th>\
                <th class="text-center">85 - 75 %</th>\
                <th class="text-center">75 - 65 %</th>\
                <th class="text-center">65 - 50 %</th>\
              </tr>\
            </thead>\
          </table>\
        </div>\
      </div>\
      <div class="row">\
        <div class="col-xs-10 col-xs-offset-1">\
          <div class="pull-left">\
            <span>Institute Registrar</span>\
          </div>\
          <div class="pull-right">\
            <span>Dean of Institute</span>\
          </div>\
        </div>\
      </div>\
    </div>\
  </body> \
</html>';
  return htmldraw;
  }
 
  function htmlTagsDraw(obj,ob,o){ 
    allunit=0;
    for(i in ob[0]){
      allunit+=ob[0][i].no_th_unit;
    }
    var unithaveDone=0;
    var days=["الاول","الثاني","التالث","الرابع","الخامس","السادس","السابع","الثامن","التاسع","العاشر","الأحدي عشر","الثاني عشر","التالث عشر","الرابع عشر","الخامس عشر","السادس عشر","السابع عشر","الثامن عشر","التاسع عشر","عشروت"];
    var numberOfSemester=0,counter=0,index=[];
    var t=obj[0][0].SemesterStudentId;
    var printTwoSemesterTableInOnePage=0;
    for(i=0;i<obj[0].length;i++){
      if(i!=0){
      if(t!=obj[0][i].SemesterStudentId || obj[0][i].SemesterStudentId==null ){
        index.push(i);
        t=obj[0][i].SemesterStudentId; 
        numberOfSemester++;
        counter++;
      }
    }
    }
    index.push(obj[0].length);
    var htmldraw=' ';
    var status;
    var someDegres;
    var zero=0;
    var k=0;
    var c=0; 
      for(var j=0;j<index.length;j++) {
        var sem=obj[0][k].system_type;
        var semType=obj[0][k].sem_type;
        var semTypeVaribal;
        var date=new Date(obj[0][k].year);
        k=index[j];
    // if seasone system return string season 
        if(sem==1){
          if(semType==1){
            semTypeVaribal="ربيع";
          } else if(semType==2){
            semTypeVaribal="خريف";
          } else if(semType==3){
            semTypeVaribal="صيف";
          }
         // if year system return string year
        } else if(sem==2){
          semTypeVaribal="سنة";
        }
        var sumFail=0;
        var Ratiostatus="لا يوجد";
        htmldraw+='\<div style="height: 10px;></div>\
                    <div class="pull-right" >\
                      <span> الفصل الدراسي <span>: </span> '+days[j]+' '+semTypeVaribal+' '+date.getFullYear()+' </span>\
                      <div style="height: 10px;"  ></div>\
                   </div>\
                   <div style="height: 12px;"  ></div>';
        htmldraw+='<table class="table condensed"> \
                      <thead> \
                        <tr> \
                          <th class="text-center">ر<span>.</span>م</th> \
                          <th class="text-center">رمز المقرر</th> \
                          <th class="text-center">اسم المقرر</th> \
                          <th class="text-center">الوحدات</th> \
                          <th class="text-center">الدرجة</th> \
                          <th class="text-center">التقيم</th> \
                          <th class="text-center">ملاحظات</th> \
                        </tr> \
                    </thead> \
                  <tbody>'
        var sumRatio=0.0,sum=0.0;
        var counter=1;   
        for(var i=zero;i<index[j];i++){  
        
          if(obj[0][i].sum_dagree>=50){
            sumFail=sumFail+obj[0][i].no_th_unit;
            unithaveDone+=obj[0][i].no_th_unit;
          }
        //******************* student Average quarterly ***********
          sumRatio=sumRatio+parseFloat(obj[0][i].no_th_unit*obj[0][i].sum_dagree);
          sum=sum+parseFloat(obj[0][i].no_th_unit);
        //***************** this section for Assess student  ************
        someDegres=obj[0][i].sum_dagree;
          if(someDegres>=85 ){
            status="ممتاز";
          } else if(someDegres>=75 && someDegres<85) {
            status="جيدجدا";
          } else if(someDegres>=65 && someDegres<75) {
            status="جيد";
          } else if(someDegres>=50 && someDegres<65) {
              status="مقبول";
          } else if(someDegres>=35 && someDegres<50) {
              status="ضعيـف";
          } else if(someDegres>=0 && someDegres<35) {
              status="ضعيف جدا";
          } 
        //***********************************************
        var not="";
        if(obj[0][i].notices ==2){
          not="إعادة";

        } else if(obj[0][i].notices ==3){
          not="تكميلي";
        }
        htmldraw+='<tr> \
              <td class="text-center">'+counter+'</td>\
              <td class="text-center">'+obj[0][i].code+'</td> \
              <td class="text-center">'+obj[0][i].name+'</td> \
              <td class="text-center">'+obj[0][i].no_th_unit+'</td> \
              <td class="text-center">'+obj[0][i].sum_dagree+'</td> \
              <td class="text-center">'+status+'</td> \
              <td class="text-center">'+not+'</td> \
            </tr>';
            counter++;
        }
       var tableStatic=0;
       tableStatic=(8-counter);
       for(var i=0;i<tableStatic;i++){
         htmldraw+='<tr> \
              <td class="text-center">'+counter+'</td>\
              <td class="text-center"></td> \
              <td class="text-center"></td> \
              <td class="text-center"></td> \
              <td class="text-center"></td> \
              <td class="text-center"></td> \
              <td class="text-center"></td> \
            </tr>';
          counter++;
       }
    var sumation=sumRatio/sum;
        if(sumation>=85 ){
          Ratiostatus="ممتاز";
        } else if(sumation>=75 && sumation<85) {
          Ratiostatus="جيدجدا";
        } else if(sumation>=65 && sumation<75) {
          Ratiostatus="جيد";
        } else if(sumation>=50 && sumation<65) {
            Ratiostatus="مقبول";
        } else if(sumation>=35 && sumation<50) {
            Ratiostatus="ضعيـف";
        } else if(sumation>=0 && sumation<35) {
            Ratiostatus="ضعيف جدا";
        } 
        rat=0;
        if(obj[0][zero].SemesterStudentId==null){
            rat = 0;
        } else {
           rat=o[c];
           c++;
        }
        if(!sum){
           sum=0;
        } 
        if(!sumation){
          sumation=0;
        }
        htmldraw+='<td colspan="3" style="padding: 5px;">المعدل الفصلي   &nbsp;&nbsp; '+sumation+'%</td>\
              <td class="text-center">'+sum+'</td>\
              <td style="border-bottom-color: #fff;"></td>\
              <td class="text-center">'+Ratiostatus+'</td>';
        htmldraw+='</tr>\
          </tbody>\
        </table>\
        <div class="row">\
          <div class="col-xs-10">\
            <table class="table table-condensed">\
              <thead>\
                <tr>\
                  <th class="text-center" width="27%">الوحدات المنجزة الكلية</th>\
                  <th class="text-center">'+sumFail+'</th>\
                  <th class="text-center" width="27%">مجموع الوحدات العام</th>\
                  <th class="text-center">'+sum+'</th>\
                </tr>\
                <tr>\
                  <th class="text-center">مجموع التقييم العام</th>\
                  <th class="text-center">'+Ratiostatus+'</th>\
                  <th class="text-center">المعدل التراكمي العام</th>\
                  <th class="text-center">'+rat+'</th>\
                </tr>\
              </thead>\
            </table>\
          </div>\
        </div>';
        zero=index[j];
        printTwoSemesterTableInOnePage++;
        if(printTwoSemesterTableInOnePage==2){
           htmldraw+='<div  style="page-break-before: always;">';
           htmldraw+='<br><br><br><br><br>';
           printTwoSemesterTableInOnePage=0;
        }
      }
      var semm=obj[0][0].system_type;
      var semTypee=obj[0][0].sem_type;
      var date=new Date(obj[0][0].year);
      var semTypeVariball;
    // if seasone system return string season 
      if(semm==1){
        if(semTypee==1){
          semTypeVariball="ربيع";
        } else if(semTypee==2){
          semTypeVariball="خريف";
        } else if(semTypee==3){
          semTypeVariball="صيف";
        }
       // if year system return string year
      } else if(semm==2){
        semTypeVariball="سنة";
      }
      var semmm=obj[0][obj[0].length-1].system_type;
      var semTypeee=obj[0][obj[0].length-1].sem_type;
      var datee=new Date(obj[0][obj[0].length-1].year);
      var semTypeVariballl;
    // if seasone system return string season 
      if(semmm==1){
        if(semTypeee==1){
          semTypeVariballl="ربيع";
        } else if(semTypeee==2){
          semTypeVariballl="خريف";
        } else if(semTypeee==3){
          semTypeVariballl="صيف";
        }
       // if year system return string year
      } else if(semmm==2){
        semTypeVariballl="سنة";
      }
      var xy=o[o.length-1];
      var ostatus;
      if(xy>=85 ){
        ostatus="ممتاز";
      } else if(xy>=75 && xy<85) {
        ostatus="جيدجدا";
      } else if(xy>=65 && xy<75) {
        ostatus="جيد";
      } else if(xy>=50 && xy<65) {
          ostatus="مقبول";
      } else if(xy>=35 && xy<50) {
          ostatus="ضعيـف";
      } else if(xy>=0 && xy<35) {
         ostatus="ضعيف جدا";
      } 
    htmldraw+='\
      <br>\
      <br>\
      <table class="table table-condensed">\
        <thead>\
          <tr>\
            <th class="text-center" width="1%">القبول</th>\
            <th class="text-center" width="11%">'+semTypeVariball+' '+date.getFullYear()+'</th>\
            <th class="text-center" width="27%">مجموع الوحدات الكلية النهائية</th>\
            <th class="text-center"></th>\
            <th class="text-center" width="24%">مجموع التقييم العام النهائي</th>\
            <th class="text-center">'+ostatus+'</th>\
          </tr>\
          <tr>\
            <th class="text-center">التخرج</th>\
            <th class="text-center">'+semTypeVariballl+' '+datee.getFullYear()+'</th>\
            <th class="text-center">مجموع الوحدات المنجزة النهائية</th>\
            <th class="text-center">'+unithaveDone+'</th>\
            <th class="text-center">المعدل التراكمي العام</th>\
            <th class="text-center">'+o[o.length-1]+'</th>\
          </tr>\
          <tr>\
            <th class="text-center" colspan="4">التقدير العام</th>\
            <th class="text-center" colspan="2"></th>\
          </tr>\
        </thead>\
      </table>\
      <div class="pull-right">\
        <span>المعدل موزع كالتالي <span>:</span></span>\
      </div>\
      <div class="row">\
        <div class="col-xs-8">\
          <table class="table table-condensed">\
            <thead>\
              <tr>\
                <th class="text-center" width="1%">ممتاز</th>\
                <th class="text-center" width="1%">جيد جدا</th>\
                <th class="text-center" width="1%">جيد</th>\
                <th class="text-center" width="1%">مقبول</th>\
              </tr>\
              <tr>\
                <th class="text-center">% 100 - 85</th>\
                <th class="text-center">% 85 - 75</th>\
                <th class="text-center">% 75 - 65</th>\
                <th class="text-center">% 65 - 50</th>\
              </tr>\
            </thead>\
          </table>\
        </div>\
      </div>\
      <div class="row">\
        <div class="col-xs-10 col-xs-offset-1">\
          <div class="pull-right">\
            <span>مكتب مدير التسجيل والدراسة والامتحانات</span>\
          </div>\
          <div class="pull-left">\
            <span>مدير عام المعهد</span>\
          </div>\
        </div>\
      </div>\
    </div> \
  </body>\
</html>';
  return htmldraw;
  }

function htmlTagsDrawDetection(data,stu){ 
  var html=' ';
  var sub = ' ';
  var subject = [];
  for(k in data){
    sub+='<th class="text-center">'+data[k].code+'</th>';
    subject[k]=data[k].id;
  }

      if(sub.length==1){
        sub='<td></td>';
      }

  html+='<table class="table condensed">\
    <thead>\
      <tr style="border-top-style: solid; border-top-width: 2px;">\
        <th class="text-center" width="1%" height="46">ت</th>\
        <th class="text-center" width="13%">اسم الطالب<span>/</span>ة</th>\
        <th class="text-center" width="6%">رقم القيد</th>\
        <th class="text-center" width="1%">الدرجــــــــة</th>\
        '+sub+'\
        <th class="text-center" style="width: 20%;">ملاحظات</th>\
        <th class="text-center" width="8%">المجموع العام</th>\
        <th class="text-center" width="8%">التقدير العام</th>\
        <th class="text-center" width="9%">النتيجة النهائية</th>\
      </tr>\
  </thead>';
    for (i in stu){
      var cahp= ' ';
      var fin = ' ';
      var sum = ' '; 
      var not=' ';
      for(k in stu[i]){
        if(subject[k]==stu[i][k].id){
          cahp+= '<td>'+stu[i][k].chapter_degree+'</td>';
          fin+= '<td>'+stu[i][k].final_exam+'</td>';
          sum+= '<td>'+stu[i][k].sum_dagree+'</td>';
        }else{
          not+= '<p>'+stu[i][k].code+' : '+stu[i][k].sum_dagree+' </p> ';
        }
      } 
      if(cahp.length==1){
        cahp='<td width="9%"></td>';
      }
      if(sum.length==1){
        sum='<td width="9%"></td>';
      }
      if(fin.length==1){
        fin='<td width="9%"></td>';
      }
      html+='<tbody style="border: 2px solid #000;">\
        <tr>\
          <td></td>\
          <td>'+stu[i][0].first_name+' '+stu[i][0].father_name+' '+stu[i][0].grand_name+' '+stu[i][0].last_name+'</td>\
          <td>'+stu[i][0].set_number+'</td>\
          <td style="font-size: 11px;" class="text-center">أعمال السنة</td>\
          '+cahp+'\
          <td style="width: 20%;">'+not+'</td>\
          <td></td>\
          <td></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td></td>\
          <td></td>\
          <td></td>\
          <td style="font-size: 11px;" class="text-center">نهاية العــام</td>\
          '+fin+'\
          <td style="width: 20%;"></td>\
          <td></td>\
          <td></td>\
          <td></td>\
        </tr>\
        <tr>\
          <td></td>\
          <td></td>\
          <td></td>\
          <td style="font-size: 11px;" class="text-center">المجمـــــــوع</td>\
          '+sum+'\
          <td style="width: 20%;"></td>\
          <td></td>\
          <td></td>\
          <td></td>\
        </tr>\
      </tbody>';
  
}
  html+='</table>';


return html;

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


  router.get('/arabicTranscript/:id', function(req, res, next) {
    models.sequelize.query('SELECT at.notices,at.`sum_dagree`,at.`SemesterStudentId`,st.set_number,st.`first_name`,st.`father_name`,st.`grand_name`,st.`last_name`,sb.`no_th_unit`,sb.`code`,sb.`name`,sb.`code`,sb.`no_th_unit`,dd.name as deptName,dev.id as idDev,dev.name as devName,s.system_type,s.sem_type,s.year FROM Departments as dd,Divisions as dev, SemesterStudents AS ss LEFT JOIN Semesters AS s ON ( ss.semesterId = s.id ) left JOIN Students AS st ON ( ss.studentId = st.id ) left JOIN Academic_transcripts AS at ON ( ss.id = at.SemesterStudentId AND at.status = 1) left JOIN Sub_groups AS sg ON ( at.SubGroupId = sg.id ) left JOIN Subjects AS sb ON ( sg.SubjectId = sb.id) WHERE st.`id`=? and ss.DepartmentId=dd.id and ss.DivisionId=dev.id   order by s.`starting_date`', { replacements: [req.params.id] }
    ).then(function(arabicTranscriptObject){
       models.sequelize.query('select s.no_th_unit from Sub_groups as sb,Subjects as s where sb.DivisionId=? and sb.SubjectId=s.id', { replacements: [arabicTranscriptObject[0][1].idDev] }
         ).then(function(subj){
          models.sequelize.query('select subjj.id as idsubject,subjj.name, SemS.StudentId,Sem.starting_date,acad.SemesterStudentId,acad.sum_dagree,SemS.SemesterId,subjj.no_th_unit from `SemesterStudents` as SemS ,`Semesters` as Sem ,`Academic_transcripts` as acad , `Sub_groups` as sub ,`Subjects` as subjj where acad.status=1 and SemS.StudentId=? and Sem.id = SemS.SemesterId and acad.SemesterStudentId = SemS.id and sub.id=acad.SubGroupId and subjj.id=sub.SubjectId order by Sem.starting_date',{ replacements: [req.params.id]}
          ).then(function(mix){
            var array=getRatioForALlSemester(mix);
            //console.log(arabicTranscriptObject[0][arabicTranscriptObject[0].length-1]);
            if(arabicTranscriptObject[0] != 0){
            var fullName=returnFullName(arabicTranscriptObject);
            var setNumber=arabicTranscriptObject[0][1].set_number;
            var department=arabicTranscriptObject[0][1].deptName;
            var devision=arabicTranscriptObject[0][1].devName;
            var system=systemTypeAndSemType(arabicTranscriptObject);
            jsr.render({
              template: { 
                content:  fs.readFileSync(path.join(__dirname, "../views/arabicTranscript.html"), "utf8"),
                recipe: "phantom-pdf",
                helpers:htmlTagsDraw.toString()
              },
              data:{name:fullName,setNum:setNumber,dept:department,dev:devision,sys:system,obj:arabicTranscriptObject,ob:subj,o:array}
            }).then(function (response) {
              response.result.pipe(res);
            });
          } else {
            res.send("هذا الطالب حديث التسجيل في المعهد ولم يتم تسجيل تخصصه ولم يتم فتح فصل دراسي له ");
          }
        });
      });
    });
  });

  router.get('/englishTranscript/:id', function(req, res, next) {
    models.sequelize.query('SELECT at.notices,at.`sum_dagree`,at.`SemesterStudentId`,st.set_number,st.`first_name_en`,st.`father_name_en`,st.`grand_name_en`,st.`last_name_en`,sb.`no_th_unit`,sb.`code`,sb.`name_en`,sb.`code`,sb.`no_th_unit`,dd.name_en as deptName,dev.id as idDev,dev.name_en as devName,s.system_type,s.sem_type,s.year FROM Departments as dd,Divisions as dev, SemesterStudents AS ss LEFT JOIN Semesters AS s ON ( ss.semesterId = s.id ) left JOIN Students AS st ON ( ss.studentId = st.id ) left JOIN Academic_transcripts AS at ON ( ss.id = at.SemesterStudentId AND at.status=1) left JOIN Sub_groups AS sg ON ( at.SubGroupId = sg.id ) left JOIN Subjects AS sb ON ( sg.SubjectId = sb.id) WHERE st.`id`=? and ss.DepartmentId=dd.id and ss.DivisionId=dev.id   order by s.`starting_date`', { replacements: [req.params.id] }
    ).then(function(arabicTranscriptObject){
       models.sequelize.query('select s.no_th_unit from Sub_groups as sb,Subjects as s where sb.DivisionId=? and sb.SubjectId=s.id', { replacements: [arabicTranscriptObject[0][1].idDev] }
         ).then(function(subj){
          models.sequelize.query('select subjj.id as idsubject,subjj.name, SemS.StudentId,Sem.starting_date,acad.SemesterStudentId,acad.sum_dagree,SemS.SemesterId,subjj.no_th_unit from `SemesterStudents` as SemS ,`Semesters` as Sem ,`Academic_transcripts` as acad , `Sub_groups` as sub ,`Subjects` as subjj where acad.status=1 and SemS.StudentId=? and Sem.id = SemS.SemesterId and acad.SemesterStudentId = SemS.id and sub.id=acad.SubGroupId and subjj.id=sub.SubjectId order by Sem.starting_date',{ replacements: [req.params.id]}
          ).then(function(mix){
            var array=getRatioForALlSemester(mix);
            if(arabicTranscriptObject[0] != 0){
            var fullName= returnFullNameEng(arabicTranscriptObject);
            var setNumber=arabicTranscriptObject[0][1].set_number;
            var department=arabicTranscriptObject[0][1].deptName;
            var devision=arabicTranscriptObject[0][1].devName;
            var system=systemTypeAndSemType(arabicTranscriptObject);
            jsr.render({
              template: { 
                content:  fs.readFileSync(path.join(__dirname, "../views/englishTranscript.html"), "utf8"),
                recipe: "phantom-pdf",
                helpers:htmlTagsDrawEnglish.toString()
              },
              data:{name:fullName,setNum:setNumber,dept:department,dev:devision,sys:system,obj:arabicTranscriptObject,ob:subj,o:array}
            }).then(function (response) {
              response.result.pipe(res);
            });
          } else {
            res.send("هذا الطالب حديث التسجيل في المعهد ولم يتم تسجيل تخصصه ولم يتم فتح فصل دراسي له ");
          }
        });
      });
    });
  });

  router.get('/detection/:id', function(req, res, next) {
    models.sequelize.query('SELECT DISTINCT(`s`.`id`),`s`.`code` FROM `Subjects` AS `s`,`Sub_groups` AS `sg`,`Academic_transcripts` AS `at` INNER JOIN  `SemesterStudents` AS `ss` ON(`at`.`SemesterStudentId`=`ss`.`id` AND `ss`.`DivisionId`=1 AND `ss`.`SemesterId` =2 AND `ss`.`level` =2 AND `ss`.`status`=1 AND `at`.`notices`=1 ) WHERE `at`.`SubGroupId`= `sg`.`id` AND `at`.`status`=1 AND `sg`.`SubjectId`=`s`.`id` ORDER BY `s`.`id`;', { replacements: [req.params.id] }
    ).then(function(obj){
      console.log(obj[0]);
        models.sequelize.query('SELECT `at`.`sum_dagree`,`s`.`code`,`s`.`id`,`at`.`chapter_degree`,`at`.`final_exam`,`at`.`sum_dagree`,`at`.`StudentId`,`st`.`first_name` ,`st`.`father_name`,`st`.`grand_name`,`st`.`last_name`,`st`.`set_number`FROM `Students` AS `st`, `Subjects` AS `s`,`Sub_groups` AS `sg`,`Academic_transcripts` AS `at` INNER JOIN  `SemesterStudents` AS `ss` ON(`at`.`SemesterStudentId`=`ss`.`id` AND `ss`.`DivisionId`=1 AND `ss`.`SemesterId` =2 AND `ss`.`status`=1 ) WHERE `at`.`SubGroupId`= `sg`.`id` AND `at`.`status`=1 AND `sg`.`SubjectId`=`s`.`id` AND `st`.`id`=`at`.`StudentId` AND `st`.`status`=1 ORDER BY `at`.`StudentId`,`s`.`id` ;', { replacements: [req.params.id] }
      ).then(function(subjects){

        var students = {};
        for(subject in subjects[0]){
          if(students[subjects[0][subject].StudentId]==undefined)
            students[subjects[0][subject].StudentId]=[];
          students[subjects[0][subject].StudentId].push(subjects[0][subject]);

        }

        console.log(students);
        // console.log(degree[0]);
      //   var id=0;
      //   for (i in degree[0]){
      // var t={};
      // var arr=[][12];
      // var obj ={sum:degree[0][i].sum_dagree,code:degree[0][i].code,id:degree[0][i].id,chap:degree[0][i].chapter_degree,fin:degree[0][i].final_exam};
      // if(id!=degree[0][i].StudentId){

      //   arr[arr.length].push(obj);
      // }else{

      //   arr[-1].push(obj);
      // }
      //  id=degree[0][i].StudentId;
      // }
        jsr.render({
          template: { 
            content:  fs.readFileSync(path.join(__dirname, "../views/detection.html"), "utf8"),
            phantom: {
              format: 'A3',
              orientation: "landscape",
            },
            recipe: "phantom-pdf",
            helpers:htmlTagsDrawDetection.toString()
          },
          data:{data:obj[0],deg:students}
        }).then(function (response) {
          //you can for example pipe it to express.js response
          response.result.pipe(res);
        });
      });
    });
  });

  // this sertificate
  router.get('/certificate/:id', function(req, res, next) {
    models.sequelize.query('SELECT *,Dp.name as named,Dp.name_en as namede FROM `SemesterStudents`as`smst`,`Semesters`as`sm`,`Students` as `st`,`Departments` as `Dp`,`Divisions` as `Dv` WHERE Dp.`id`= smst.`DepartmentId` and Dv.`id` = smst.`DivisionId` and sm.`id` =smst.`SemesterId` and st.`id`=smst.`StudentId` and st.`id` =? ; ', { replacements: [req.params.id] }
    ).then(function(obj){
      models.sequelize.query('SELECT at.notices,at.`sum_dagree`,at.`SemesterStudentId`,st.set_number,st.`first_name`,st.`father_name`,st.`grand_name`,st.`last_name`,sb.`no_th_unit`,sb.`code`,sb.`name`,sb.`code`,sb.`no_th_unit`,dd.name as deptName,dev.id as idDev,dev.name as devName,s.system_type,s.sem_type,s.year FROM Departments as dd,Divisions as dev, SemesterStudents AS ss LEFT JOIN Semesters AS s ON ( ss.semesterId = s.id ) left JOIN Students AS st ON ( ss.studentId = st.id ) left JOIN Academic_transcripts AS at ON ( ss.id = at.SemesterStudentId AND at.status = 1) left JOIN Sub_groups AS sg ON ( at.SubGroupId = sg.id ) left JOIN Subjects AS sb ON ( sg.SubjectId = sb.id) WHERE st.`id`=? and ss.DepartmentId=dd.id and ss.DivisionId=dev.id   order by s.`starting_date`', { replacements: [req.params.id] }
      ).then(function(arabicTranscriptObject){
       var myob=arabicTranscriptObject[0][arabicTranscriptObject[0].length-1];
        if(myob.system_type==1){
          if(myob.sem_type==1){
            var sem='ربيع';
            var sem_en='Spring';
          }else if(myob.sem_type==2){
            var sem='خريف';
            var sem_en='Fall';
          }else{
            var sem='صيف';
            var sem_en='Summer';
          }
        }else{
          var sem = 'سنة';
          var sem_en='year';
        }
        var year=myob.year.getFullYear();
         models.sequelize.query('select subjj.id as idsubject,subjj.name, SemS.StudentId,Sem.starting_date,acad.SemesterStudentId,acad.sum_dagree,SemS.SemesterId,subjj.no_th_unit from `SemesterStudents` as SemS ,`Semesters` as Sem ,`Academic_transcripts` as acad , `Sub_groups` as sub ,`Subjects` as subjj where acad.status=1 and SemS.StudentId=? and Sem.id = SemS.SemesterId and acad.SemesterStudentId = SemS.id and sub.id=acad.SubGroupId and subjj.id=sub.SubjectId order by Sem.starting_date',{ replacements: [req.params.id]}
          ).then(function(mix){
          var array=getRatioForALlSemester(mix);
          var rat = array[array.length-1];
          if(rat>=85 ){
            status="ممتاز";
            var status_en='Excellent';
          } else if(rat>=75 && rat<85) {
            status="جيدجدا";
            var status_en='Very Good';
          } else if(rat>=65 && rat<75) {
            status="جيد";
            var status_en='Good';
          } else if(rat>=50 && rat<65) {
              status="مقبول";
              var status_en='Pass';
          } else if(rat>=35 && rat<50) {
              status="ضعيـف";
              var status_en='Week';
          } else if(rat>=0 && rat<35) {
              status="ضعيف جدا";
              var status_en='Very Week';
          } 
          jsr.render({
            template: { 
              content:  fs.readFileSync(path.join(__dirname, "../views/certificate.html"), "utf8"),
              recipe: "phantom-pdf"
            },
            data:{st:obj[0][0],nat:nationality[obj[0][0].nationality-1],date:obj[0][0].birth_date.getDate()+'-'+obj[0][0].birth_date.getMonth()+1+'-'+obj[0][0].birth_date.getFullYear(),sem:sem,year:year,status:status,rat:rat,sem_en:sem_en,status_en:status_en}
          }).then(function (response) {
            response.result.pipe(res);
          });
        });
      });
    });
  });

  // this sertificate
  router.get('/giftCertificate', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/giftCertificate.html"), "utf8"),
        phantom:{
          orientation: "landscape",
        },
        recipe: "phantom-pdf",
        },
      data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  // this certificate
  router.get('/certificateTrue/:id', function(req, res, next) {
    models.sequelize.query('SELECT *,Dp.name as named,Dp.name_en as namede FROM `SemesterStudents`as`smst`,`Semesters`as`sm`,`Students` as `st`,`Departments` as `Dp`,`Divisions` as `Dv` WHERE Dp.`id`= smst.`DepartmentId` and Dv.`id` = smst.`DivisionId` and sm.`id` =smst.`SemesterId` and st.`id`=smst.`StudentId` and st.`id` =? ; ', { replacements: [req.params.id] }
    ).then(function(obj){
      models.sequelize.query('SELECT at.notices,at.`sum_dagree`,at.`SemesterStudentId`,st.set_number,st.`first_name`,st.`father_name`,st.`grand_name`,st.`last_name`,sb.`no_th_unit`,sb.`code`,sb.`name`,sb.`code`,sb.`no_th_unit`,dd.name as deptName,dev.id as idDev,dev.name as devName,s.system_type,s.sem_type,s.year FROM Departments as dd,Divisions as dev, SemesterStudents AS ss LEFT JOIN Semesters AS s ON ( ss.semesterId = s.id ) left JOIN Students AS st ON ( ss.studentId = st.id ) left JOIN Academic_transcripts AS at ON ( ss.id = at.SemesterStudentId AND at.status = 1) left JOIN Sub_groups AS sg ON ( at.SubGroupId = sg.id ) left JOIN Subjects AS sb ON ( sg.SubjectId = sb.id) WHERE st.`id`=? and ss.DepartmentId=dd.id and ss.DivisionId=dev.id   order by s.`starting_date`', { replacements: [req.params.id] }
      ).then(function(arabicTranscriptObject){
       var myob=arabicTranscriptObject[0][arabicTranscriptObject[0].length-1];
        if(myob.system_type==1){
          if(myob.sem_type==1){
            var sem='ربيع';
            var sem_en='Spring';
          }else if(myob.sem_type==2){
            var sem='خريف';
            var sem_en='Fall';
          }else{
            var sem='صيف';
            var sem_en='Summer';
          }
        }else{
          var sem = 'سنة';
          var sem_en='year';
        }
        var year=myob.year.getFullYear();
         models.sequelize.query('select subjj.id as idsubject,subjj.name, SemS.StudentId,Sem.starting_date,acad.SemesterStudentId,acad.sum_dagree,SemS.SemesterId,subjj.no_th_unit from `SemesterStudents` as SemS ,`Semesters` as Sem ,`Academic_transcripts` as acad , `Sub_groups` as sub ,`Subjects` as subjj where acad.status=1 and SemS.StudentId=? and Sem.id = SemS.SemesterId and acad.SemesterStudentId = SemS.id and sub.id=acad.SubGroupId and subjj.id=sub.SubjectId order by Sem.starting_date',{ replacements: [req.params.id]}
          ).then(function(mix){
          var array=getRatioForALlSemester(mix);
          var rat = array[array.length-1];
          if(rat>=85 ){
            status="ممتاز";
            var status_en='Excellent';
          } else if(rat>=75 && rat<85) {
            status="جيدجدا";
            var status_en='Very Good';
          } else if(rat>=65 && rat<75) {
            status="جيد";
            var status_en='Good';
          } else if(rat>=50 && rat<65) {
              status="مقبول";
              var status_en='pass';
          } else if(rat>=35 && rat<50) {
              status="ضعيـف";
              var status_en='Week';
          } else if(rat>=0 && rat<35) {
              status="ضعيف جدا";
              var status_en='Very Week';
          }
          jsr.render({
          template: { 
            content:  fs.readFileSync(path.join(__dirname, "../views/certificateTrue.html"), "utf8"),
            recipe: "phantom-pdf"
          },
          data:{st:obj[0][0],nat:nationality[obj[0][0].nationality-1],date:obj[0][0].birth_date.getDate()+'-'+obj[0][0].birth_date.getMonth()+1+'-'+obj[0][0].birth_date.getFullYear(),sem:sem,year:year,status:status,rat:rat,sem_en:sem_en,status_en:status_en}
          }).then(function (response) {
            response.result.pipe(res);
          });
        });
      });
    });
  });

  // this sertificate
  router.get('/enGradCert', function(req, res, next) {
    jsr.render({
      template: { 
        content:  fs.readFileSync(path.join(__dirname, "../views/englishGraduationCertificate.html"), "utf8"),
        recipe: "phantom-pdf",
        },
      data:obj
    }).then(function (response) {
      response.result.pipe(res);
    });
  });

  router.get('/',function(req, res){
    models.sequelize.query('SELECT * FROM `Divisions` d,`Subjects` s WHERE `s`.`system_type` = 1 AND `d`.`id` = ? AND `s`.`status`=1 AND `d`.`DepartmentId`= `s`.`DepartmentId` AND `s`.`id` NOT IN (SELECT `SubjectId` FROM `DivisionSubjects` WHERE `DivisionId` = ? );', { replacements: [req.params.id,req.params.id] }
      ).then(function(subjectsS){
      res.render();
    });
  });


  router.get('/academicTranscripts',userHelpers.isLogin, function(req, res) {
    var page = userHelpers.getPage(req);
    var limit = userHelpers.getLimit(page);
    var q = userHelpers.getQuery(req);
    var first_name = userHelpers.getname(req);
    var father_name = userHelpers.getfather_name(req);
    var last_name = userHelpers.getlast_name(req);
    var obj ={where: {status: 1}};
    if(q != ""){
      obj.where.set_number={$like:'%'+q+'%'};
    }
    if(first_name !=""){
      obj.where.first_name={$like:'%'+first_name+'%'};
    }
    if (father_name !=""){
    obj.where.father_name={$like:'%'+father_name+'%'};
    }
    if (last_name != ""){
      obj.where.last_name={$like:'%'+last_name+'%'};
    }
    obj.limit = 10;
    obj.offset= limit;
  models.Student.findAndCountAll(obj).then(function(student) {
    var pageCount = userHelpers.getPageCount(student.count);
    var pagination = userHelpers.paginate(page,pageCount);
    res.render('academicTranscripts', { title: 'Academic Transcripts', name:req.session.name,nats:nationality, student:student.rows,pagination:pagination,collapseSeven: 'collapse in', activeSevenOne: 'active' });
  });
});
router.get('/studentSemesters',userHelpers.isLogin, function(req, res) {
  res.render('studentSemesters', { title: 'Academic Transcripts', name:req.session.name });
});


// this algorithem to get ratio for all semester it's hard to explain
getRatioForALlSemester=function(mix){
  if(mix[0] !=0){
  var arrayOfObject=[];
  for(i in mix[0]){
    arrayOfObject.push({idSubject:mix[0][i].idsubject,degree:mix[0][i].sum_dagree,unit:mix[0][i].no_th_unit,name:mix[0][i].name,semId:mix[0][i].SemesterId,flag:0});
  }
  var numberOfSemester=0,counter=0,index=[];
  var t=arrayOfObject[0].semId;
  for(i=0;i<arrayOfObject.length;i++){
    if(t!=arrayOfObject[i].semId){
      index.push(i);
      t=arrayOfObject[i].semId; 
      numberOfSemester++;
      counter++;
      arrayOfObject[i].flag=counter;
    }
  }
  index.push(arrayOfObject.length);
  counter=numberOfSemester++;
  var sum=0;
  var another=[];
  var x=0;
  var sumUnit=0;
  var allRatio=[];
  for(var j=0;j<numberOfSemester;j++){
    for(var k=0;k<index[j];k++){
      for(var l=0;l<index[j];l++){  
        if(arrayOfObject[k].idSubject==arrayOfObject[l].idSubject ){
          if(arrayOfObject[k].degree>arrayOfObject[l].degree && k!=l){
            arrayOfObject[l]={idSubject:0,degree:0,unit:0,name:"",semId:0,flag:0} ;        
          } else if(arrayOfObject[k].degree==arrayOfObject[l].degree && k!=l) {      
              arrayOfObject[l]={idSubject:0,degree:0,unit:0,name:"",semId:0,flag:0} ;        
          } else if(arrayOfObject[k].degree<arrayOfObject[l].degree && k!=l){
              arrayOfObject[k]= {idSubject:0,degree:0,unit:0,name:"",semId:0,flag:0} ;        
            }         
          } 
        }
      sum=sum+(arrayOfObject[k].degree*arrayOfObject[k].unit);
      sumUnit=sumUnit+arrayOfObject[k].unit;
      }
    allRatio.push(round((sum/sumUnit),3));
    sum=0;
    sumUnit=0.0;
  }
   
  for(var i=0;i<allRatio.length;i++){
    if(!allRatio[i]){
      allRatio[i]=0;
    }
  }
      return allRatio;
    }
},

// this algorithem to get ratio for semester it's hard to explain
getRatioForSemester = function(mix){
  var array=[];
  if(mix[0][0]!= undefined){   
    var t=mix[0][0].SemesterId;
    var tt=mix[0][0].SemesterId;
    var sum=0.0;
    var sumUnit=0.0;
    var semesterCount=0;
    for(var i=0;i<mix[0].length;i++){
      if(mix[0][i].SemesterId==t){
        sum=round(sum+(mix[0][i].sum_dagree*mix[0][i].no_th_unit),3);
        sumUnit=round(sumUnit+mix[0][i].no_th_unit,3);
      } else {
        array.push(round((sum/sumUnit),3));
        sum=0.0;
        sumUnit=0.0;
        t=mix[0][i].SemesterId;
        --i;
      }
    }
  }
    
    if(!round((sum/sumUnit),3))
    {
       array.push(0);
    } else {
      array.push(round((sum/sumUnit),3));
    }
   // array.push(round((sum/sumUnit),3));
  //}

  for(var i=0 ; i<array.length;i++){
    if(!array[i]){
      array[i]=0;
    }
  }


  return array;
},


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
          },
          order: '`starting_date` DESC'
         }).then(function(semester) {
         models.SemesterStudent.findAll({
          where: {
          status: 1,
          StudentId: req.params.id
          },
          order: '`starting_date` DESC',
      "include" : [
        {"model" : models.Division},
        {"model"  : models.Department},
        {"model"  : models.User},
        {"model"  : models.Semester,
      },
      ],
         }).then(function(semstudent) {
          var idstudent =req.params.id;

            models.sequelize.query('SELECT  sb.id as idsubject,sb.name, ss.StudentId,s.starting_date,at.SemesterStudentId,at.sum_dagree,ss.SemesterId,sb.no_th_unit FROM Departments as dd,Divisions as dev, SemesterStudents AS ss LEFT JOIN Semesters AS s ON ( ss.semesterId = s.id ) left JOIN Students AS st ON ( ss.studentId = st.id ) left JOIN Academic_transcripts AS at ON ( ss.id = at.SemesterStudentId AND at.status=1) left JOIN Sub_groups AS sg ON ( at.SubGroupId = sg.id ) left JOIN Subjects AS sb ON ( sg.SubjectId = sb.id) WHERE st.`id`=? and ss.DepartmentId=dd.id and ss.DivisionId=dev.id   order by s.`starting_date`',{ replacements: [idstudent]}
            ).then(function(mix){
              // this is for semester Ratio
              var array=getRatioForSemester(mix);
              // this is for all semester ratio
              var arrayy=getRatioForALlSemester(mix);
              if (arrayy != undefined) {
                arrayy=arrayy.reverse();
              }
              if (array != undefined) {
                array=array.reverse();
              }
              var semesterTy=['الاول','الثاني','الثالث','الرابع','الخامس','السادس','السابع','الثامن','التاسع','العاشر','الحادي العاشر','الثاني عشر'];
              res.render('studentData', {ar:arrayy,arr:array,title: 'Student Data' , name:req.session.name,std:req.params.id,sem:semester,dept:department,dev:Division,semStudent: semstudent,semty:semesterTy});
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
  console.log(req.url);
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
        models.sequelize.query('SELECT *,`sg`.`id` FROM `Sub_groups` sg ,`Subjects` s WHERE `sg`.`SubjectId`=`s`.id AND `s`.`status`=1 AND `sg`.`DivisionId` IN(SELECT id FROM `Divisions` WHERE `status`=1 AND `DepartmentId`= ? ); ', { replacements: [sem.DepartmentId] }
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
  console.log(req.body.SubGroupId);
  models.sequelize.query('select s.final_theor from Subjects as s,Sub_groups as sg where sg.id =?  and s.id=sg.SubjectId', { replacements: [req.body.SubGroupId] }
  ).then(function(obj){
    if(parseFloat(req.body.final_exam) >= (obj[0][0].final_theor * 0.55)){
      req.body.sum_dagree= parseFloat(req.body.chapter_degree)+parseFloat(req.body.final_exam);
    } else  { 
        req.body.sum_dagree=parseFloat(req.body.chapter_degree);
        console.log("**************"+req.body.sum_dagree);
    }
 // parseFloat(req.body.final_exam);
 // req.body.sum_dagree= parseFloat(req.body.chapter_degree)+parseFloat(req.body.final_exam);
  models.Academic_transcript.findOrCreate({where: {StudentId:req.body.StudentId,status:1,SemesterStudentId:req.body.SemesterStudentId,SubGroupId: req.body.SubGroupId}, defaults: req.body})
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
});

router.post('/updateG',userHelpers.isLogin,function(req,res){
  console.log(req.body.body);
  models.sequelize.query('select s.final_theor from Academic_transcripts as at,Sub_groups as sg,Subjects as s where at.id=1 and at.SubGroupId=sg.id and sg.SubjectId=s.id', { replacements: [req.body.id] }
  ).then(function(obj){
    if(parseFloat(req.body.body.final_exam) >= (obj[0][0].final_theor * 0.55)){
      req.body.body.sum_dagree= parseFloat(req.body.body.chapter_degree)+parseFloat(req.body.body.final_exam);
    } else  { 
        req.body.body.sum_dagree=parseFloat(req.body.body.chapter_degree);
        console.log("**************"+req.body.body.sum_dagree);
    }
  

  //req.body.body.sum_dagree= parseFloat(req.body.body.chapter_degree)+parseFloat(req.body.body.final_exam);
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
});

router.get('/deletetranscript/:id',userHelpers.isLogin,function(req,res){
  models.Academic_transcript.destroy({
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

router.get('/getsem/:id',userHelpers.isLogin,function(req,res){
  if(req.params.id=="false"){
    var ob = {where:{status:1},order: '`id` DESC'};
  }else{
    var date = new Date(req.params.id);
    var ob = {where:{status:1,year:{$like:date}},order: '`id` DESC'};

  }
  
   models.Semester.findAll(ob).then(function(semester) {
    res.send(semester);
  });
});
router.post('/updateSemStu',userHelpers.isLogin,function(req,res){
  models.SemesterStudent.update(req.body.body,{
    where: {
      id:req.body.id
    }
  }).then(function(result){
    models.Division.findOne({
      where:{
        id:req.body.body.DivisionId
      }
    }).then(function(resl){
      res.send(resl);
    });
  });
});
router.get('/deleteSemStu/:id',userHelpers.isLogin,function(req,res){
  models.SemesterStudent.destroy({
    where: {
      id: req.params.id
    }      
  }).then(function (todo) {
    res.send({msg:"1"});//got deleted successfully
  }).catch(function (err) {
    res.send({msg:"2"});//has foreign-key restriction
  });
});
module.exports = router;