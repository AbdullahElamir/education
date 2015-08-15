$(document).ready(function(){


       $('body').on('click', '#del', function(){
       $('#ok').val($(this).val());
  });

  $('body').on('click','#ok', function(){
    var id=$(this).val();
    $.get('/deleteSubject/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  });




  $('[id^="department_select"]').hide(0);
  $('[id^="radio"]').change(function() 
  {
    $('[id^="department_select"]').show(200);
    $('[id^="department_radio"]').hide(200);
  })
  $("#Semesters").show(0); 
  $("#Year").hide(0);
  $('#toggle-subject').change(function() {
    if ($(this).prop('checked') == true) {
      $("#Semesters").hide(200);
      $("#Year").show(200);
    }
    else {
      $("#Semesters").show(200); 
      $("#Year").hide(200);
    }
  });      
});
