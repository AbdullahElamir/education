$(document).ready(function(){

  $("#newSubject").validate({
    rules:{
      name:{
        required: true,
      },
      name_en:{
        required: true,
      },
      no_th_unit:{
        required: true,
        number: true,
      },
      code:{
        required: true,
      },
      chapter_degree:{
        required: true,
      },
      final_theor:{
        required: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء أدخال اسم المادة",
      },
      name_en:{
        required: "!Please enter Subject name",
      },
      no_th_unit:{
        required: "الرجاء أدخال عدد الوحدات النظري",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      code:{
        required: "الرجاء أدخال رمز المادة",
      },
      chapter_degree:{
        required: "الرجاء أدخال درجة اعمال السنة",
      },
      final_theor:{
        required: "الرجاء أدخال درجة الامتحان النظري",
      }
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
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
  });
    $('#subject_search_btn').on('click', function(){
      window.location.href="/subject?q="+$('#subject_search').val();
    });  

   
    $("#subject_search").on('keydown',function(e) { 
      var key = e.charCode || e.keyCode;
      if(key == 13  )
        {
        $("#subject_search_btn").click(); 
        }
    });

  $('#toggle-subject').change(function() {
    if ($(this).prop('checked') == true) {
      $('#system_type').val("2");
    }
    else {
      $('#system_type').val("1");
    }
  });  

  $('#toggle-practical').change(function() {
    if ($(this).prop('checked') == true) {
      $('#has_practical').val("2");
      $('#final_theor').val("40");
      $('#final_practical').val("20");
      $('#practical').removeClass('hide');
      $("#final_practical").rules("add", {
        required: true,
        messages: {
          required: "الرجاء ادخال درجة امتحان العملي!",
        }
      });
    }
    else {
      $('#has_practical').val("1");
      $('#final_theor').val("60");
      $('#final_practical').val("0");
      $('#practical').addClass('hide');
      $("#final_practical").rules( 'remove', 'required' );
    }
  });  

  $('body').on('click', '#save', function() {
    var isvalidate=$("#newSubject").valid();
    if (isvalidate){
      var obj = $("#newSubject").serializeObject();
      $.post('/subject/newSubject',obj,function(result){
        window.location.replace("/subject/edit/"+result.id);
      });
    }

  });

  /*--------------on delete subject Modal----------- */
  $('body').on('click', '.deleteSubject', function() {
    $('#deleteValue').val($(this).val());
  });

  /*--------------on delete subject button----------- */
  $('body').on('click','#deleteValue', function() {
    var id=$(this).val();
    $.get('/subject/deleteSubject/'+id,function(todo) {
      switch(todo.msg){
        case "1" :
          custNotify("success","نجح","لقد تم مسح المادة بنجاح","ok-sign","bounceInDown","bounceOutUp");
          $('[data-id = "'+id+'"]').remove();
          break;
        case "2" :
          custNotify("danger","فشل","لايمكن مسح المادة لوجود كيانات معتمدة عليها","warning-sign","bounceInDown","bounceOutUp");
          break;
        default:
          break; 
      }
    });
  });  
  
});
