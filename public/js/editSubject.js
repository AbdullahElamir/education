$(document).ready(function(){
/*--Start--*/
/*----------------------------------Subject------------------------------------------------*/
  $("#submitEdit").on('click', function(){
    var obj = $('#editSubjectForm').serializeObject();
    var isvalidate=$("#editSubjectForm").valid();
    if(isvalidate){
      $.post('/subject/edit',obj, function(result){
        switch(result.msg){
          case "1" :
            $("#editMain").modal('hide');
            $('#subject_name').html(obj.name);
            $('#subject_name_en').html(obj.name_en);
            $('#subject_code').html(obj.code);
            $('#subject_no_th_unit').html(obj.no_th_unit);
            $('#subject_chapter_degree').html(obj.chapter_degree);
            $('#subject_final_theor').html(obj.final_theor);
            custNotify("success","نجح","لقد تم التعديل بنجاح","ok-sign","bounceInDown","bounceOutUp");
            break;
          case "2" :
            custNotify("danger","فشل","لايمكن تعديل هذه المادة لسبب غير معروف!","warning-sign","bounceInDown","bounceOutUp");
            break;
        }
      });
    }
  });
/*------------when practical toggle changes-------------*/
  $('#toggle-practical').change(function() {
    if ($(this).prop('checked') == true) {
      $('#has_practical').val("2");
      $('#final_theor').val("40");
      $('#final_practical').val("20");
      $('#practical').removeClass('hide');
    }
    else {
      $('#has_practical').val("1");
      $('#final_theor').val("60");
      $('#final_practical').val("0");
      $('#practical').addClass('hide');
    }
  });
/*------------------Prerequisites------------------------------------------------*/
/*------------when select for prereqs changes-------------*/
  $('#prereqs').on('change', function() {
    $("#addPrereq").modal('show');
    $("#addDialog").replaceWith("<p id='addDialog'> هل انت متأكد من إضافة المادة التمهيدية <b>"+$('#prereqs :selected').text()+" ؟</b></p>")
    $("#PrerequisiteId").val($('#prereqs').val());
  });
/*------------actions when save button clicked on add Prereq-------------*/
  $("#prereqsFormAdd").on('click', function(){
    if($('#PrerequisiteId').val()!=$('#SubjectId').val()){
      $.post('/subject/addPrereq',$('#prereqsForm').serializeObject(), function(result){
        switch(result.msg){
          case "1" :
            var tr= "<tr id =pre-"+result.subject.id+" data-name="+result.subject.name+">"+
                      "<td>"+result.subject.name+"</td>"+
                      "<td>"+result.subject.name_en+"</td>"+
                      "<td><p data-placement='top' data-toggle='tooltip' title='إلغاء'>"+
                              "<button id='del' class='btn btn-danger btn-xs deletePrereq' data-title='Delete' data-toggle='modal' data-target='#deletePrereq' value='"+result.subject.id+"'>"+
                                "<span class='glyphicon glyphicon-trash'></span>"+
                              "</button>"+
                            "</p>"+
                      "</td>"+
                    "</tr>";
            $("#addPrereq").modal('hide');
            $('#prereqsTable').prepend(tr);
            custNotify("success","نجح","لقد تمت اضافة مادة التمهيدية بنجاح","ok-sign","bounceInDown","bounceOutUp");
            break;
          case "2" :
            $("#addPrereq").modal('hide');
            custNotify("danger","فشل","لايمكن اضافة مادة تمهيدية مسبقة","warning-sign","bounceInDown","bounceOutUp");
            break;
        }
      });
    } else {
      $("#addPrereq").modal('hide');
      custNotify("danger","فشل","لايمكن اضافة نفس المادة كمادة تمهيدية لنفسها!","warning-sign","bounceInDown","bounceOutUp");
    }
  });
/*------------on deleting a prerequesites-------------*/
  $('body').on('click','.deletePrereq', function() {
    var preId = $(this).val();
    $("#deletePrerequisiteId").val(preId);
    $("#deleteDialog").replaceWith("<p id='deleteDialog'> هل انت متأكد من حذف المادة التمهيدية <b>"+$('#pre-'+preId).data("name")+" ؟</b></p>")
  });
/*------------deleting a prerequesites-------------*/
  $("#prereqsFormDelete").on('click', function(){
    $.post('/subject/deletePrereq',$('#delPrereqsForm').serializeObject(), function(result){
      // $('table#test tr#3').remove();
      switch(result.msg){
        case "1" :
          $("#deletePrereq").modal('hide');
          custNotify("success","نجح","لقد تم إلغاء المادة التمهيدية بنجاح","ok-sign","bounceInDown","bounceOutUp");
          $('#pre-'+$('#deletePrerequisiteId').val()).remove();
          break;
        case "2" :
          custNotify("danger","فشل","لايمكن إلغاء هذه المادة لاتمهيدية لسبب غير معروف!","warning-sign","bounceInDown","bounceOutUp");
        break;
      }
    });
  });

/*--------------------------------Departments------------------------------------------------*/
/*------------when select for departments changes-------------*/
  $('#departments').on('change', function() {
    $("#addDepartments").modal('show');
    $("#departmentAddDialog").replaceWith("<p id='departmentAddDialog'> هل انت متأكد من إضافة هذه المادة لقسم <b>"+$('#departments :selected').text()+" ؟</b></p>")
    $("#DepartmentId").val($('#departments').val());
  });
/*------------actions when save button clicked on add Department-------------*/
  $("#departmentsFormAdd").on('click', function(){
    $.post('/subject/addDepartment',$('#departmentsForm').serializeObject(), function(result){
      switch(result.msg){
        case "1" :
          var tr= "<tr id =dep-"+result.department.id+" data-name="+result.department.name+">"+
                    "<td>"+result.department.name+"</td>"+
                    "<td>"+result.department.name_en+"</td>"+
                    "<td><p data-placement='top' data-toggle='tooltip' title='إلغاء'>"+
                            "<button id='del' class='btn btn-danger btn-xs deleteDepartment' data-title='Delete' data-toggle='modal' data-target='#deleteDepartment' value='"+result.department.id+"'>"+
                              "<span class='glyphicon glyphicon-trash'></span>"+
                            "</button>"+
                          "</p>"+
                    "</td>"+
                  "</tr>";
          $("#addDepartments").modal('hide');
          $('#departmentsTable').prepend(tr);
          custNotify("success","نجح","لقد تم ادراج المادة في قسم جديد","ok-sign","bounceInDown","bounceOutUp");
          break;
        case "2" :
          $("#addDepartments").modal('hide');
          custNotify("danger","فشل","لايمكن ادراج المادة مرتين في نفس القسم","warning-sign","bounceInDown","bounceOutUp");
          break;
      }
    });
  });

/*------------on deleting a department-------------*/
  $('body').on('click','.deleteDepartment', function() {
    var depId = $(this).val();
    $("#deleteDepartmentId").val(depId);
    $("#deleteDeptDialog").replaceWith("<p id='deleteDeptDialog'> هل انت متأكد من إلغاء ادراج هذه المادة من قسم <b>"+$('#dep-'+depId).data("name")+" ؟</b></p>")
  });

/*------------deleting a department-------------*/
  $("#departmentFormDelete").on('click', function(){
    $.post('/subject/deleteDepartment',$('#delDepartmentForm').serializeObject(), function(result){
      // $('table#test tr#3').remove();
      switch(result.msg){
        case "1" :
          $("#deleteDepartment").modal('hide');
          custNotify("success","نجح","لقد تم إلغاء المادة من القسم","ok-sign","bounceInDown","bounceOutUp");
          $('#dep-'+$('#deleteDepartmentId').val()).remove();
          break;
        case "2" :
          custNotify("danger","فشل","لايمكن إلغاء هذه المادة من القسم لسبب غير معروف!","warning-sign","bounceInDown","bounceOutUp");
          break;
      }
    });
  });

/*--------Validation on an editSubject--------*/
  $("#editSubjectForm").validate({
    rules:{
      name:{
        required: true,
      },
      name_en:{
        required: true,
      },
      no_th_unit:{
        required: true,
        number: true,
      },
      code:{
        required: true,
      },
      chapter_degree:{
        required: true,
      },
      final_theor:{
        required: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء أدخال اسم المادة",
      },
      name_en:{
        required: "!Please enter Subject name",
      },
      no_th_unit:{
        required: "الرجاء أدخال عدد الوحدات النظري",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      code:{
        required: "الرجاء أدخال رمز المادة",
      },
      chapter_degree:{
        required: "الرجاء أدخال درجة اعمال السنة",
      },
      final_theor:{
        required: "الرجاء أدخال درجة الامتحان النظري",
      }
    },
    errorClass: 'custom-error',
    errorPlacement: function(error, element) {
      if(element.parent('.input-group').length) {
          error.insertAfter(element.parent());
      }
      if(!(element.parent('.input-group').length)) {
          element.parent().append(error);
      }
    },
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
    invalidHandler: function(event, validator) {
      var errors = validator.numberOfInvalids();
      if (errors) {
        custNotify("danger","خطأ","الرجاء التأكد من صحة ادخال البيانات","warning-sign","bounceIn","bounceOut");
      }
    },
  });

  $('#toggle-practical').change(function() {
    if ($(this).prop('checked') == true) {
      $("#final_practical").rules("add", {
        required: true,
        messages: {
          required: "الرجاء ادخال درجة امتحان العملي!",
        }
      });
    }
    else {
        $("#final_practical").rules( 'remove', 'required' );
      } 
  });

/*--End--*/
});