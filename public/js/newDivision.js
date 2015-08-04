$(document).ready(function(){
  $("#newDivision").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      name:{
        required: true,
      },
      name_en:{
        required: true,
      },
      department_iddepartment:{
        required: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اسم الشعبة!",
      },
      name_en:{
        required: "<div style='padding-right:35px;'>!Please enter Division name</div>",
      },
      department_iddepartment:{
        required: "الرجاء اختيار اسم القسم!",
      },
    },
    // errorElement: 'label',
    errorClass: 'custom-error',
    // errorElement: "em",
    // errorLabelContainer: "#messageBox",
    // wrapper: "li",
    errorPlacement: function (error, element) {
      if ($(element).is('select')) {
          element.next().after(error);
      } else {
          error.insertAfter(element);
      }
    },
    // errorElement: 'label',
    // // errorClass: 'help-block',
    // errorPlacement: function(error, element) {
    //   if(element.parent('.form-control').length) {
    //       error.insertAfter(element.parent());
    //   } else {
    //       error.insertAfter(element);
    //   }
    // },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
    submitHandler: function(form) {
      $.ajax({
        type: 'POST',
        url: '/newDivision',
        data: $(form).serialize(),
        // url: reqUrl,
        // data: reqBody,
        success: function(html) {
          $('#name').val("");
          $('#name_en').val("");
          $('.selectpicker').selectpicker('val', '');
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