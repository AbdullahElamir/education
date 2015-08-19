$(document).ready(function(){
  //////////////////////
  //////////////////// delete Division
  $('body').on('click', '#Delete', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/deleteDivision/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  });

///////////////////////
  //////////////////////viwe Division
    $('.editDivision').on('click',function(){
    var myDataAttr = $(this).val();
    $('#name').val($('[data-id = "'+myDataAttr+'"]').data('name'));
    $('#name_en').val($('[data-id = "'+myDataAttr+'"]').data('name_en'));
    $('#id').val($('[data-id = "'+myDataAttr+'"]').data('id'));
    $('#DepartmentId').val($('[data-id = "'+myDataAttr+'"]').data('departmentid'));
  });

//////////////////////
///////////////////// update Division
  $('body').on('click', '#save', function (e) {
    e.preventDefault();
    $('#formDivision').submit();
  });

  $("#formDivision").submit(function(e) {
    var isvalidate=$("#formDivision").valid();
    if(isvalidate){
      $.post("/updateDivision", $("form").serializeObject(), function(data, error){
        if(data.stat !=true){
          alert("errormohammed");
        } 
        else {
          if($("#tbody").children().length>=10){
            $("#tbody tr:last-child").remove();
          }
          $('[data-id = "'+$("form").serializeObject().id+'"]').remove();
          $("#tbody").prepend('<tr data-id="'+$("form").serializeObject().id+'">'+
            '<td> <input type="checkbox"></td>'+
            '<td>'+$("form").serializeObject().name+'</td>'+
            '<td>'+data.result[0].name+'</td>'+
            '<td class="text-left">'+data.result[0].name_en+'</td>'+
            '<td class="text-left">'+$("form").serializeObject().name_en+'</td>'+
            '<td></td>'+
            '<td class="text-center">'+
            '<p data-placement="top" data-toggle="tooltip" title="تنسيب">'+
            '<a href=/division/'+$("form").serializeObject().id+' role="button" value="" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-screenshot"></span></a></p></td>'+
            '<td class="text-center">'+
            '<p data-placement="top", data-toggle="tooltip", title="تعديل">'+
            '<button id="Edit" value="'+$("form").serializeObject().id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button></p></td><td class="text-center">'+
            '<p data-placement="top", data-toggle="tooltip", title="إلغاء">'+
            '<button id="Delete" value="'+$("form").serializeObject().id+'" data-title="Delete" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>');
          $('#name').val($("form").serializeObject().name);
          $('#name_en').val($("form").serializeObject().name_en);
          $('#DepartmentId').selectpicker('val' ,$("form").serializeObject().id);////selected in select
          $('#edit').modal('hide');
           $.notify({
            message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-ok-sign'></i>&nbsp;<strong>نجح:</strong> تمت التعديل بنجاح </p>"
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