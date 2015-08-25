$(document).ready(function(){
  $('#generale_teble').hide(0);
  $('#Division_teble').hide(0);
  $('body').on('click', '#Department_bt', function(){
    $('#generale_teble').hide(200);
    $('#Department_teble').show(200);
    $('#Division_teble').hide(200);
  });
  $('body').on('click', '#generale_bt', function(){
    $('#Department_teble').hide(200);
    $('#Division_teble').hide(200);
    $('#generale_teble').show(200);

  });
  $('body').on('click', '#Division_bt', function(){
    $('#Department_teble').hide(200);
    $('#Division_teble').show(200);
    $('#generale_teble').hide(200);

  });
  
  $('body').on('click', '#adAc', function (e) {
    $('#subG').val($(this).val());
  });

  $('body').on('click', '#submit', function (e) {
    e.preventDefault();
    $('#addForm').submit();
  });

  $("#addForm").submit(function(e) {
    var isvalidate=$("#addForm").valid();

    if(isvalidate){
      $.post("/transcript/addStudentSubject", $("#addForm").serializeObject(), function(data, error){
        // if(data!=null){
        // } 
        // else {
    //       $('[data-id = "'+$("form").serializeObject().id+'"]').remove();
    //       $("#tbody").prepend('<tr data-id="'+$("form").serializeObject().id+'">'+
    //         '<td> <input type="checkbox"></td>'+
    //         '<td>'+$("form").serializeObject().name+'</td>'+
    //         '<td class="text-left">'+$("form").serializeObject().name_en+'</td>'+
    //         '<td></td>'+
    //         '<td class="text-center">'+
    //         '<p data-placement="top", data-toggle="tooltip", title="تعديل">'+
    //         '<button id="Edit" value="'+$("form").serializeObject().id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button></p></td><td class="text-center">'+
    //         '<p data-placement="top", data-toggle="tooltip", title="إلغاء">'+
    //         '<button id="Delete" value="'+$("form").serializeObject().id+'" data-title="Delete" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>');
    //       $('#name').val($("form").serializeObject().name);
    //       $('#name_en').val($("form").serializeObject().name_en);
          $('#add').modal('hide');
           $.notify({
            message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-ok-sign'></i>&nbsp;<strong>نجح:</strong> تم الاضافة بنجاح </p>"
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
        // }
      });
    }
    return false;
  });

  

});