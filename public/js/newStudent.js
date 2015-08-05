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
  $("#newStudent").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
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
    },
    messages:{
      first_name:{
        required: "الرجاء ادخال اسم الطالب/ة!",
      },
      father_name:{
        required: "الرجاء اختيار اسم اﻷب",
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
      $(element).closest('.col-xs-3.col-md-3').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.col-xs-3.col-md-3').removeClass('has-error');
    },
  });
});