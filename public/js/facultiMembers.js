$(document).ready(function(){
  // delete faculityMembers
  $('body').on('click', '#Deletee', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/deleteFaculityMembers/'+$(this).val(),function(todo){
      $('[date-id = "'+id+'"]').remove();
    });
  });

/*
$('.editDivision').on('click',function(){
    var myDataAttr = $(this).val();
    $('#name').val($('[data-id = "'+myDataAttr+'"]').data('name'));
    $('#name_en').val($('[data-id = "'+myDataAttr+'"]').data('name_en'));
    $('#id').val($('[data-id = "'+myDataAttr+'"]').data('id'));
    $('#DepartmentId').val($('[data-id = "'+myDataAttr+'"]').data('departmentid'));
  });
*/

  $('body').on('click', '#editt',function(){
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
      $('#nationality').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('nationality'));
      $('#birth_date').val("hjk");
      $('#place_birth').val($('[data-id = "'+myDataAttr+'"]').data('place_birth'));
      $('#physical_address').val($('[data-id = "'+myDataAttr+'"]').data('physical_address'));
      $('#phone').val($('[data-id = "'+myDataAttr+'"]').data('phone'));
      $('#specialization').val($('[data-id = "'+myDataAttr+'"]').data('specialization'));
      $('#departmentId').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('dDepartmentId'));
      console.log($('[data-id = "'+myDataAttr+'"]').data('dDepartmentId'));
  });
    // var myDataAttr = $(this).data('noname');
    // console.log(myDataAttr);
    // $('#id_faculty_Member').val(myDataAttr);
    
   // console.log($("#faculty_Member-"+myDataAttr).data('name')+"-"+$("#faculty_Member-"+myDataAttr).data('gender'));
  // });

  // $('.delete_person').on('click',function(){
  //   var myDataAttr = $(this).data('delete');
  //   console.log(myDataAttr);
  //   $('#id_person2').val(myDataAttr);
  //   $('#delete_name').val($("#person-"+myDataAttr).data('name'));
  // });
  $("#updateFacultyMember").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      name:{
        required: true,
      },
      qualification:{
        required: true,
      },
      DepartmentId:{
        required: true,
      },
      specialization:{
        required: true,
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
      },
      physical_address:{
        required: true,
      },
      phone:{
        required: true,
        number: true,
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
        number: "يجب ان يحتوي رقم الهاتف علي ارقام فقط!"
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
    var pageUrl = '/faculityMembers'
    window.history.pushState("","",pageUrl);
  }
});