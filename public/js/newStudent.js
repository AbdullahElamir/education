$(document).ready(function(){
  // $.notify({
  //   message: "<p class='font text-center'><strong>نجح:</strong> تمت إضافة قسم جديد بنجاح </p>"
  // },{
  //   type: 'success',
  //   allow_dismiss: true,
  //   showProgressbar: false,
  //   placement: {
  //     from: 'top',
  //     align: 'center'
  //   },
  //   mouse_over: null,
  //   newest_on_top: true,
  //   animate: {
  //     enter: 'animated flipInY',
  //     exit: 'animated flipOutX'
  //   },
  // });
  $("#newStudent ,#updateStudent").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    ignore:[],
    rules:{
      first_name:{
        required: true,
      },
      father_name:{
        required: true,
      },
      grand_name:{
        required: true,
      },
      last_name:{
        required: true,
      },
      mother_name:{
        required: true,
      },
      place_birth:{
        required: true,
      },
      birth_date:{
        required: true,
        number: true,
        // rangelength: [1990, 2010],
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
      },
      civil_reg:{
        required: true,
      },
      phone:{
        required: true,
      },
      father_work_place:{
        required: true,
      },
      nid:{
        required: true,
      },
      last_cert:{
        required: true,
      },
      cust_last_cert:{
        required: true,
      },
      date_cert:{
        required: true,
      },
      place_cert:{
        required: true,
      },
      set_number:{
        required: true,
      },
      student_rate:{
        required: true,
      },
    },
    messages:{
      first_name:{
        required: "الرجاء ادخال اسم الطالب/ة!",
      },
      father_name:{
        required: "الرجاء اختيار اسم اﻷب",
      },
      grand_name:{
        required: "الرجاء ادخال اسم الجد",
      },
      last_name:{
        required: "الرجاء ادخال اللقب",
      },
      mother_name:{
        required: "الرجاء ادخال اسم اﻷم",
      },
      place_birth:{
        required: "الرجاء ادخال مكان الميلاد",
      },
      birth_date:{
        required: "الرجاء ادخال سنة الميلاد",
        number: "خطأ سنة الميلاد غير صحيح",
        // rangelength: [1990, 2010],
      },
      nationality:{
        required: "الرجاء اختيار الجنسية",
      },
      gender:{
        required: "الرجاء اختيرا نوع الجنس",
      },
      no_paper_family:{
        required: "الرجاء ادخال رقم ورقة العائلة",
        number: "الرجاء ادخال رقم صحيح",
      },
      no_reg_family:{
        required: "الرجاء ادخال رقم قيد العائلة",
        number: "الرجاء ادخال رقم صحيح",
      },
      physical_address:{
        required: "الرجاء ادخال عنوان الاقامة",
      },
      civil_reg:{
        required: "الرجاء ادخال السجل المدني",
      },
      phone:{
        required: "الرجاء ادخال رقم الهاتف",
      },
      father_work_place:{
        required: "الرجاء ادخال مكان عمل اﻷب",
      },
      nid:{
        required: "الرجاء ادخال الرقم الوطني",
      },
      last_cert:{
        required: "الرجاء ادخال اخر شهادة",
      },
      cust_last_cert:{
        required: "الرجاء ادخال تخصيص اخر شهادة",
      },
      date_cert:{
        required: "الرجاء ادخال تاريخ الحصول علي الشهادة",
      },
      place_cert:{
        required: "الرجاء ادخال مكان الحصول علي الشهادة",
      },
      set_number:{
        required: "الرجاء ادخال رقم الجلوس",
      },
      student_rate:{
        required: "الرجاء ادخال معدل الطالب/ة",
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
});