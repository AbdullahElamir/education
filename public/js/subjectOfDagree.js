$(document).ready(function(){
 
$('body').on('change', '#Department', function(){
    var id = $(this).val();
    $('#Division').empty();
    $.get('/subjectOfDagree/division/'+id,function(data){
      $('#Division').empty();
      $('#Division').append('<option value="" style="color:grey; display:none;">اختر الشعبة...</option>');
      for(key in data){
          $('#Division').append("<option value = '"+data[key].id+"'>"+data[key].name+"</option>").selectpicker('refresh');
        }
    });
  });

$('#Division').on('change', function(){
  var idDivision = $(this).val();
  $('#Semester').on('change', function(){
    var idSemester = $(this).val();
      obj={idDivision,idSemester};
      $.post('/subjectOfDagree/subject/',obj,function(data){
        $('#Subject').empty();
        $('#Subject').append('<option value="" style="color:grey; display:none;">اختر مادة...</option>');
        for(key in data){
            $('#Subject').append("<option value = '"+data[key].Subject.id+"'>"+data[key].Subject.name+"</option>").selectpicker('refresh');
          }
        });
    });
  });

$('#Division').on('change', function(){
  var idDivision = $(this).val();
  $('#Semester').on('change', function(){
    var idSemester = $(this).val();
      $('#Subject').on('change', function(){
        var idSubject = $(this).val();
         obj={idDivision,idSemester,idSubject};
      //   $.post("/link", obj, function(data, error){
      //   if(data.stat !=true){
      //     alert("no");
      //   } 
      //   else {
          $("#tbody").empty();
      //    for (var i = 0; i < data.result.length; i++) {
          $("#tbody").append('<tr>'+
            '<td class="text-center">name</td>'+
            '<td class="text-center">id</td>'+
            '<td class="text-center"><input style="width:100px;" type="text" value="", name="sum"></input></td>'+
            '</td>');
         // };
      //   }
      // });
    });
  });
});


  // $("#formResultsOfStudent").validate({
  //   ignore: ':not(select:hidden, input:visible, textarea:visible)',
  //   rules:{
  //     department:{
  //       required: true,
  //     },
  //     division:{
  //       required: true,
  //     },
  //     semester:{
  //       required: true,
  //     },
  //     level:{
  //       required: true,
  //     },
  //     subject:{
  //       required:true,
  //     }
  //   },
  //   messages:{
  //     department:{
  //       required: "الرجاء اختيار اسم القسم!",
  //     },
  //     division:{
  //       required: "الرجاء اختيار اسم الشعبة!",
  //     },
  //     semester:{
  //       required: "الرجاء اختيار السنة الدراسية!",
  //     },
  //     level:{
  //       required: "الرجاء اختيار المستوى!",
  //     },
  //     subject:{
  //       required: "الرجاء اختيار المادة الدراسية!",
  //     }
  //   },
  //   errorClass: 'custom-error',
  //   errorPlacement: function (error, element) {
  //     if ($(element).is('select')) {
  //         element.next().after(error);
  //     } else {
  //         error.insertAfter(element);
  //     }
  //   },
  //   highlight: function(element) {
  //     $(element).closest('.row').addClass('has-error');
  //   },
  //   unhighlight: function(element) {
  //     $(element).closest('.row').removeClass('has-error');
  //   },
  //   invalidHandler: function(event, validator) {
  //     var errors = validator.numberOfInvalids();
  //     if (errors) {
  //       custNotify("danger","خطأ","الرجاء التأكد من صحة اختيار البيانات","warning-sign","bounceIn","bounceOut");
  //     }
  //   },
  // });

  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });


});