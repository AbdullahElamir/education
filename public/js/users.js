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
    $('#phone').val($('[data-id = "'+myDataAttr+'"]').data('phone'));
    $('#id').val($('[data-id = "'+myDataAttr+'"]').data('id'));
    $('#email1').val($('[data-id = "'+myDataAttr+'"]').data('email'));
  });

$('body').on('click', '#save', function (e) {
    e.preventDefault();
    $('#formUsers').submit();
  });

  $("#formUsers").submit(function(e) {
    var isvalidate=$("#formUsers").valid();
    if(isvalidate){
      $.post("/updateUser", $("form").serializeObject(), function(data, error){
        if(data.stat !=true){
          alert("errormohammed");
        } 
        else {
         // alert($("form").serializeObject().name);
          if($("#tbody").children().length>=10){
            $("#tbody tr:last-child").remove();
          }
          $('[data-id = "'+$("form").serializeObject().id+'"]').remove();
          $("#tbody").prepend('<tr data-id="'+$("form").serializeObject().id+'">'+
            '<td> <input type="checkbox"></td>'+
            '<td>'+$("form").serializeObject().name+'</td>'+
            '<td>'+$("form").serializeObject().email1+'</td>'+
            '<td>'+$("form").serializeObject().phone+'</td>'+
            '<td class="text-center">'+
            '<p data-placement="top", data-toggle="tooltip", title="تعديل">'+
            '<button id="Edit" value="'+$("form").serializeObject().id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs editUsers"><span class="glyphicon glyphicon-pencil"></span></button></p></td><td class="text-center">'+
            '<p data-placement="top", data-toggle="tooltip", title="إلغاء">'+
            '<button id="Delete" value="'+$("form").serializeObject().id+'" data-title="Delete" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>');
          $('#name').val($("form").serializeObject().name);
          $('#phone').val($("form").serializeObject().phone);
          $('#confirm_password').val("");
          $('#password').val("");
          $('#edit').modal('hide');
           $.notify({
            message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-ok-sign'></i>&nbsp;<strong>نجح:</strong> تم التعديل بنجاح </p>"
            },{
            type: 'success',
            allow_dismiss: true,
            showProgressbar: false,
            placement: {
              from: 'top',
              align: 'center'
            },
            mouse_over: null,
            newest_on_top: true,
            animate: {
              enter: 'animated bounceInDown',
              exit: 'animated bounceOutUp'
            },
          });
        }
      });
    }
    return false;
  });    
});    