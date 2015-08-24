$(document).ready(function(){
  // delete faculityMembers
  $('body').on('click', '#Deletee', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/facultyMember/deleteFaculityMembers/'+$(this).val(),function(todo){
      $('[date-id = "'+id+'"]').remove();
    });
  });
  
  $('body').on('click', '#editt',function(){
    $('#id_faculty_Member').val($(this).val());
    
    var myDataAttr = $(this).val();
    var dates= $('[data-id = "'+myDataAttr+'"]').data('birth_date');
    console.log(dates);
    console.log($('[data-id = "'+myDataAttr+'"]').data('gender'));
    date = new Date(dates);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    console.log(year+"-"+monthIndex+"-"+day);
    $('#name').val($('[data-id = "'+myDataAttr+'"]').data('name'));
    $('#qualification').val($('[data-id = "'+myDataAttr+'"]').data('qualification'));
    $('#gender').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('gender'));
    $('#departmentId').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('ddepartmentid'));
    $('#nationality').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('nationality'));
    $('#birth_date').val("hjk");
    $('#place_birth').val($('[data-id = "'+myDataAttr+'"]').data('place_birth'));
    $('#physical_address').val($('[data-id = "'+myDataAttr+'"]').data('physical_address'));
    $('#phone').val($('[data-id = "'+myDataAttr+'"]').data('phone'));
    $('#specialization').val($('[data-id = "'+myDataAttr+'"]').data('specialization'));
  });

  $('body').on('click', '#save', function (e) {
    e.preventDefault();
    $('#updateFacultyMember').submit();
  });

  $("#updateFacultyMember").submit(function(e) {
    var isvalidate = $("#updateFacultyMember").valid();
    if(isvalidate){
      $.post("/facultyMember/updateFacultyMember", $("form").serializeObject(), function(data, error){
        if(data !=true){
        } 
        else {
          // if($("#tbody").children().length>=10){
          //   $("#tbody tr:last-child").remove();
          // }
          // $('[data-id = "'+$("form").serializeObject().id+'"]').remove();
          // $("#tbody").prepend('<tr data-id="'+$("form").serializeObject().id+'">'+
          //   '<td> <input type="checkbox"></td>'+
          //   '<td>'+$("form").serializeObject().name+'</td>'+
          //   '<td class="text-left">'+$("form").serializeObject().name_en+'</td>'+
          //   '<td></td>'+
          //   '<td class="text-center">'+
          //   '<p data-placement="top", data-toggle="tooltip", title="تعديل">'+
          //   '<button id="Edit" value="'+$("form").serializeObject().id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button></p></td><td class="text-center">'+
          //   '<p data-placement="top", data-toggle="tooltip", title="إلغاء">'+
          //   '<button id="Delete" value="'+$("form").serializeObject().id+'" data-title="Delete" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>');
          // $('#name').val($("form").serializeObject().name);
          // $('#name_en').val($("form").serializeObject().name_en);
          // $('#edit').modal('hide');
          //  $.notify({
          //   message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-ok-sign'></i>&nbsp;<strong>نجح:</strong> تم التعديل بنجاح </p>"
          //   },{
          //   type: 'success',
          //   allow_dismiss: true,
          //   showProgressbar: false,
          //   placement: {
          //     from: 'top',
          //     align: 'center'
          //   },
          //   mouse_over: null,
          //   newest_on_top: true,
          //   animate: {
          //     enter: 'animated bounceInDown',
          //     exit: 'animated bounceOutUp'
          //   },
          // });
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
    $.notify({
      message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-ok-sign'></i>&nbsp;<strong>نجح:</strong> تمت إضافة محاضر/ة جديد بنجاح </p>"
      },{
      type: 'success',
      allow_dismiss: true,
      showProgressbar: false,
      placement: {
        from: 'top',
        align: 'center'
      },
      mouse_over: null,
      newest_on_top: true,
      animate: {
        enter: 'animated bounceInDown',
        exit: 'animated bounceOutUp'
      },
    });
    var pageUrl = '/facultyMember'
    window.history.pushState("","",pageUrl);
  }
});