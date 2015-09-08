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
  $("#updateStudent ").validate({
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
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      mother_name_en:{
        englishLettersWithSpacesOnly: true,
      },
      place_birth:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      birth_date:{
        required: true,
        number: true,
        range: [1900, 4000],
      },
      nationality:{
        required: true,
      },
      gender:{
        required: true,
      },
      no_paper_family:{
        required: true,
        number: true,
      },
      no_reg_family:{
        required: true,
        number: true,
      },
      physical_address:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      civil_reg:{
        required: true,
      },
      phone:{
        required: true,
      },
      father_work_place:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      nid:{
        required: true,
        number: true,
        digits: true,
        rangelength: [12, 12],
      },
      last_cert:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      cust_last_cert:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      date_cert:{
        required: true,
      },
      place_cert:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      set_number:{
        required: true,
        number: true,
        digits: true,
      },
      student_rate:{
        required: true,
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
      mother_name:{
        required: "الرجاء ادخال اسم اﻷم!",
      },
      place_birth:{
        required: "الرجاء ادخال مكان الميلاد!",
      },
      birth_date:{
        required: "الرجاء ادخال سنة الميلاد!",
        number: "خطأ سنة الميلاد غير صحيح!",
        range: "الرجاء إدخال قيمة بين عامي 1900 و 4000!",
      },
      nationality:{
        required: "الرجاء اختيار الجنسية!",
      },
      gender:{
        required: "الرجاء اختيرا نوع الجنس!",
      },
      no_paper_family:{
        required: "الرجاء ادخال رقم ورقة العائلة!",
        number: "الرجاء ادخال رقم صحيح!",
      },
      no_reg_family:{
        required: "الرجاء ادخال رقم قيد العائلة!",
        number: "الرجاء ادخال رقم صحيح!",
      },
      physical_address:{
        required: "الرجاء ادخال عنوان الاقامة!",
      },
      civil_reg:{
        required: "الرجاء ادخال السجل المدني!",
      },
      phone:{
        required: "الرجاء ادخال رقم الهاتف!",
      },
      father_work_place:{
        required: "الرجاء ادخال مكان عمل اﻷب!",
      },
      nid:{
        required: "الرجاء ادخال الرقم الوطني!",
        number: "الرجاء ادخال ارقام فقط!",
        digits: "الرجاء ادخال ارقام صحيحة فقط!",
        rangelength: "يجب ان يحتوي الرقم الوطني علي 12 رقم فقط!",
      },
      last_cert:{
        required: "الرجاء ادخال اخر شهادة!",
      },
      cust_last_cert:{
        required: "الرجاء ادخال تخصيص اخر شهادة!",
      },
      date_cert:{
        required: "الرجاء ادخال تاريخ الحصول علي الشهادة!",
      },
      place_cert:{
        required: "الرجاء ادخال مكان الحصول علي الشهادة!",
      },
      set_number:{
        required: "الرجاء ادخال رقم القيد!",
        number: "الرجاء ادخال ارقام فقط!",
        digits: "الرجاء ادخال ارقام صحيحة فقط!",
      },
      student_rate:{
        required: "الرجاء ادخال معدل الطالب/ة!",
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
  });
  $("form").on('submit', function () {
    var isValid = $(this).valid();
    if (this.hasChildNodes('.nav.nav-tabs')) {
      var validator = $(this).validate();
      $(this).find("input").each(function () {
        if (!validator.element(this)) {
          isValid = false;
          $('a[href=#' + $(this).closest('.tab-pane:not(.active)').attr('id') + ']').tab('show');
          return false;
        }
      });
    }
    if (isValid) {
      // do stuff
    }
  });
  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });

  $('#student_searchbtn').on('click', function(){
    window.location.href="/student?q="+$('#student_search').val()+"&first_name="+$('#first_name').val()+"&father_name="+$('#father_name').val()+"&last_name="+$('#last_name').val();
  });  

 
  $("#student_search").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 13  )
      {
      $("#student_searchbtn").click(); 
      }
  });
  $("#first_name").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 13  )
      {
      $("#student_searchbtn").click(); 
      }
  });
  $("#father_name").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 13  )
      {
      $("#student_searchbtn").click(); 
      }
  });
  $("#last_name").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 13  )
      {
      $("#student_searchbtn").click(); 
      }
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
    custNotify("success","نجح","تمت تسجيل طالب/ة جديد بنجاح","ok-sign","bounceInDown","bounceOutUp");
    var pageUrl = '/student'
    window.history.pushState("","",pageUrl);
  }
});