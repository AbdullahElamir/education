$(document).ready(function(){
  ///semester/#{semester.id}/updateSemester/
     $('body').on('click', '#del', function(){
      //alert("ff");
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/semester/deleteSemesters/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  });
  $('#sem_type').hide();
  $.validator.addMethod("greaterThan", function(value, element, params) {    
    if (!/Invalid|NaN/.test(new Date(value))) {
      return new Date(value) > new Date($(params[0]).val());
    }    
    return isNaN(value) && isNaN($(params[0]).val()) || (Number(value) > Number($(params[0]).val())); 
  },'يجب ان يكون تاريخ النهاية اكبر من البداية!');
  $("#newSemester").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      system_type:{
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
        greaterThan: '#starting_date',
      },
    },
    messages:{
      system_type:{
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
    invalidHandler: function(event, validator) {
      var errors = validator.numberOfInvalids();
      if (errors) {
        $.notify({
          message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-warning-sign'></i>&nbsp;<strong>خطأ:</strong> الرجاء التأكد من صحة ادخال البيانات </p>"
          },{
          type: 'danger',
          allow_dismiss: true,
          showProgressbar: false,
          placement: {
            from: 'top',
            align: 'center'
          },
          mouse_over: null,
          newest_on_top: true,
          animate: {
            enter: 'animated bounceIn',
            exit: 'animated bounceOut'
          },
        });
      }
    },
  });
  $('#system_type').on('change',function() {
    $('select[name="sem_type"]').each(function() {
      var id = $('#system_type').val();
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
    var id = $('#system_type').val();
    if(id==1){
      $('#sem_type').show();
    }
    else {
      $('#sem_type').hide();
      $('.sem_type').selectpicker('val', '');
    }
  });

  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
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
      message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-ok-sign'></i>&nbsp;<strong>نجح:</strong> تمت إضافة نظام دراسي جديد بنجاح </p>"
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
    var pageUrl = '/semester'
    window.history.pushState("","",pageUrl);
  }

  $(".prevent").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 122 || key == 27 )
      {}
    else
      e.preventDefault();
  });
});