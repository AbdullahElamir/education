$(document).ready(function(){
  $('body').on('click', '#Delete', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/credence/deleteCredence/'+$(this).val(),function(todo){
      switch(todo.msg){
        case "1" :
          custNotify("success","نجح","لقد تم المسح بنجاح","ok-sign","bounceInDown","bounceOutUp");
          $('[data-id = "'+id+'"]').remove();
          break;
        default:
          break; 
      }
    });
  });

  $('.editCredence').on('click',function(){
    var myDataAttr = $(this).val();
    $('#name').val($('[data-id = "'+myDataAttr+'"]').data('name'));
    $('#adjective').val($('[data-id = "'+myDataAttr+'"]').data('adjective'));
    $('#id').val($('[data-id = "'+myDataAttr+'"]').data('id'));
  });
 
  $('body').on('click', '#save', function (e) {
    e.preventDefault();
    $('#formCredence').submit();
  });

  $("#formCredence").submit(function(e) {
    var isvalidate=$("#formCredence").valid();
    if(isvalidate){
      $.post("/credence/updateCredence", $("form").serializeObject(), function(data, error){
        if(data.stat !=true){
        } 
        else {
          if($("#tbody").children().length>=10){
            $("#tbody tr:last-child").remove();
          }
          $('[data-id = "'+$("form").serializeObject().id+'"]').remove();
          $("#tbody").prepend('<tr data-id="'+$("form").serializeObject().id+'">'+
            '<td>'+$("form").serializeObject().name+'</td>'+
            '<td>'+$("form").serializeObject().adjective+'</td>'+
            '<td></td>'+
            '<td class="text-center">'+
            '<p data-placement="top", data-toggle="tooltip", title="تعديل">'+
            '<button id="Edit" value="'+$("form").serializeObject().id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button></p></td><td class="text-center">'+
            '<p data-placement="top", data-toggle="tooltip", title="إلغاء">'+
            '<button id="Delete" value="'+$("form").serializeObject().id+'" data-title="Delete" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>');
          $('#name').val($("form").serializeObject().name);
          $('#adjective').val($("form").serializeObject().adjective);
          $('#edit').modal('hide');
          custNotify("success","نجح","تم التعديل بنجاح","ok-sign","bounceInDown","bounceOutUp");
        }
      });
    }
    return false;
  });
  
  $("#formCredence").validate({
    rules:{
      name:{
        required: true,
      },
      adjective:{
        required: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اسم المعتمد!",
      },
      adjective:{
        required: "الرجاء ادخال صفة المعتمد!",
      },
    },
    errorClass: 'custom-error',
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
  });

  var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
      var p=a[i].split('=', 2);
      if (p.length == 1)
        b[p[0]] = "";
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&'));

  if(qs["msg"]==1){
    custNotify("success","نجح","تمت إضافة معتمد جديد بنجاح","ok-sign","bounceInDown","bounceOutUp");
    var pageUrl = '/credence'
    window.history.pushState("","",pageUrl);
  }
  // $('#department_search').on('input', function(){
  //   if($('#department_search').val().length >=3) {
  //     $.get('/department/departmentsearch/'+$('#department_search').val(),function(result){
  //       $('#tbody').empty();
  //       $('.pagination').hide();
  //       for(key in result){
  //         $('#tbody').append('<tr data-id = "'+result[key].id+'" data-name = "'+result[key].name+'" data-name_en = "'+result[key].name_en+'"><td>'+result[key].name+'</td><td class="text-left">'+result[key].name_en+'</td><td></td><td class="text-center"><p data-placement="top" data-toggle="tooltip" title="تعديل"><button id="Edit" class="btn btn-primary btn-xs editDepartment" value="'+result[key].id+'"data-title="Edit" data-nn="'+result[key].id+'" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></spam></button></p></td><td class="text-center"><p data-placement="top" data-toggle="tooltip" title="إلغاء"><button id="Delete" class="btn btn-danger btn-xs" value="'+result[key].id+'"data-title="Delete" data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>');
  //       }
  //     });
  //   }
  // });

  $('#edit').on('hidden.bs.modal', function(){
    $('.form-group').removeClass('has-error');
    $('#formCredence').validate().resetForm();
  });
});