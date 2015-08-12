$(document).ready(function(){
   $('#System').hide();
  // $.notify({
  //   message: "<p class='font text-center'><strong>نجح:</strong> تمت إضافة قسم جديد بنجاح </p>"
  // },{
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
  //     enter: 'animated flipInY',
  //     exit: 'animated flipOutX'
  //   },
  // });
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
  });

    $('#sem_type').on('change',function() {
        var id = $('#sem_type').val();
        if(id==2){
          $('#system').hide();
        $.get('/newSemester/',function(){
          $('#System').show(300);
          $('#system').empty();
          $('#system').append('<option value="" style="color:grey; display:none;">Please Select Area</option>');
        
            $('#system').append("<option value = '"+1+"'>"+ربيعي+"</option>");
            $('#system').append("<option value = '"+2+"'>"+خريفي+"</option>");
            $('#system').append("<option value = '"+3+"'>"+صيفي+"</option>");
        });
      }
      });



});