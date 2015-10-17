$(document).ready(function(){

  $.nat = new Array();
  var dept = [] ; 

  $('body').on('click', '#Deletee', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    console.log(id);
    $('[date-id = "'+id+'"]').remove();
    $.get('/facultyMember/deleteFaculityMembers/'+$(this).val(),function(result){
      switch(result.msg){
        case "1" :
          $('#'+id).remove();
          custNotify("success","نجح","تم حذف هذا المحاضر بنجاح","ok-sign","bounceInDown","bounceOutUp");
          break;
        case "2" :
          $('#delete').modal('hide');
          custNotify("danger","فشل","لايمكن حذف هذا المحاضر  لاعتماد بعض الكيانات عليه","warning-sign","bounceIn","bounceOut");
          break;
      }
    });
  });
  
  $('body').on('click', '#editt',function(){
    $('#id_faculty_Member').val($(this).val());
    var myDataAttr = $(this).val();
    var cdate = $('[data-id = "'+myDataAttr+'"]').data('birth_date')
    var cd = cdate.split(" ");
    $('#birth_date').val(cd[2]+"-"+cd[3]+"-"+cd[1]);
    $('#name').val($('[data-id = "'+myDataAttr+'"]').data('name'));
    $('#qualification').val($('[data-id = "'+myDataAttr+'"]').data('qualification'));
    $('#gender').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('gender'));
    $('#departmentId').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('ddepartmentid'));
    $('#nationality').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('nationality'));
    $('#place_birth').val($('[data-id = "'+myDataAttr+'"]').data('place_birth'));
    $('#physical_address').val($('[data-id = "'+myDataAttr+'"]').data('physical_address'));
    $('#phoneFaculty').val($('[data-id = "'+myDataAttr+'"]').data('phone'));
    $('#specialization').val($('[data-id = "'+myDataAttr+'"]').data('specialization'));
    $.get('/facultyMember/getAllDepartment/',function(todo){
      for (k in todo) {
        dept.push(todo[k]);
      };
    });
  });
  
  $('body').on('click', '.editFacultyMember', function(){
    var myDataAttr = $(this).val();
    $('#editFM').val(myDataAttr);
    $('#editFM').data('idd',$('[data-id = "'+myDataAttr+'"]').data('idd'));
    $('#name_e').val($('[data-id = "'+myDataAttr+'"]').data('name'));
    $('#code_e').val($('[data-id = "'+myDataAttr+'"]').data('code'));
    $('#faculty_Member').selectpicker('val', $('[data-id = "'+myDataAttr+'"]').data('fac'));
    $('#sub_group_n').val($('[data-id = "'+myDataAttr+'"]').data('groupname'));
    $('#quantit').val($('[data-id = "'+myDataAttr+'"]').data('quantity'));
    $('#location').selectpicker('val', $('[data-id = "'+myDataAttr+'"]').data('loc'));
  });

  $('body').on('click', '#editSubGr', function (e) {
    e.preventDefault();
    $('#editForm').submit();
  });


  // $('body').on('click', '.editSub', function(){
  //   var myDataAttr = $(this).val();
  //   $('#editSubGr').val(myDataAttr);
  //   $('#editSubGr').data('idd',$('[data-id = "'+myDataAttr+'"]').data('idd'));
  //   $('#name_e').val($('[data-id = "'+myDataAttr+'"]').data('name'));
  //   $('#code_e').val($('[data-id = "'+myDataAttr+'"]').data('code'));
  //   $('#faculty_Member').selectpicker('val', $('[data-id = "'+myDataAttr+'"]').data('fac'));
  //   $('#sub_group_n').val($('[data-id = "'+myDataAttr+'"]').data('groupname'));
  //   $('#quantit').val($('[data-id = "'+myDataAttr+'"]').data('quantity'));
  //   $('#location').selectpicker('val', $('[data-id = "'+myDataAttr+'"]').data('loc'));
  // });

  // $('body').on('click', '#editSubGr', function (e) {
  //   e.preventDefault();
  //   $('#editForm').submit();
  // });

  

  // $("#editForm").submit(function(e) {
  //   var isvalidate=$("#editForm").valid();
  //   if(isvalidate){
  //     $.post("/semester/updateSub", {body:$("#editForm").serializeObject(),id:$('#editSubGr').val()}, function(data, error){
  //       if(data ==null){
  //         // $("#err").empty();
  //         // for (err in data.result) {
  //         //   $("#err").append('<h1>'+data.result[err].msg+'</h1>');
  //         // }
  //       } 
  //       else {
  //         console.log("gothere");
  //         var subGId = $('#editSubGr').val();
  //         console.log(subGId);
  //         $('#name-'+subGId).html(data.Subject.name);
  //         $('#code-'+subGId).html(data.Subject.code);
  //         $('#Faculty_member-'+subGId).html(data.Faculty_member.name);
  //         $('[data-id = "'+subGId+'"]').data('fac',data.Faculty_member.id);
  //         $('#sub_group_name-'+subGId).html(data.sub_group_name);
  //         $('[data-id = "'+subGId+'"]').data('groupname',data.sub_group_name);
  //         $('#quantity-'+subGId).html(data.quantity);
  //         $('[data-id = "'+subGId+'"]').data('quantity',data.quantity);
  //         $('#Location-'+subGId).html(data.Location.name);
  //         $('[data-id = "'+subGId+'"]').data('loc',data.Location.id);
  //         $('#edit').modal('hide');
  //       }
  //     });
  //   }
  //   return false;
  // });

  $.get('/facultyMember/getAllNationality/',function(todo){
    for (var i = 0; i < todo.length; i++) {
      var k = new Object({id : i,value : todo[i].id, text : todo[i].name});
      $.nat.push(k);
    };
  });

  $('body').on('click', '#save', function (e) {
    e.preventDefault();
    $('#updateFacultyMember').submit();
  });

  $("#updateFacultyMember").submit(function(e) {
    var isvalidate = $("#updateFacultyMember").valid();
    if(isvalidate){
      $.post("/facultyMember/updateFacultyMember", $("#updateFacultyMember").serializeObject(), function(data, error){
        if(data !=true){
        } 
        else {
          if( $("form").serializeObject().gender == 0 ){
              var gender = "ذكر";
            }
            else {
              var gender = "أنثى";
            }
          
          $('[data-id = "'+$("form").serializeObject().id+'"]').remove();
          $("#tbody").prepend('<tr data-id="'+$("form").serializeObject().id+'" data-name="'+$("form").serializeObject().name+'" data-qualification="'+$("form").serializeObject().qualification+'" data-specialization="'+$("form").serializeObject().specialization+'" data-gender="'+$("form").serializeObject().gender+'" data-nationality="'+$("form").serializeObject().nationality+'" data-birth_date="'+$("form").serializeObject().birth_date+'" data-physical_address="'+$("form").serializeObject().physical_address+'" data-phone="'+$("form").serializeObject().phone+'" data-place_birth="'+$("form").serializeObject().place_birth+'">'+
              '<td>'+
                $("form").serializeObject().name+
              '</td>'+
              '<td>'+
                $("form").serializeObject().qualification+
              '</td>'+
              '<td>'+
                $("form").serializeObject().specialization+
              '</td><td>'+
                gender+
              '</td><td>'+
                  dept[$("form").serializeObject().DepartmentId-1].name+
              '</td>'+
              '<td>'+
                $.nat[$("form").serializeObject().nationality-1].text+
              '</td>'+
              '<td class="text-center">'+
                '<p data-placement="top" data-toggle="tooltip" title="تعديل">'+
                  '<button id="editt" value="'+$("form").serializeObject().id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button>'+
                '</p>'+
              '</td>'+
              '<td class="text-center">'+
                '<p data-placement="top" data-toggle="tooltip" title="إلغاء">'+
                  '<button id="Deletee" value="'+$("form").serializeObject().id+'" data-title="Deletee" data-toggle="modal" data-target="#delette" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button>'+
                '</p>'+
              '</td>'+
            '</tr>');
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
  $("#updateFacultyMember").validate({
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
      phoneFaculty:{
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
      phoneFaculty:{
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
      if(key == 13  )
        {
        $("#FacultyMember_search_btn").click(); 
        }
  });

});