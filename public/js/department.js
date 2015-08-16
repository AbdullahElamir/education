$(document).ready(function(){

  $('body').on('click', '#Edit', function(){
    $('#save').val($(this).val());
    var id = $(this).val();
    $.get('/editDepartments/'+id,function(department){
      $('#id_dep').val(id);
      $('#a').val(department[0].name);
      $('#b').val(department[0].name_en);

    });
  });

  $('body').on('click', '#Delete', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/deleteDepartment/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  });
});