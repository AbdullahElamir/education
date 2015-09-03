$(document).ready(function(){
   
   $('body').on('click', '#downloadSubject', function(){
      window.location.href ="/transcript/studentData/"+$(this).val();
    });

  $('#student_searchbtn').on('click', function(){
    window.location.href="/transcript/Academictranscripts?q="+$('#student_search').val();
  });  

 
  $("#student_search").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 13  )
      {
      $("#student_searchbtn").click(); 
      }
  });


});