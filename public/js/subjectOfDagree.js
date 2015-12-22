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

      //   $.post("/searchMarriage", $("#search_marriage").serializeObject(), function(data, error){
      //   if(data.stat !=true){
      //     alert("no");
      //   } 
      //   else {
      //    $("#tbody").empty();
      //    for (var i = 0; i < data.result.length; i++) {
      //     date = new Date(data.result[i].Personal.Birth_Date);
      //     var day = date.getDate();
      //     var monthIndex = date.getMonth()+1;
      //     var year = date.getFullYear();
      //     $("#tbody").append('<tr>'+
      //       '<td class="text-center">'+data.result[i].Personal.Arabic_Familyname+' '+data.result[i].Personal.Arabic_Grandfathername+' '+data.result[i].Personal.Arabic_Fathername+' '+data.result[i].Personal.Arabic_Firstname+'</td>'+
      //       '<td class="text-center">'+year+"-"+monthIndex+"-"+day+'</td>'+
      //       '<td class="text-center">'+data.result[i].Kinship.kinship_name+'</td>'+
      //       '<td class="text-center" >'+
      //       '<p data-placement="top", data-toggle="tooltip", title="تحديد">'+
      //       '<input id='+"mariag"+data.result[i].PersonalId+' name="Familidm" type="hidden" value="'+data.result[i].FamilyId+'"></input>'+
      //       '<input id='+"Social"+data.result[i].PersonalId+' name="Socialstatus" type="hidden" value="'+data.result[i].Personal.Socialstatus_Id+'"></input>'+
      //       '<input id='+"Recordnumber"+data.result[i].PersonalId+' name="Recordnumber" type="hidden" value="'+data.result[i].Family.Recordnumber+'"></input>'+
      //       '<input id='+"FamilyRecordDate"+data.result[i].PersonalId+' name="FamilyRecordDate" type="hidden" value="'+data.result[i].Family.FamilyRecordDate+'"></input>'+
      //       '<input id='+"Registrynumber"+data.result[i].PersonalId+' name="Registrynumber" type="hidden" value="'+data.result[i].Family.Registrynumber+'"></input>'+
      //       '<input id='+"maria"+data.result[i].PersonalId+' name="OfficeId" type="hidden" value="'+data.result[i].Family.OfficeId+'"></input>'+
      //       '<input class="radioBtn" id="mariag" type="radio" value="'+data.result[i].PersonalId+'", name="radio_M"></input></p></td>');
      //    };
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