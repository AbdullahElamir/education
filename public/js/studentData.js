
$(document).ready(function(){
  $('body').on('click', '#addStudentData', function() {
  	var obj = {student_status:$('#student_status').val(),StudentId:$('#studentId').val(),DepartmentId:parseInt($('#department_iddepartment').val()),SemesterId:$(this).val(),DivisionId:$('#division_iddivision').val(),level:$('#level').val()} ;
  	var isvalidate=$("#addSemester").valid();
    if(isvalidate){
	  	$.post('/transcript/addSemesterStudent',obj,function(todo){
	  	 	if(todo){
	  	 		window.location.href ="/transcript/studentData/"+obj.StudentId;
	  	 	}
	  	});
  	}
  });


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
      console.log(data);
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
          if(data[key].system_type==1){
            t="فصل";

          }else if(data[key].system_type==2){
            t="سنة";
          }
          $('#tbodysem').append('<tr data-id="#"><td>'+t+'</td>'+
            '<td>'+year.getFullYear()+'</td>'+
            '<td class="text-nowrap">'+start.getFullYear() +'l / '+ (start.getMonth()+1) +' / '+start.getDate() +'</td>'+
            '<td>'+end.getDate()+'/'+ (end.getMonth()+1)+'/'+ end.getFullYear()+'</td>'+
            '<td class="text-center">'+
              '<p data-placement="top" data-toggle="tooltip" title="عرض">'+
                '<button id="addStudentData" href="" role="button" value="'+data[key].id+'" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button>'+
              '</p></td></tr>');
        }
      });
    }
  });
});
