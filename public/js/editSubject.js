$(document).ready(function(){

/*------------when select changes-------------*/
  $('#prereqs').on('change', function() {
    $("#addPrereq").modal('show');
    $("#addDialog").replaceWith("<p id='addDialog'> هل انت متأكد من اضافد المادة التمهيدية <b>"+$('#prereqs :selected').text()+" ?</b></p>")
    $("#PrerequisiteId").val($('#prereqs').val());
  });

/*------------actions when save button clicked on add Prereq-------------*/
  $("#prereqsFormAdd").on('click', function(){
    $.post('/subject/addPrereq',$('#prereqsForm').serializeObject(), function(result){
      switch(result.msg){
        case "1" :
          var tr= "<tr><td>"+result.subject.name+"</td><td>"+result.subject.name_en+"</td><td><p></p></td></tr>"
          //$('table').prepend('<tr><td>something3</td><td>else here3</td></tr>');

          // tr
          //               td #{prereq.name}
          //               td #{prereq.name_en}
          //               td.text-center
          //                 p(data-placement="top", data-toggle="tooltip", title="إلغاء")
          //                   button#del.btn.btn-danger.btn-xs(data-title="Delete", data-toggle="modal", data-target="#deletePrereq",value="#{prereq.PrerequisiteId}")
          //                     span.glyphicon.glyphicon-trash 
          custNotify("success","نجح","لقد تمت اضافة مادة التمهيدية بنجاح","ok-sign","bounceInDown","bounceOutUp");
          $("#addPrereq").modal('hide');
          break;
        case "2" :
          custNotify("danger","فشل","لايمكن اضافة مادة تمهيدية مسبقة","warning-sign","bounceInDown","bounceOutUp");
          $("#addPrereq").modal('hide');
          break;
      }
    });
  })
});