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
});