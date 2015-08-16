$(document).ready(function(){
  $('[id^="department_select"]').hide(0);
  $('[id^="radio"]').change(function() 
  {
    $('[id^="department_select"]').show(200);
  })
  $('#js_radio').change(function() 
  {
    $('[id^="department_select"]').hide(200);
  })
  $("#Semesters").show(0); 
  $("#Year").hide(0);
  $('#toggle-subject').change(function() {
    var toggle ;
    if ($(this).prop('checked') == true) {
      toggle = 1;
    }
    else {
      toggle = 0;
    }
    alert(toggle);
    $('body').on('click', '#del', function(){
      $('#ok').val($(this).val());
    });
    $('body').on('click','#ok', function(){
      var id=$(this).val();
      $.get('/deleteSubject/'+$(this).val(),function(todo){
        $('[data-id = "'+id+'"]').remove();
      });
    });
  });      
});
