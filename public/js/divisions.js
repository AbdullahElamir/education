$(document).ready(function(){
  // delete Division
  $('body').on('click', '#Delete', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/deleteDivision/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  });


  //edit Division
    $('.editDivision').on('click',function(){
    var myDataAttr = $(this).val();
    console.log(myDataAttr);
    $('#name').val($('[data-id = "'+myDataAttr+'"]').data('name'));
    $('#name_en').val($('[data-id = "'+myDataAttr+'"]').data('name_en'));
    $('#id').val($('[data-id = "'+myDataAttr+'"]').data('id'));
    console.log(myDataAttr);
    $('#DepartmentId').val($('[data-id = "'+myDataAttr+'"]').data('departmentid'));
  });

  $('body').on('click', '#save', function (e) {
    e.preventDefault();
    $('#formDivision').submit();
  });

  $("#formDivision").submit(function(e) {
    var isvalidate=$("#formDivision").valid();
    if(isvalidate){
      $.post("/addDivision", $("form").serializeObject(), function(data, error){
        if(data.stat !=true){
          alert("errormohammed");
        } 
        else {
          // if(data.result[0].id == $("form").serializeObject().DepartmentId)
          //   alert(data.result[0].name);
          if($("#tbody").children().length>=10){
            $("#tbody tr:last-child").remove();
          }
          //$('[data-id = "'+$("form").serializeObject().id+'"]').remove();
          // $("#tbody tr").prependTo(
          //   '<td> <input type="checkbox"></td>'+
          //   '<td>'+$("form").serializeObject().name+'</td>'+
          //   '<td>'+data.result[0].name+'</td>'+
          //   '<td class="text-left">'+data.result[0].name_en+'</td>'+
          //   '<td class="text-left">'+$("form").serializeObject().name_en+'</td>'+
          //   '<td></td>'+
          //   '<td class="text-center">'+
          //   '<p data-placement="top", data-toggle="tooltip", title="تعديل">'+
          //   '<button id="Edit" value="'+$("form").serializeObject().id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button></p></td><td class="text-center">'+
          //   '<p data-placement="top", data-toggle="tooltip", title="إلغاء">'+
          //   '<button id="Delete" value="'+$("form").serializeObject().id+'" data-title="Delete" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
          $($("form").serializeObject().name).html("#alaa");
          $('#edit').modal('hide');
          $.notify({
            title: "<strong>Successful:</strong> ",
            message: "Update Division has successfully"
          // },{
          //   type: 'success',
          //   allow_dismiss: true,
          //   showProgressbar: false,
          //   placement: {
          //     from: 'top',
          //     align: 'center'
          //   },
          //   mouse_over: null,
          //   newest_on_top: true,
          //   animate: {
          //     enter: 'animated flipInY',
          //     exit: 'animated flipOutX'
          //      },
          });
        }
      });
    }
    return false;
  });
});