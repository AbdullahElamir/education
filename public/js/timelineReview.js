$(document).ready(function(){
  $("#timelineReview").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      department:{
        required: true,
      },
      semester:{
        required: true,
      },
    },
    messages:{
      department:{
        required: "الرجاء اختيار اسم القسم!",
      },
      semester:{
        required: "الرجاء اختيار النظام الدراسي!",
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
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
    invalidHandler: function(event, validator) {
      var errors = validator.numberOfInvalids();
      if (errors) {
        $.notify({
          message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-warning-sign'></i>&nbsp;<strong>خطأ:</strong> الرجاء التأكد من صحة اختيار البيانات </p>"
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
            exit: 'animated bounceOut'
          },
        });
      }
    },
  });
  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });
});