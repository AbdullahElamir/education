$(document).ready(function(){
   
   $('body').on('click', '#downloadSubject', function(){
      window.location.href ="/transcript/studentData/"+$(this).val();
    });



});