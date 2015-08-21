
$(document).ready(function(){
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
