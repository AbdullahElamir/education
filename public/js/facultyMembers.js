$(document).ready(function(){

  $('body').on('click', '#Deletee', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/facultyMember/deleteFaculityMembers/'+$(this).val(),function(result){
      switch(result.msg){
        case "1" :
          $('#id-'+id).remove();
          custNotify("success","نجح","تم حذف هذا المحاضر بنجاح","ok-sign","bounceInDown","bounceOutUp");
          break;
        case "2" :
          $('#delete').modal('hide');
          custNotify("danger","فشل","لايمكن حذف هذا المحاضر  لاعتماد بعض الكيانات عليه","warning-sign","bounceIn","bounceOut");
          break;
      }
    });
  });
  
  $('body').on('click', '.editFacultyMember', function(){
    var myDataAttr = $(this).val();
    var splitBirthDate = $('[data-id = "'+myDataAttr+'"]').data('birth_date');
    var splitted = splitBirthDate.split(" ");
    $('#editFM').val(myDataAttr);
    $('#editFM').data('idd',$('[data-id = "'+myDataAttr+'"]').data('idd'));
    $('#name').val($('[data-id = "'+myDataAttr+'"]').data('name'));
    $('#id').val($('[data-id = "'+myDataAttr+'"]').data('id'));
    $('#qualification').val($('[data-id = "'+myDataAttr+'"]').data('qualification'));
    $('#departmentId').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('ddepartmentid'));
    $('#specialization').val($('[data-id = "'+myDataAttr+'"]').data('specialization'));
    $('#gender').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('gender'));
    $('#nationality').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('nationality'));
    $('#birth_date').val(splitted[3]+"-"+splitted[1]+"-"+splitted[2]);
    $('#place_birth').val($('[data-id = "'+myDataAttr+'"]').data('place_birth'));
    $('#physical_address').val($('[data-id = "'+myDataAttr+'"]').data('physical_address'));
    $('#phoneFaculty').val($('[data-id = "'+myDataAttr+'"]').data('phone'));
  });

  $('body').on('click', '#editFM', function (e) {
    e.preventDefault();
    $('#editFacultyMemberForm').submit();
  });

  $("#editFacultyMemberForm").submit(function(e) {
    var isvalidate=$("#editFacultyMemberForm").valid();
    if(isvalidate){
      $.post("/facultyMember/updateFacultyMember", $("#editFacultyMemberForm").serializeObject(), function(data, nationality, error){
        if(data == null){
          //do something
        } 
        else {
          var facultyMId = $('#id').val();
          $('#name-'+facultyMId).html(data.name);
          $('#qualification-'+facultyMId).html(data.qualification);
          $('#specialization-'+facultyMId).html(data.specialization);
          if(data.gender == 0){
            $('#gender-'+facultyMId).html("ذكر");
          } else {
            $('#gender-'+facultyMId).html("أنثى");
          }
          $('#department-'+facultyMId).html(data.Department.name);
          $('#nationality-'+facultyMId).html(data.nationalityName);

          $('[data-id = "'+facultyMId+'"]').data('name',data.name);
          $('[data-id = "'+facultyMId+'"]').data('qualification',data.qualification);
          $('[data-id = "'+facultyMId+'"]').data('specialization',data.specialization);
          $('[data-id = "'+facultyMId+'"]').data('gender',data.gender);
          $('[data-id = "'+facultyMId+'"]').data('dDepartmentId',data.DepartmentId);
          $('[data-id = "'+facultyMId+'"]').data('nationality',data.nationality);
          // $('[data-id = "'+facultyMId+'"]').data('birth_date',data.birth_date);
          $('[data-id = "'+facultyMId+'"]').data('place_birth',data.place_birth);
          $('[data-id = "'+facultyMId+'"]').data('physical_address',data.physical_address);
          $('[data-id = "'+facultyMId+'"]').data('phone',data.phone);
          $('#edit').modal('hide');
        }
      });
    }
    return false;
  });

  jQuery.validator.addMethod("arabicLettersOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,ء]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  jQuery.validator.addMethod("arabicLettersWithSpacesOnly", function(value, element) {
    return this.optional(element) || /^[أ-ي,ﻻ,ء," "]+$/i.test(value);
  }, "الرجاء ادخال حروف عربية فقط!");

  jQuery.validator.addMethod("englishLettersWithSpacesOnly", function(value, element) {
    return this.optional(element) || /^[a-z," "]+$/i.test(value);
  }, "الرجاء ادخال حروف انجليزية فقط!");

  $("#editFacultyMemberForm").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      name:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      qualification:{
        required: true,
      },
      DepartmentId:{
        required: true,
      },
      specialization:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      gender:{
        required: true,
      },
      nationality:{
        required: true,
      },
      birth_date:{
        required: true,
      },
      place_birth:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      physical_address:{
        required: true,
        arabicLettersWithSpacesOnly: true,
      },
      phone:{
        required: true,
        number: true,
        digits: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اسم المحاضر/ة!",
      },
      qualification:{
        required: "الرجاء ادخال المؤهل العلمي!",
      },
      DepartmentId:{
        required: "الرجاء ادخال اسم القسم!",
      },
      specialization:{
        required: "الرجاء ادخال التخصص!",
      },
      gender:{
        required: "الرجاء اختيار نوع الجنس!",
      },
      nationality:{
        required: "الرجاء اختيار الجنسية!",
      },
      birth_date:{
        required: "الرجاء ادخال تاريخ الميلاد!",
      },
      place_birth:{
        required: "الرجاء ادخال مكان الميلاد",
      },
      physical_address:{
        required: "الرجاء ادخال عنوان اﻹقامة!",
      },
      phone:{
        required: "الرجاء ادخال رقم الهاتف!",
        number: "يجب ان يحتوي رقم الهاتف علي ارقام فقط!",
        digits: "الرجاء ادخال ارقام صحيحة فقط!",
      },
    },
    // errorElement: 'span',
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
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });

  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });

  $(".prevent").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 122 || key == 27 )
      {}
    else
      e.preventDefault();
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
    custNotify("success","نجح","تمت إضافة محاضر/ة جديد بنجاح","ok-sign","bounceInDown","bounceOutUp");
    var pageUrl = '/facultyMember'
    window.history.pushState("","",pageUrl);
  }

  $('#FacultyMember_search_btn').on('click', function(){
    window.location.href="/facultyMember/?q="+$('#FacultyMember_search').val();
  });

  $("#FacultyMember_search").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 13  ) {
      $("#FacultyMember_search_btn").click(); 
    }
  });

});