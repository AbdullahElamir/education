$(document).ready(function(){
  $('#system_type').hide();
  $("#newSemester").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      sem_type:{
        required: true,
      },
      year:{
        required: true,
      },
      current:{
        required: true,
      },
      starting_date:{
        required: true,
      },
      ending_date:{
        required: true,
      },
    },
    messages:{
      sem_type:{
        required: "الرجاء اختيار الفصل الدراسي!",
      },
      year:{
        required: "الرجاء اختيار سنة الفصل الدراسي!",
      },
      current:{
        required: "الرجاء الاجابة بنعم أو لا!",
      },
      starting_date:{
        required: "الرجاء اختيار تاريخ بداية الفصل!",
      },
      ending_date:{
        required: "الرجاء اختيار تاريخ نهاية الفصل!",
      },
    },
    // errorElement: 'span',
    errorClass: 'custom-error',
    // errorPlacement: function (error, element) {
    //   if ($(element).is('select')) {
    //       element.next().after(error);
    //   } else {
    //       error.insertAfter(element);
    //   }
    // },
    // errorPlacement: function(error, element) {
    //   element.parent().append(error);
    // },
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
  $('#sem_type').on('change',function() {
    var id = $('#sem_type').val();
    if(id==2){
      $('#system_type').show(300);
    }
    else {
      $('#system_type').hide(300);
    }
  });
});