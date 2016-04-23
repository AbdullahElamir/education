$(document).ready(function(){
  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");
  jQuery.validator.addMethod("arabicLettersWithSpacesOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,ء," "]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!"); 
  jQuery.validator.addMethod("englishLettersWithSpacesOnly", function(value, element) {
    return this.optional(element) || /^[a-z," "]+$/i.test(value);
  }, "الرجاء ادخال حروف انجليزية فقط!"); 
  $("#newStudent ").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    ignore:[],
    rules:{
      first_name:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      father_name:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      grand_name:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      last_name:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      first_name_en:{
        englishLettersWithSpacesOnly: true,
      },
      father_name_en:{
        englishLettersWithSpacesOnly: true,
      },
      grand_name_en:{
        englishLettersWithSpacesOnly: true,
      },
      last_name_en:{
        englishLettersWithSpacesOnly: true,
      },
      mother_name:{
        arabicLettersWithSpacesOnly: true,
      },
      mother_name_en:{
        englishLettersWithSpacesOnly: true,
      },
      place_birth:{
        arabicLettersWithSpacesOnly: true,
      },
      birth_date:{
        number: true,
        range: [1900, 4000],
      },
      no_paper_family:{
        number: true,
      },
      no_reg_family:{
        number: true,
      },
      physical_address:{
        arabicLettersWithSpacesOnly: true,
      },
      father_work_place:{
        arabicLettersWithSpacesOnly: true,
      },
      nid:{
        number: true,
        digits: true,
        rangelength: [12, 12],
      },
      last_cert:{
        arabicLettersWithSpacesOnly: true,
      },
      cust_last_cert:{
        arabicLettersWithSpacesOnly: true,
      },
      place_cert:{
        arabicLettersWithSpacesOnly: true,
      },
      set_number:{
        number: true,
        digits: true,
      },
      student_rate:{
        number: true,
      },
    },
    messages:{
      first_name:{
        required: "الرجاء ادخال اسم الطالب/ة!",
      },
      father_name:{
        required: "الرجاء اختيار اسم اﻷب!",
      },
      grand_name:{
        required: "الرجاء ادخال اسم الجد!",
      },
      last_name:{
        required: "الرجاء ادخال اللقب!",
      },
      birth_date:{
        number: "خطأ سنة الميلاد غير صحيح!",
        range: "الرجاء إدخال قيمة بين عامي 1900 و 4000!",
      },
      no_paper_family:{
        number: "الرجاء ادخال رقم صحيح!",
      },
      no_reg_family:{
        number: "الرجاء ادخال رقم صحيح!",
      },
      nid:{
        number: "الرجاء ادخال ارقام فقط!",
        digits: "الرجاء ادخال ارقام صحيحة فقط!",
        rangelength: "يجب ان يحتوي الرقم الوطني علي 12 رقم فقط!",
      },
      set_number:{
        number: "الرجاء ادخال ارقام فقط!",
        digits: "الرجاء ادخال ارقام صحيحة فقط!",
      },
      student_rate:{
        number: "الرجاء ادخال ارقام فقط!",
      },
    },
    // errorElement: 'label',
    
    errorClass: 'custom-error',
    errorPlacement: function(error, element) {
      if(element.parent('.input-group').length) {
          error.insertAfter(element.parent());
      }
      if(!(element.parent('.input-group').length)) {
          element.parent().append(error);
      }
    },
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
    invalidHandler: function(event, validator) {
      var errors = validator.numberOfInvalids();
      if (errors) {
        custNotify("danger","خطأ","الرجاء التأكد من صحة ادخال البيانات","warning-sign","bounceIn","bounceOut");
      }
    },
  });
  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });
  $(".prevent").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 122 || key == 27 )
      {}
    else
      e.preventDefault();
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
    custNotify("danger","خطأ","رقم القيد موجود مسبقا","ok-sign","bounceInDown","bounceOutUp");
    var pageUrl = '/student/newStudent'
    window.history.pushState("","",pageUrl);
  }
});