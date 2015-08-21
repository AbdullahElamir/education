$(document).ready(function(){
  $("#newLocation").validate({
    rules:{
      name:{
        required: true,
      },
      quantity:{
        required: true,
        number: true,
        digits: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اسم القاعة!",
      },
      quantity:{
        required: "الرجاء ادخال كمية استعاب الطلبة!",
        number: "الرجاء ادخال ارقام فقط!",
        digits: "الررجاء ادخال ارقام صحيحة!",
      },
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
          message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-warning-sign'></i>&nbsp;<strong>خطأ:</strong> الرجاء التأكد من صحة ادخال البيانات </p>"
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
});