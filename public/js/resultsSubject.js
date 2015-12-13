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

$('#Division').on('change', function(){
  var idDivision = $(this).val();
  $('#semester').on('change', function(){
    var idSemester = $(this).val();
     $('#level').on('change', function(){
      var idlevel = $(this).val();
      obj={idDivision,idSemester,idlevel};
      $.post('/report/subject/',obj,function(data){
        $('#subject').empty();
        $('#subject').append('<option value="" style="color:grey; display:none;">اختر مادة...</option>');
        for(key in data){
            $('#subject').append("<option value = '"+data[key].Subject.id+"'>"+data[key].Subject.name+"</option>").selectpicker('refresh');
          }
        });
      });
    });
  });

 
$('body').on('click', '#ok', function(){
  obj={devId:$("#Division option:selected").val(),depid:$("#Department option:selected").val(),department:$("#Department option:selected").text(),dev:$("#Division option:selected").text(),level:$("#level option:selected").text(),levelid:$("#level option:selected").val(),sem:$("#semester option:selected").text(),semid:$("#semester option:selected").val(),subname:$("#subject option:selected").text(),subid:$("#subject option:selected").val()};
     console.log(obj);
    $.post('/report/setData/',obj,function(result){
      var isvalidate=$("#formResultsOfStudent").valid();
      if(isvalidate){
        window.location.href='/report/reportresultsOfStudent';
      }
    });
  });

  $("#formResultsOfStudent").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      department:{
        required: true,
      },
      division:{
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
      department:{
        required: "الرجاء اختيار اسم القسم!",
      },
      division:{
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