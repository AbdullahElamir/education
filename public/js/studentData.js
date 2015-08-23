
$(document).ready(function(){


	
	  $('body').on('click', '#addStudentData', function(){
	  	var obj = {stdId:$('#studentId').val(),departmentId: $('#department_iddepartment').val() ,semesterId :$(this).val() ,devId: $('#division_iddivision').val()} ;
	  	
	  	 $.post('/transcript/objdatastudent',obj,function(todo){
	  	 	if(todo){
	  	 		window.location.href ="/transcript/addStudentSubject";
	  	 	}

	  	 });



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
	
	

});
