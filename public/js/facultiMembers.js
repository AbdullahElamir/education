$(document).ready(function(){

  $.nat = new Array();

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
    $('#name').val($('[data-id = "'+myDataAttr+'"]').data('name'));// الاسم
    $('#qualification').val($('[data-id = "'+myDataAttr+'"]').data('qualification'));//المؤهل العلمي
    $('#gender').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('gender'));// الجنس
    $('#departmentId').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('ddepartmentid'));//القسم
    $('#nationality').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('nationality'));//الجنسيه
    $('#birth_date').val("hjk");//
    $('#place_birth').val($('[data-id = "'+myDataAttr+'"]').data('place_birth'));
    $('#physical_address').val($('[data-id = "'+myDataAttr+'"]').data('physical_address'));
    $('#phone').val($('[data-id = "'+myDataAttr+'"]').data('phone'));
    $('#specialization').val($('[data-id = "'+myDataAttr+'"]').data('specialization'));// التخصص
  });
  
  $('body').on('click', '#save', function (e) {
    e.preventDefault();
    $('#updateFacultyMember').submit();
  });

  $.get('/facultyMember/getAllNationality/',function(todo){
    for (var i = 0; i < todo.length; i++) {
      var k = new Object({id : i,value : todo[i].id, text : todo[i].name});
      $.nat.push(k);
    };
  });
    

  $("#updateFacultyMember").submit(function(e) {
    var isvalidate = $("#updateFacultyMember").valid();
    if(isvalidate){
      $.post("/facultyMember/updateFacultyMember", $("form").serializeObject(), function(data, error){
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
                $("form").serializeObject().qualification+'  '+
              '</td>'+
              '<td>'+
                $("form").serializeObject().specialization+
              '</td><td>'+
                gender+
              '</td><td>'+
                $("form").serializeObject().departmentId+
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
    var pageUrl = '/facultyMember/'
    window.history.pushState("","",pageUrl);
  }
});