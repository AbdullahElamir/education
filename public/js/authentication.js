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
  
  if(qs["msg"]==2){
    $.notify({
      message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-warning-sign'></i>&nbsp;<strong>خطأ:</strong> الرجاء التأكد من اسم المستخدم وكلمة المرور </p>"
      },{
      type: 'danger',
      allow_dismiss: true,
      showProgressbar: false,
      placement: {
        from: 'top',
        align: 'center'
      },
      mouse_over: null,
      newest_on_top: true,
      animate: {
        enter: 'animated bounceIn',
        exit: 'animated bounceOut',
      },
    });
    var pageUrl = '/'
    window.history.pushState("","",pageUrl);
  }
});
