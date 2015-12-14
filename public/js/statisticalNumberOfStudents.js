$(document).ready(function(){
  $('body').on('click', '#normal', function(){
    var isvalidate=$("#reportForm").valid();
    if(isvalidate){
    window.location.href='/report/statisticalNumberOfStudents/'+$('#semester').val();
    }
  });
  $("#reportForm").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      semester:{
        required: true,
      }
    },
    messages:{
      semester:{
        required: "الرجاء اختيار السنة الدراسية!",
      }
    },
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
        custNotify("danger","خطأ","الرجاء التأكد من صحة ادخال البيانات","warning-sign","bounceIn","bounceOut");
      }
    },
  });
});