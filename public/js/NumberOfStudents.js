$(document).ready(function(){
  
  $('body').on('click', '#normal', function(){
    obj={type:$('#semType').val(),semester:$("#semester option:selected").text()}
    $.post('/report/setData2/',obj,function(todo){
      var isvalidate=$("#reportForm").valid();
      if(isvalidate){
      window.location.href='/report/statisticalNumberOfStudentsNot';
      }
    });
  });

  $('body').on('click', '#test', function(){
    obj={devId:$("#division option:selected").val(),semType:$("#semType option:selected").val(),courseName:$("#course option:selected").text(),courseId:$("#course option:selected").val(),semester:$("#semester option:selected").text(),level:$("#level option:selected").val(),department:$("#department option:selected").text(),dev:$("#division option:selected").text()};
    $.post('/report/setData/',obj,function(todo){
      var isvalidate=$("#reportForm").valid();
      if(isvalidate){
      window.location.href='/report/PresenceAbsenceLectures';
    }
    });
  });

  $("#reportForm").validate({
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
      course:{
        required:true,
      },
      semType:{
        required:true,
      },
    },
    messages:{
      semester:{
        required: "الرجاء اختيار السنة الدراسية!",
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
      course:{
        required: "الرجاء اختيار اسم المــادة!",
      },
      semType:{
        required: "الرجاء اختيار الفصل الدراسي!",
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

  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });








});