$(document).ready(function(){
  $('#generale_teble').hide(0);
  $('body').on('click', '#Department_bt', function(){
    $('#generale_teble').hide(200);
    $('#Department_teble').show(200);
  });
  $('body').on('click', '#generale_bt', function(){
    $('#Department_teble').hide(200);
    $('#generale_teble').show(200);

  });
  
  
  

});