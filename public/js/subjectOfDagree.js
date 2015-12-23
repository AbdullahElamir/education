$(document).ready(function(){
 
$('body').on('change', '#Department', function(){
    var id = $(this).val();
    $('#Division').empty();
    $.get('/subjectOfDagree/division/'+id,function(data){
      $('#Division').empty();
      $('#Division').append('<option value="" style="color:grey; display:none;">اختر الشعبة...</option>');
      for(key in data){
          $('#Division').append("<option value = '"+data[key].id+"'>"+data[key].name+"</option>").selectpicker('refresh');
        }
    });
  });

$('#Division').on('change', function(){
  var idDivision = $(this).val();
  $('#Semester').on('change', function(){
    var idSemester = $(this).val();
      obj={idDivision:idDivision,idSemester:idSemester};
      $.post('/subjectOfDagree/subject/',obj,function(data){
        $('#Subject').empty();
        $('#Subject').append('<option value="" style="color:grey; display:none;">اختر مادة...</option>');
        for(key in data){
            $('#Subject').append("<option value = '"+data[key].Subject.id+"'>"+data[key].Subject.name+"</option>").selectpicker('refresh');
          }
        });
    });
  });

 $('body').on('click', '#saveDegree', function(){
    //gets table
    var oTable = document.getElementById('tbody');
    //gets rows of table
    var rowLength = oTable.rows.length;
    //loops through rows   
    var static_row = oTable.rows.item(0).cells;
    /* get your cell info here */
    var oCells = oTable.rows.item(0).cells;
    var div = oCells.item(0).innerHTML; 
    var sem = oCells.item(1).innerHTML; 
    var sub = oCells.item(2).innerHTML; 
    var studentdata=[];
    for (i = 0; i < rowLength; i++){
      var oCells = oTable.rows.item(i).cells;
      /* get your cell info here */
      var id = oCells.item(3).innerHTML;
      var grade = $('#grade'+i).val();
      obj={idstudent:id,grade:grade} ;
      studentdata.push(obj);
    }
    update={allIds:{div:div,sem:sem,sub:sub},student:studentdata};
     $.post("/subjectOfDagree/updateGrade",update, function(data, error){
      
      window.location.href='/subjectOfDagree?msg=1';

     });
  
  });

   var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
      var p=a[i].split('=', 2);
      if (p.length == 1)
        b[p[0]] = "";
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&'));

  if(qs["msg"]==1){
    custNotify("success","نجح","تمت عملية رصد الدرجات بنجاح","ok-sign","bounceInDown","bounceOutUp");
    var pageUrl = '/subjectOfDagree'
    window.history.pushState("","",pageUrl);
  }

 



$('#Division').on('change', function(){
  $("#tbody").empty();
  var idDivision = $(this).val();
  $('#Semester').on('change', function(){
    $("#tbody").empty();
    var idSemester = $(this).val();
      $('#Subject').on('change', function(){
        var idSubject = $(this).val();
         obj={idDivision:idDivision,idSemester:idSemester,idSubject:idSubject};
        
        $.post("/subjectOfDagree/getStudentNames",obj, function(data, error){
         $("#tbody").empty();
          for(i in data){
            var color=' ';
            if(data[i].grade<50){
              color='style=\'background-color:#ee9ca7\'';
            }
          $("#tbody").append('<tr '+color+'>'+
            '<td hidden>'+idDivision+'</td>'+
            '<td hidden>'+idSemester+'</td>'+
            '<td hidden>'+idSubject+'</td>'+
            '<td hidden>'+data[i].id+'</td>'+
            '<td class="text-center">'+data[i].first_name+" "+data[i].father_name+" "+data[i].last_name+'</td>'+
            '<td class="text-center">'+data[i].set_number+'</td>'+
            '<td class="text-center"><input  id="grade'+i+'" style="width:100px;" type="text" value='+data[i].grade+'></input></td>'+
            '</td>');
        }

        $("#tbody").append('<div class="form-group"> \
          <div class="row">\
          <div class="col-xs-4 col-xs-offset-1 col-md-4 col-md-offset-2">\
            <button id="saveDegree" target="_blank" type="button" class="btn btn-primary"><i class="fa fa-eye"></i><span> حفظ الدرجات النهائية للطلبة</span></button>\
          </div>\
        </div>\
        </div>');
        }); 

    });
  });
});


  // $("#formResultsOfStudent").validate({
  //   ignore: ':not(select:hidden, input:visible, textarea:visible)',
  //   rules:{
  //     department:{
  //       required: true,
  //     },
  //     division:{
  //       required: true,
  //     },
  //     semester:{
  //       required: true,
  //     },
  //     level:{
  //       required: true,
  //     },
  //     subject:{
  //       required:true,
  //     }
  //   },
  //   messages:{
  //     department:{
  //       required: "الرجاء اختيار اسم القسم!",
  //     },
  //     division:{
  //       required: "الرجاء اختيار اسم الشعبة!",
  //     },
  //     semester:{
  //       required: "الرجاء اختيار السنة الدراسية!",
  //     },
  //     level:{
  //       required: "الرجاء اختيار المستوى!",
  //     },
  //     subject:{
  //       required: "الرجاء اختيار المادة الدراسية!",
  //     }
  //   },
  //   errorClass: 'custom-error',
  //   errorPlacement: function (error, element) {
  //     if ($(element).is('select')) {
  //         element.next().after(error);
  //     } else {
  //         error.insertAfter(element);
  //     }
  //   },
  //   highlight: function(element) {
  //     $(element).closest('.row').addClass('has-error');
  //   },
  //   unhighlight: function(element) {
  //     $(element).closest('.row').removeClass('has-error');
  //   },
  //   invalidHandler: function(event, validator) {
  //     var errors = validator.numberOfInvalids();
  //     if (errors) {
  //       custNotify("danger","خطأ","الرجاء التأكد من صحة اختيار البيانات","warning-sign","bounceIn","bounceOut");
  //     }
  //   },
  // });

  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });


});