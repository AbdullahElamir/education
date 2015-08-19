$(document).ready(function(){
  //////////////////////
  //////////////////// delete Users
  $('body').on('click', '#Delete', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/deleteUsers/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  });

///////////////////////
  //////////////////////viwe Users
    $('.editUsers').on('click',function(){
    var myDataAttr = $(this).val();
    $('#name').val($('[data-id = "'+myDataAttr+'"]').data('name'));
    $('#email').val($('[data-id = "'+myDataAttr+'"]').data('email'));
    $('#password').val($('[data-id = "'+myDataAttr+'"]').data('password'));
    $('#phone').val($('[data-id = "'+myDataAttr+'"]').data('phone'));
    $('#id').val($('[data-id = "'+myDataAttr+'"]').data('id'));
  });
});    