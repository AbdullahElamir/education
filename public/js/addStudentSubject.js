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
  
  $('body').on('click', '#viw', function (e) {
    $('#upres').val($(this).val());
    $('#chapter_degree').val($('[data-id = "'+$(this).val()+'"]').data('deg'));
    $('#final_exam').val($('[data-id = "'+$(this).val()+'"]').data('fin'));
    
  });
  $('body').on('click', '#del', function (e) {
    $('#ok').val($(this).val());
  });
  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/transcript/deletetranscript/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
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
        $("#Acbody").prepend('<tr data-id="'+data.id+'" data-deg="'+data.chapter_degree+'" data-fin="'+data.final_exam+'">'+
          '<td>'+data.Sub_group.Subject.name+'</td>'+
          '<td>'+data.Sub_group.Subject.name_en+'</td>'+
          '<td>'+data.Sub_group.Subject.code+'</td>'+
          '<td>'+data.Sub_group.sub_group_name+'</td>'+
          '<td class="text-center">'+
            '<p data-placement="top" data-toggle="tooltip" title="تعديل">'+
              '<button id="viw" value="'+data.id+'" data-title="تعديل" data-toggle="modal" data-target="#Show_Semester" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button>'+
            '</p></td><td class="text-center">'+
            '<p data-placement="top" data-toggle="tooltip" title="حذف">'+
              '<button id="del" value="'+data.id+'" data-title="حذف" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>');
          
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
      });
    }
    return false;
  });




  $('body').on('click', '#upres', function (e) {
    e.preventDefault();
    $('#updateG').submit();
  });

  $("#updateG").submit(function(e) {
    var isvalidate=$("#updateG").valid();

    if(isvalidate){
      $.post("/transcript/updateG", {body:$("#updateG").serializeObject(),id:$('#upres').val()}, function(data, error){
          $('[data-id = "'+$('#upres').val()+'"]').remove();
          $("#Acbody").prepend('<tr data-id="'+data.id+'" data-deg="'+data.chapter_degree+'" data-fin="'+data.final_exam+'">'+
                  '<td>'+data.Sub_group.Subject.name+'</td>'+
                  '<td>'+data.Sub_group.Subject.name_en+'</td>'+
                  '<td>'+data.Sub_group.Subject.code+'</td>'+
                  '<td>'+data.Sub_group.sub_group_name+'</td>'+
                  '<td class="text-center">'+
                    '<p data-placement="top" data-toggle="tooltip" title="تعديل">'+
                      '<button id="viw" value="'+data.id+'" data-title="تعديل" data-toggle="modal" data-target="#Show_Semester" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button>'+
                    '</p></td><td class="text-center">'+
                    '<p data-placement="top" data-toggle="tooltip" title="حذف">'+
                      '<button id="del" value="'+data.id+'" data-title="حذف" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>');
          $('#Show_Semester').modal('hide');
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
      });
    }
    return false;
  });
  

});