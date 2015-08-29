$(document).ready(function(){
  jQuery.validator.addMethod("greaterThan",function(value, element, params) {
    if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) > new Date($(params).val());
    }
    return isNaN(value) && isNaN($(params).val()) || (Number(value) > Number($(params).val())); 
  },'يجب ان يكون تاريخ النهاية اكبر من البداية!');
  $("#editSemester").validate({
    rules:{
      sem_type:{
        required: true,
      },
      year:{
        required: true,
        number: true,
        maxlength: 4,
        minlength: 4,
      },
      starting_date:{
        required: true,
      },
      ending_date:{
        required: true,
        greaterThan: "#startDate",
      },
    },
    messages:{
      sem_type:{
        required: "الرجاء ادخال النظام الدراسي!",
      },
      year:{
        required: "الرجاء الرجاء ادخال السنة الدراسية!",
        number: "الرجاء ادخال ارقام فقط!",
        maxlength: "الرجاء ادخال 4 ارقام فط!",
        minlength: "الرجاء ادخال 4 ارقام فط!",
      },
      starting_date:{
        required: "الرجاء ادخال تاريخ بداية النظام الدارسي!",
      },
      ending_date:{
        required: "الرجاء ادخال تاريخ نهاية النظام الدارسي!"
      },
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
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });
  $(".prevent").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 122 || key == 27 )
      {}
    else
      e.preventDefault();
  });
  $('#edit').on('hidden.bs.modal', function(){
    $(this).removeData('bs.modal');
    $('#editSemester').validate().resetForm();
  });
});