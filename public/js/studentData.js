
$(document).ready(function(){
  $('body').on('click', '#addStudentData', function(e) {
    e.preventDefault();
  	var obj = {student_status:$('#student_status').val(),StudentId:$('#studentId').val(),DepartmentId:parseInt($('#department_iddepartment').val()),SemesterId:$(this).val(),DivisionId:$('#division_iddivision').val(),level:$('#level').val()} ;
  	var isvalidate=$("#addSemester").valid();
    if(isvalidate){
	  	$.post('/transcript/addSemesterStudent',obj,function(todo){
 
	  	 	if(todo){
	  	 		window.location.href ="/transcript/studentData/"+obj.StudentId;
	  	 	} else {
          // alert("sdfklbnklbnkl");
          $('#Add_Semester').modal('hide');
          custNotify("danger","خطأ","لقد تم تسجيل هذا الفصل سابقا","warning-sign","bounceIn","bounceOut");
        }
	  	});
  	}
  });


  var path=document.URL;
      var StudentId=path.split('/').pop();
     // alert(StudentId);

  













  // alert($('#std').val());
   $('body').on('click', '#std', function() {
      window.location.href='/transcript/addStudentSubject/'+$(this).val();
   });

	$('#year_teble').hide(0);
	$('body').on('click', '#Semesters', function(){
		$('#year_teble').hide(200);
		$('#Semesters_teble').show(200);
	});

	$('body').on('click', '#Years', function(){
		$('#Semesters_teble').hide(200);
		$('#year_teble').show(200);
	});
  $('body').on('change', '#department_iddepartment', function(){
    var id = $(this).val();
    $('#division_iddivision').empty();
    $.get('/transcript/division/'+id,function(data){
      for(key in data){
          $('#division_iddivision').append("<option value = '"+data[key].id+"'>"+data[key].name+"</option>").selectpicker('refresh');
        }
    });
  });

  $('body').on('change', '#department_iddepartmentEdit', function(){
    var id = $(this).val();
    $('#division_iddivisionEdit').empty();
    $.get('/transcript/division/'+id,function(data){
      for(key in data){
          $('#division_iddivisionEdit').append("<option value = '"+data[key].id+"'>"+data[key].name+"</option>").selectpicker('refresh');
        }
    });
  });
	$("#addSemester").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      DivisionId:{
        required: true,
      },
      DepartmentId:{
        required: true,
      },
      level:{
        required: true,
      },
    },
    messages:{
      DivisionId:{
        required: "الرجاء ادخال اسم الشعبة!",
      },
      DepartmentId:{
        required: "الرجاء اختيار اسم القسم!",
      },
      level:{
        required: "الرجاء اختيار الفصل - السنة!",
      },
    },
    // errorElement: 'label',
    errorClass: 'custom-error',
    errorPlacement: function (error, element) {
      if ($(element).is('select')) {
          element.next().after(error);
      } else {
          error.insertAfter(element);
      }
    },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });

  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });

  $('#search').on('input', function(){

    if($('#search').val().length >=4 || $('#search').val().length ==0) {
      var id = $('#search').val().trim();
      if(id.length==0){
        id="false";
      }
      $('#mytable tbody').empty();
      $.get('/transcript/getsem/'+id,function(data){
        var t ="",year,start,end;
        for(key in data){
          year = new Date(data[key].year);
          start=new Date(data[key].starting_date);
          end=new Date(data[key].ending_date);
        var sem = ' ';
          if(data[key].system_type==1){
            if (data[key].sem_type == 1) {
              var sem = 'ربيع';
            } else if (data[key].sem_type == 2) {
              var sem = 'خريف';
            } else {
              var sem = 'صيف';
            }
            t="فصل";
          }else if(data[key].system_type==2){
            t="سنة";
          }
          $('#tbodysem').append('<tr data-id="#"><td>'+t+' '+sem+'</td>'+
            '<td>'+year.getFullYear()+'</td>'+
            '<td>'+start.getFullYear() +'/'+ (start.getMonth()+1) +'/'+start.getDate() +'</td>'+
            '<td>'+end.getFullYear()+'/'+ (end.getMonth()+1)+'/'+ end.getDate()+'</td>'+
            '<td class="text-center">'+
              '<p data-placement="top" data-toggle="tooltip" title="عرض">'+
                '<button id="addStudentData" href="" role="button" value="'+data[key].id+'" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button>'+
              '</p></td></tr>');
        }
      });
    }
  });
  $('body').on('click', '#Editsem', function(){
    var id = $(this).val();
    $('#student_statusEdit').selectpicker('val' ,$('[data-id ="smst'+id+'"]').data('stut'));
    $('#levelEdit').selectpicker('val' ,$('[data-id ="smst'+id+'"]').data('level'));
    $('#department_iddepartmentEdit').selectpicker('val' ,$('[data-id ="smst'+id+'"]').data('dep'));
    $('#division_iddivisionEdit').empty();
    $.get('/transcript/division/'+$('[data-id ="smst'+id+'"]').data('dep'),function(data){
        for(key in data){
            $('#division_iddivisionEdit').append("<option value = '"+data[key].id+"'>"+data[key].name+"</option>").selectpicker('refresh');
          }
      });
    $('#division_iddivisionEdit').selectpicker('val' ,$('[data-id ="smst'+id+'"]').data('divi'));
    $('#save').val(id);
  });
  $('body').on('click', '#save', function (e) {
      e.preventDefault();
      $('#formSemStu').submit();
  });

  $("#formSemStu").submit(function(e) {
    e.preventDefault();
    var id = $('#save').val();
    $.post("/transcript/updateSemStu/", {body:$("#formSemStu").serializeObject(),id:id}, function(data, error){
      var semesterTy=['الاول','الثاني','الثالث','الرابع','الخامس','السادس','السابع','الثامن','التاسع','العاشر','الحادي العاشر','الثاني عشر'];
      $('[data-id = "smst'+id+'"]').data('stut',$("#formSemStu").serializeObject().student_status);
      $('[data-id = "smst'+id+'"]').data('dep',$("#formSemStu").serializeObject().DepartmentId);
      $('[data-id = "smst'+id+'"]').data('level',$("#formSemStu").serializeObject().level);
      $('[data-id = "smst'+id+'"]').data('divi',$("#formSemStu").serializeObject().DivisionId);
      $('#le'+id).html(semesterTy[($("#formSemStu").serializeObject().level)-1]);
      $('#div'+id).html(data.name);
      $('#edit').modal('hide');
      custNotify("success","نجح","تم التعديل بنجاح","ok-sign","bounceInDown","bounceOutUp");
    });  
  });
  $('body').on('click', '#Delete', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/transcript/deleteSemStu/'+$(this).val(),function(todo){
      switch(todo.msg){
        case "1" :
          custNotify("success","نجح","لقد تم مسح الفصل بنجاح","ok-sign","bounceInDown","bounceOutUp");
          $('[data-id = "smst'+id+'"]').remove();
          break;
        case "2" :
          custNotify("danger","فشل","لايمكن مسح الفصل لوجود كيانات معتمدة عليه","warning-sign","bounceInDown","bounceOutUp");
          break;
        default:
          break; 
      }
    });
  });

});
