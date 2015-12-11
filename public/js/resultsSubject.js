$(document).ready(function(){
  
  // $('body').on('click', '#print', function(){
  //   obj={devId:$("#Division option:selected").val(),department:$("#Department option:selected").text(),dev:$("#Division option:selected").text()};
  //   $.post('/report/setData/',obj,function(result){
  //     var isvalidate=$("#reportFormMember").valid();
  //     if(isvalidate){
  //     window.location.href='/report/facultyMemberReport';
  //   }
  //   });
  // });

$('body').on('change', '#Department', function(){
    var id = $(this).val();
    $('#Division').empty();
    $.get('/transcript/division/'+id,function(data){
      for(key in data){
          $('#Division').append("<option value = '"+data[key].id+"'>"+data[key].name+"</option>").selectpicker('refresh');
        }
    });
  });

  $("#reportsubject").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      Department:{
        required: true,
      },
      Division:{
        required: true,
      },
      semester:{
        required: true,
      },
      level:{
        required: true,
      },
      subject:{
        required:true,
      }
    },
    messages:{
      Department:{
        required: "الرجاء اختيار اسم القسم!",
      },
      Division:{
        required: "الرجاء اختيار اسم الشعبة!",
      },
      semester:{
        required: "الرجاء اختيار السنة الدراسية!",
      },
      level:{
        required: "الرجاء اختيار المستوى!",
      },
      subject:{
        required: "الرجاء اختيار المادة الدراسية!",
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
        custNotify("danger","خطأ","الرجاء التأكد من صحة اختيار البيانات","warning-sign","bounceIn","bounceOut");
      }
    },
  });

  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });








});