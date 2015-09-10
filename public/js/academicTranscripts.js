$(document).ready(function(){
   
   $('body').on('click', '#downloadSubject', function(re){
      window.location.href ="/transcript/studentData/"+$(this).val();
    });

  $('#student_searchbtn').on('click', function(){
    window.location.href="/transcript/Academictranscripts?q="+$('#student_search').val()+"&first_name="+$('#first_name').val()+"&father_name="+$('#father_name').val()+"&last_name="+$('#last_name').val();
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


});