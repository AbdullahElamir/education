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
  $("#newSemester").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      sem_typ:{
        required: true,
      },
      year:{
        required: true,
      },
      current:{
        required: true,
      },
      starting_date:{
        required: true,
      },
      ending_date:{
        required: true,
      },
    },
    messages:{
      sem_typ:{
        required: "الرجاء ادخال الصل الدراسي!",
      },
      year:{
        required: "الرجاء اختيار سنة الفصل الدراسي",
      },
      current:{
        required: "الرجاء الاجابة بنعم أو لا!",
      },
      starting_date:{
        required: "الرجاء اختيار تاريخ البداية",
      },
      ending_date:{
        required: "الرجاء اختيار تاريخ النهاية  ",
      },
    },
    // errorElement: 'span',
    errorClass: 'custom-error',
    errorPlacement: function (error, element) {
      if ($(element).is('select,.datetimepicker')) {
          element.next().after(error);
      } else {
          error.insertAfter(element);
      }
    },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });
});