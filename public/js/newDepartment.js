$(document).ready(function(){
  $("#newDepartment").validate({
    rules:{
      name:{
        required: true,
      },
      name_en:{
        required: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اسم القسم!",
      },
      name_en:{
        required: "!Please enter Department name",
      },
    },
    errorClass: 'custom-error',
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error');
      // $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
      // $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
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
// // $('#newDepartment input, #newDepartment button').on('click', checkForm);
// //     function checkForm() {
// //       $("button").prop("disabled", !($('#newDepartment input').valid()));
// //     }
// // });