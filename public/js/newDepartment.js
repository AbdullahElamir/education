$(document).ready(function(){
  $("#newDepartment, #formdpet").validate({
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
        required: "<div style='padding-right:35px;'>!Please enter Department name</div>",
      },
    },
     errorClass: 'custom-error',
    
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');

    },
    submitHandler: function(form) {
      $.ajax({
        type: 'POST',
        url: '/newDepartment',
        data: $(form).serialize(),
        success: function(html) {
          $('#name').val("");
          $('#name_en').val("");
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
        }
      });
    },
  });
});
