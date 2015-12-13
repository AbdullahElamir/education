$(document).ready(function(){

  $('body').on('change', '#Department', function(){
    var id = $(this).val();
    $('#Division').empty();
    $.get('/transcript/division/'+id,function(data){
      $('#Division').empty();
      $('#Division').append('<option value="" style="color:grey; display:none;">اختر الشعبة...</option>');
      for(key in data){
          $('#Division').append("<option value = '"+data[key].id+"'>"+data[key].name+"</option>").selectpicker('refresh');
        }
    });
  });
  
  $("#reportFormMember").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      department:{
        required: true,
      },
      division:{
        required: true,
      },
    },
    messages:{
      department:{
        required: "الرجاء اختيار اسم القسم!",
      },
      division:{
        required: "الرجاء اختيار اسم الشعبة!",
      },
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

  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });
  
});