$(document).ready(function(){
  $('body').append('<div id="toTop" class="btn btn-info"><span class="glyphicon glyphicon-chevron-up"></span></div>');
  $(window).scroll(function () {
    if ($(this).scrollTop() != 0) {
      $('#toTop').fadeIn();
    } 
    else {
      $('#toTop').fadeOut();
    }
  }); 
  $('#toTop').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
  // $("#editeUser").validate({
  //   rules:{
  //     name:{
  //       required: true,
  //     },
  //     phone:{
  //       required: true,
  //       number: true,
  //       maxlength: 14,
  //       minlength: 10,
  //     },
  //     password:{
  //       required: true,
  //     },
  //     newConfirmPassword:{
  //       equalTo: "#newPassword",
  //     },
  //   },
  //   messages:{
  //     name:{
  //       required: "الرجاء ادخال اﻷسم!",
  //     },
  //     phone:{
  //       required: "الرجاء ادخال رقم الهاتف!",
  //       number: "خطأ:يجب ان يحتوي رقم الهاتف علي ارقام صحيحة فقط!",
  //       maxlength: "يجب ان يحتوي رقم الهاتف علي اﻷكثر 14 رقم",
  //       minlength: "يجب ان يحتوي رقم الهاتف علي اﻷقل 10 رقم",
  //     },
  //     password:{
  //       required: "الرجاء ادخال كلمة المرور الحالية!",
  //     },
  //     newConfirmPassword:{
  //       equalTo: "خطأ:كلمة المرور الجديدة ليست متطابقة!",
  //     },
  //   },
  //   // errorElement: 'label',
  //   // errorClass: 'custom-error',
  //   highlight: function(element) {
  //     $(element).closest('.row').addClass('has-error');
  //   },
  //   unhighlight: function(element) {
  //     $(element).closest('.row').removeClass('has-error');
  //   },
  // });
});