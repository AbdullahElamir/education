$(document).ready(function(){
  $("#newCredence").validate({
    rules:{
      name:{
        required: true,
      },
      adjective:{
        required: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اسم المعتمد!",
      },
      adjective:{
        required: "الرجاء ادخال صفة المعتمد!",
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
        custNotify("danger","خطأ","الرجاء التأكد من صحة ادخال البيانات","warning-sign","bounceIn","bounceOut");
      }
    },
  });
});