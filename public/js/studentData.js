
$(document).ready(function(){

	  $('body').on('click', '#addStudentData', function(){
	  	var obj = {student_status:$('#student_status').val(),StudentId:$('#studentId').val(),DepartmentId:parseInt($('#department_iddepartment').val()),SemesterId:$(this).val(),DivisionId:$('#division_iddivision').val()} ;
	  	 $.post('/transcript/addSemesterStudent',obj,function(todo){
	  	 	if(todo){
	  	 		window.location.href ="/transcript/studentData/"+obj.StudentId;
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
