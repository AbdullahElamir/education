$(document).ready(function(){
  //////////////////////
  //////////////////// delete Users
  $('body').on('click', '#Delete', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/users/deleteUsers/'+$(this).val(),function(todo){
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
      $.post("/users/updateUser", $("form").serializeObject(), function(data, error){
        if(data.stat !=true){

        } 
        else {
          if($("#tbody").children().length>=10){
            $("#tbody tr:last-child").remove();
          }
          $('[data-id = "'+$("form").serializeObject().id+'"]').remove();
          $("#tbody").prepend('<tr data-id="'+$("form").serializeObject().id+'">'+
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
          custNotify("success","نجح","تم التعديل بنجاح","ok-sign","bounceInDown","bounceOutUp");
        }
      });
    }
    return false;
  });

  $("#formUsers").validate({
    rules:{
      name:{
        required: true,
      },
      phone:{
        required: true,
        number: true,
        maxlength: 14,
        minlength: 10,
      },
      password:{
        required: true,
      },
      newConfirmPassword:{
        required: true,
        equalTo: "#pass",
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اﻷسم!",
      },
      phone:{
        required: "الرجاء ادخال رقم الهاتف!",
        number: "خطأ:يجب ان يحتوي رقم الهاتف علي ارقام صحيحة فقط!",
        maxlength: "يجب ان يحتوي رقم الهاتف علي اﻷكثر 14 رقم",
        minlength: "يجب ان يحتوي رقم الهاتف علي اﻷقل 10 رقم",
      },
      password:{
        required: "الرجاء ادخال كلمة المرور الحالية!",
      },
      newConfirmPassword:{
        required: "الرجاء ادخال كلمة المرور مرة اخري!",
        equalTo: "خطأ:كلمة المرور الجديدة ليست متطابقة!",
      },
    },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
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
    custNotify("success","نجح","تمت إضافة مستخدم جديد بنجاح","ok-sign","bounceInDown","bounceOutUp");
    var pageUrl = '/users'
    window.history.pushState("","",pageUrl);
  }

  // This function to remove and reset "form" from validation and value when close or hide bootstrap modal!
  $('#edit').on('hidden.bs.modal', function(){
    $(this).removeData('bs.modal');
    $('#password, #newPassword, #newConfirmPassword').val("");
    $('#formUsers').validate().resetForm();
  });
});    