$(document).ready(function(){
  $('body').on('click', '#normal', function(){
    var isvalidate=$("#reportForm").valid();
    if(isvalidate){
    window.location.href='/report/statisticalNumberOfStudents/'+$('#semester').val()+'?p=1';
    }
  });
  $('body').on('click', '#csv', function(){
    var isvalidate=$("#reportForm").valid();
    if(isvalidate){
     window.location.href='/report/statisticalNumberOfStudents/'+$('#semester').val()+'?p=2';
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
  var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
      var p=a[i].split('=', 2);
      if (p.length == 1)
        b[p[0]] = "";
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&'));
  
  if(qs["msg"]==1){
    custNotify("danger","خطأ","لا توجد بيانات","ok-sign","bounceInDown","bounceOutUp");
    var pageUrl = '/report/statisticalNumberOfStudents'
    window.history.pushState("","",pageUrl);
  }
});