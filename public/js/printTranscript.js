$(document).ready(function(){

  $('body').on('click', '#arabic', function() {
    // select the student by id 
    var idstudent=$(this).val();
    $.post('/transcript/select_student/',{id:$(this).val()},function(result){
     var id=result.status;
      if(id!==0){
        window.location.href="/transcript/arabicTranscript/"+idstudent;
      } else {
        custNotify("danger","خطأ","عفوا لايمكنك سحب كشف الدرجات هذا الطالب لم يتخرج بعد او يصل الي الفصل السادس","ok-sign","bounceIn","bounceOut");
      }
    });
  });


  
   


$('body').on('click', '#arabCertifcate', function() {
    // select the student by id 
    var idstudent=$(this).val();
    $.post('/transcript/select_student/',{id:$(this).val()},function(result){
     var id=result.status;
      if(id!==0){
        window.location.href="/transcript/arabicTranscript/"+idstudent;
      } else {
        custNotify("danger","خطأ","عفوا لايمكنك سحب كشف الدرجات هذا الطالب لم يتخرج بعد او يصل الي الفصل السادس","ok-sign","bounceIn","bounceOut");
      }
    });
  });
   

$('body').on('click', '#engCertifcate', function() {
    // select the student by id 
    var idstudent=$(this).val();
    $.post('/transcript/select_student/',{id:$(this).val()},function(result){
     var id=result.status;
      if(id!==0){
        window.location.href="/transcript/arabicTranscript/"+idstudent;
      } else {
        custNotify("danger","خطأ","عفوا لايمكنك سحب كشف الدرجات هذا الطالب لم يتخرج بعد او يصل الي الفصل السادس","ok-sign","bounceIn","bounceOut");
      }
    });
  });
   

$('body').on('click', '#englishTranscript', function() {
    // select the student by id 
    var idstudent=$(this).val();
    $.post('/transcript/select_student/',{id:$(this).val()},function(result){
     var id=result.status;
      if(id!==0){
        window.location.href="/transcript/arabicTranscript/"+idstudent;
      } else {
        custNotify("danger","خطأ","عفوا لايمكنك سحب كشف الدرجات هذا الطالب لم يتخرج بعد او يصل الي الفصل السادس","ok-sign","bounceIn","bounceOut");
      }
    });
  });
  












  $('#student_searchbtn').on('click', function(){
    window.location.href="/transcript?q="+$('#student_search').val()+"&first_name="+$('#first_name').val()+"&father_name="+$('#father_name').val()+"&last_name="+$('#last_name').val(); 
  });
  $("#student_search").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 13  )
      {
      $("#student_searchbtn").click(); 
      }
  });
  $("#first_name").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 13  )
      {
      $("#student_searchbtn").click(); 
      }
  });
  $("#father_name").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 13  )
      {
      $("#student_searchbtn").click(); 
      }
  });
  $("#last_name").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 13  )
      {
      $("#student_searchbtn").click(); 
      }
  });

  if($getMsg["msg"]==3){
    custNotify("danger","خطأ","هذا الطالب حديث التسجيل في المعهد ولم يتم تسجيل تخصصه ولم يتم فتح فصل دراسي له","ok-sign","bounceIn","bounceOut");
    replaceUrl('/transcript'); 
  }

});