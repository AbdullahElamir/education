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
  $('body').on('click', '#Edit', function(){
      $('#save').val($(this).val());
      alert($('#tbody tr td').val());
      // $('#name').val("name");
      // $('#name_en').val("nameen");
      // $('#department_iddepartment').val("5");
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
          $('#name').val('');
          $('#name_en').val('');
          $('#department_iddepartment').empty();
          if($("#tbody").children().length>=10){
            $("#tbody tr:last-child").remove();
          }
          $("#tbody").prepend('<tr data-id="'+data.result[0].id+'">'+
            '<td> <input type="checkbox"></td>'+
            '<td>'+data.result[0].name+'</td>'+
            '<td>'+data.result[0].id+'</td>'+
            '<td class="text-left">b3</td>'+
            '<td class="text-left">'+data.result[0].name_en+'</td>'+
            '<td></td>'+
            '<td class="text-center">'+
            '<p data-placement="top", data-toggle="tooltip", title="تعديل">'+
            '<button id="Edit" value="'+data.result[0].id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button></p></td><td class="text-center">'+
            '<p data-placement="top", data-toggle="tooltip", title="إلغاء">'+
            '<button id="Delete" value="'+data.result[0].id+'" data-title="Delete" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>');
          $('#edit').modal('hide');
          $.fn.name();
          $.fn.name_en();
          $.notify({
            title: "<strong>Successful:</strong> ",
            message: "Add a new Mahala has successfully"
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
              enter: 'animated flipInY',
              exit: 'animated flipOutX'
               },
          });
        }
      });
    }
    return false;
  });

});