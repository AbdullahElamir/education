$(document).ready(function(){
  $('#loginFormLink').click(function(e) {
    $("#loginForm").delay(100).fadeIn(100);
    $("#registerForm").fadeOut(100);
    $('#registerFormLink').removeClass('active');
    $("#forgetForm").fadeOut(100);
    $(this).addClass('active');
    e.preventDefault();
  });
  $('#registerFormLink').click(function(e) {
    $("#registerForm").delay(100).fadeIn(100);
    $("#loginForm").fadeOut(100);
    $('#loginFormLink').removeClass('active');
    $("#forgetForm").fadeOut(100);
    $(this).addClass('active');
    e.preventDefault();
  });
  $('#forgetFormLink').click(function(e) {
    $("#forgetForm").delay(100).fadeIn(100);
    $("#registerForm").fadeOut(100);
    $("#loginForm").fadeOut(100);
    $(this).addClass('active');
    e.preventDefault();
  });
  $("#loginForm").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      username:{
        required: true,
      },
      password:{
        required: true,
      },
    },
    messages:{
      username:{
        required: "الرجاء ادخال اسم المستخدم!",
      },
      password:{
        required: "الرجاء ادخال كلمة المرور!",
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
  $("#registerForm").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      username:{
        required: true,
      },
      email:{
        required: true,
      },
      password:{
        required: true,
      },
      confirmPassword:{
        required: true,
      },
    },
    messages:{
      username:{
        required: "الرجاء ادخال اسم المستخدم!",
      },
      email:{
        required: "الرجاء ادخال البريد الالكتروني!",
      },
      password:{
        required: "الرجاء ادخال كلمة المرور!"
      },
      confirmPassword:{
        required: "الرجاء ادخال كلمة المرور مرة اخرى!",
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
  $("#forgetForm").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      email:{
        required: true,
        email: true,
      },
    },
    messages:{
      email:{
        required: "الرجاء ادخال البريد اﻷكتروني!",
        email: "الرجاء ادخال بريد الكتروني صحيح!",
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
});
