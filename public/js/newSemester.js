$(document).ready(function(){
  ///semester/#{semester.id}/updateSemester/
     $('body').on('click', '#del', function(){
      //alert("ff");
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/deleteSemesters/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  });
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
        required: "الرجاء اختيار نظام الدراسي!",
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
    $('select[name="system_type"]').each(function() {
      var id = $('#sem_type').val();
      if(id==1){
        $(this).rules("add", {
          required: true,
          messages: {
            required: "الرجاء اختيار الفصل الدراسي!",
          }
        });
      }
      else {
        $(this).rules( 'remove', 'required' );
      }    
    });
    var id = $('#sem_type').val();
    if(id==1){
      $('#system_type').show();
    }
    else {
      $('#system_type').hide();
      $('.system_type').selectpicker('val', '');
    }
  });
  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });
});