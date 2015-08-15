$(document).ready(function(){
  // delete faculityMembers
  $('body').on('click', '#Delete', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    alert(id);
    $.get('/deleteFaculityMembers/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  });

});