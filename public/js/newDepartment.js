$(document).ready(function(){
  $.notify({
    message: "<p class='font text-center'><strong>نجح:</strong> تمت إضافة قسم جديد بنجاح </p>"
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
      enter: 'animated flipInY',
      exit: 'animated flipOutX'
    },
  });
  $("#newDepartment").validate({
    rules:{
      name:{
        required: true,
      },
      name_en:{
        required: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اسم القسم!",
      },
      name_en:{
        required: "<div style='padding-right:12px;'>!Please enter Department name</div>",
      },
    },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });
});