$(document).ready(function(){
  $("#newUser").validate({
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
        remote:{
        url: "/users/checkUser",
        type: "post",
        data: {
            email : function(){
              return $("#email").val();
            }
          }
        }
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
      email:{
        required: "الرجاء ادخال البريد اﻻلكتروني!",
        email: "خطأ:الرجاء ادخال بريد الكتروني صالح",
        remote: "عفوا لقد تم التسجيل بهذا الإيميل مسبقا"
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
    invalidHandler: function(event, validator) {
      var errors = validator.numberOfInvalids();
      if (errors) {
        custNotify("danger","خطأ","الرجاء التأكد من صحة ادخال البيانات","warning-sign","bounceIn","bounceOut");
      }
    },
 });
});