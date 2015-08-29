$(document).ready(function(){
  //////////////////////
  //////////////////// delete Division
  $('body').on('click', '#Delete', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/division/deleteDivision/'+$(this).val(),function(todo){
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
    $('#DepartmentId').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('departmentid'));
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
      $.post("/division/updateDivision", $("form").serializeObject(), function(data, error){
        if(data.stat !=true){
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
    $.notify({
      message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-ok-sign'></i>&nbsp;<strong>نجح:</strong> تمت إضافة شعبه جديدة بنجاح </p>"
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
    var pageUrl = '/division/'
    window.history.pushState("","",pageUrl);
  }
  $("#formDivision").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      name:{
        required: true,
      },
      name_en:{
        required: true,
      },
      DepartmentId:{
        required: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اسم الشعبة!",
      },
      name_en:{
        required: "!Please enter Division name",
      },
      DepartmentId:{
        required: "الرجاء اختيار اسم القسم!",
      },
    },
    // errorElement: 'label',
    errorClass: 'custom-error',
    errorPlacement: function (error, element) {
      if ($(element).is('select')) {
          element.next().after(error);
      } else {
          error.insertAfter(element);
      }
    },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });
  $('#division_search').on('input', function(){
    if($('#division_search').val().length >=3) {
      alert("you are in ");
      $.get('/division/divisionsearch/'+$('#division_search').val(),function(result){
        alert(result);
        $('#tbody').empty();
        $('.pagination').hide();
        for(key in result){
          console.log(result);
          $('#tbody').append('<tr data-id = "'+result[key].id+'" data-name = "'+result[key].name+'" data-name_en = "'+result[key].name_en+'" data-departmentid='+result[key].DepartmentId+'><td><input class="checkthis" type="checkbox"/></td><td>'+result[key].name+'</td><td class="text-left">'+result[key].Department.name+'</td><td class="text-left">'+result[key].Department.name_en+'</td><td class="text-left">'+result[key].Division.name_en+'</td><td></td><td class="text-center"><p data-placement="top" data-toggle="tooltip" title="تنسيب"><button id="Edit" class="btn btn-primary btn-xs " value="'+result[key].id+'"data-title="Edit" data-nn="'+result[key].id+'" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-screenshot"></span></button></p></td><td class="text-center"><p data-placement="top" data-toggle="tooltip" title="تعديل"><a class="btn btn-primary btn-xs " value="" href="/division/division/'+result[key].id+'" role="button"><span class="glyphicon glyphicon-pencil"></span></button></p></td><td class="text-center"><p data-placement="top" data-toggle="tooltip" title="إلغاء"><button id="Delete" class="btn btn-danger btn-xs" value="'+result[key].id+'"data-title="Delete" data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>');
        }
      });
    }
  });
});