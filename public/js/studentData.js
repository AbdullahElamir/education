$(document).ready(function(){
  $('body').on('click', '#addStudentData', function() {
  	var obj = {student_status:$('#student_status').val(),StudentId:$('#studentId').val(),DepartmentId:parseInt($('#department_iddepartment').val()),SemesterId:$(this).val(),DivisionId:$('#division_iddivision').val()} ;
  	var isvalidate=$("#addSemester").valid();
    if(isvalidate){
	  	$.post('/transcript/addSemesterStudent',obj,function(todo){
	  	 	if(todo){
	  	 		window.location.href ="/transcript/studentData/"+obj.StudentId;
	  	 	}
	  	});
  	}
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

	$("#addSemester").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      DivisionId:{
        required: true,
      },
      DepartmentId:{
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
});
