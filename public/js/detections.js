$(document).ready(function(){
  $('body').on('change', '#department', function(){
    var id = $(this).val();
    $('#division').empty();
    $.get('/transcript/division/'+id,function(data){
      for(key in data){
          $('#division').append("<option value = '"+data[key].id+"'>"+data[key].name+"</option>").selectpicker('refresh');
        }
    });
  });
  
  $('body').on('click', '#submit', function(){
    window.location.href='/transcript/detection/'+$('#semester').val()+'/'+$('#division').val()+'/'+$('#level').val();
  });

  $('body').on('click', '#submit', function (e) {
    e.preventDefault();
    $('#submit').submit();
  });

  $("#delectionsForm").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      semester:{
        required: true,
      },
      level:{
        required: true,
      },
      department:{
        required: true,
      },
      division:{
        required: true,
      },
    },
    messages:{
      semester:{
        required: "الرجاء اختيار النظام الدراسي!",
      },
      level:{
        required: "الرجاء اختيار المستوى!",
      },
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