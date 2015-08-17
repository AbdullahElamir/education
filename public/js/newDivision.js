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
      DepartmentId:{
        required: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اسم الشعبة!",
      },
      name_en:{
        required: "!Please enter Division name",
      },
      DepartmentId:{
        required: "الرجاء اختيار اسم القسم!",
      },
    },
    // errorElement: 'label',
    errorClass: 'custom-error',
    errorPlacement: function (error, element) {
      if ($(element).is('select')) {
          element.next().after(error);
      } else {
          error.insertAfter(element);
      }
    },
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
        success: function(html) {
          $('#name').val("");
          $('#name_en').val("");
          $('.selectpicker').selectpicker('val', '');
          $.notify({
            message: "<p class='font text-center'><strong>نجح:</strong> تمت إضافة شعبة جديد بنجاح </p>"
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
  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });
});