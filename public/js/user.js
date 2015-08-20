$(document).ready(function(){
  $("#newUser").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
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
      email:{
        required: true,
        email: true,
      },
      confirmEmail:{
        required: true,
        email: true,
        equalTo: "#email",
      },
      password:{
        required: true,
      },
      confirmPassword:{
        required: true,
        equalTo: "#password",
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
      email:{
        required: "الرجاء ادخال البريد اﻻلكتروني!",
        email: "خطأ:الرجاء ادخال بريد الكتروني صالح",
      },
      confirmEmail:{
        required: "الرجاء اعادة ادخال البريد اﻻلكتروني!",
        email: "خطأ:الرجاء ادخال بريد الكتروني صالح!",
        equalTo: "خطأ:البريد اﻻلكتروني ليس متطابق!",
      },
      password:{
        required: "الرجاء ادخال كلمة المرور!",
      },
      confirmPassword:{
        required: "الرجاء ادخال كلمة المرور مرة اخرى!",
        equalTo: "خطأ:كلمة المرور ليست متطابقة!",
      },
    },
    // errorElement: 'label',
    // errorClass: 'custom-error',
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });
});