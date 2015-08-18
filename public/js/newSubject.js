$(document).ready(function(){

/*
  $("#newSubject ,#updateSubject").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    ignore:[],
    rules:{
      subject_name:{
        required: true,
      },
      subject_name_en:{
        required: true,
      },
      no_th_unit:{
        required: true,
        number: true,
      },
      no_th_hour:{
        required: true,
        number: true,
      },
      cod:{
        required: true,
      },
      no_pr_unit:{
        required: true,
        number: true,
      },
      no_pr_hour:{
        required: true,
        number: true,
      },
      chapter_degree:{
        required: true,
      },
      final_theor:{
        required: true,
      },
      final_practical:{
        required: true,
      },
      subjectId:{
        required: true,
      },
    },
    messages:{
      subject_name:{
        required: "الرجاء أدخال اسم المادة",
      },
      subject_name_en:{
        required: "<div style='padding-right:35px; '>!Please enter Subject name</div>",
      },
      no_th_unit:{
        required: "الرجاء أدخال عدد الوحدات النظري",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      no_th_hour:{
        required: "الرجاء أدخال عدد سعات النظري",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      cod:{
        required: "الرجاء أدخال رمز المادة",
      },
      no_pr_unit:{
        required: "الرجاء ادخال عدد وحدات العملي",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      no_pr_hour:{
        required: "الرجاء أدخال عدد سعات العملي",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      chapter_degree:{
        required: "الرجاء أدخال درجة اعمال السنة",
      },
      final_theor:{
        required: "الرجاء أدخال درجة الامتحان النظري",
      },
      final_practical:{
        required: "الرجاء أدخال درجت العملي",
      },
      subjectId:{
        required: "الرجاء اختيار المواد التمهدية!",
      },
    },
    // errorElement: 'label',
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
  });*/

  var id =[];
  var subject=[];
   $('#subjectId').on('change', function() {
    // $('#subjectId>option:selected').text()
    // $(this).val() 
    id.push($(this).val() );
    subject.push($('#subjectId>option:selected').text());
    $("#my > tbody").append("<tr><td class='text-center'>"+$('#subjectId>option:selected').text()+"</td></tr>");
 
});

    $('body').on('click', '#save', function(){
      var obj = {name: $('#name').val(), model:500, color:"white"}; 
       $.post('/test/'+JSON.stringify(obj),function(todo){

       });
     
         
     
    });

  $('body').on('click', '#sh', function(){
    var id = $(this).val();
     $.get('/getSubject/'+id,function(subject){
      $('#no_pr_unit').val(subject[0].no_pr_unit);
      $('#no_pr_hour').val(subject[0].no_pr_hour);
      $('#chapter_degree').val(subject[0].chapter_degree);
      $('#final_theor').val(subject[0].final_theor);
      $('#final_practical').val(subject[0].final_practical);
      $('#sub_Type').val(subject[0].sub_type);
      $('#subject_type').val(subject[0].subject_type);
      $('#System_Type').val(subject[0].system_type);
      $('#department').val(subject[0].Department.name);
      $('#user').val(subject[0].User.name);
    });
});

$('body').on('click', '#ed', function(){
   var id = $(this).val();
     $.get('/getSubject/'+id,function(subject){
           $('#name').val(subject[0].name);
           $('#name_en').val(subject[0].name_en);
           $('#code').val(subject[0].code);
           $('#subject_type').val(subject[0].subject_type);
           $('#no_th_unit').val(subject[0].no_th_unit);
           $('#no_prr_unit').val(subject[0].no_pr_unit); 
           $('#no_th_hour').val(subject[0].no_th_hour);
           $('#no_prr_hour').val(subject[0].no_pr_hour);
           $('#chapter_degre').val(subject[0].chapter_degree);
           $('#final_theorr').val(subject[0].final_theor);
           $('#final_practicall').val(subject[0].final_practical);
           $('#id').val(subject[0].id);
           if(subject[0].subject_type == 1)
           {
            //عام
             $('#js_radio').prop("checked",true);
               $('[id^="department_select"]').hide(200);
           }
           else if(subject[0].subject_type == 2){
            // خاص
             $('#radioo').prop("checked",true);
              $('[id^="department_select"]').show(200);
             $('#department_select option[value="'+subject[0].DepartmentId+'"]').prop('selected', 'selected').change();
           }
           else if(subject[0].subject_type==3){
            //كلاهما
             $('#radio').prop("checked",true);
               $('[id^="department_select"]').show(200);
               $('#department_select option[value="'+subject[0].DepartmentId+'"]').prop('selected', 'selected').change();
             //  $('#department_select option[value="'+subject[0].DepartmentId+'"]').prop('selected', 'selected').change();
           }
      

    });
   
  });

  

  $('body').on('click', '#del', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click','#ok', function(){
    var id=$(this).val();
    $.get('/deleteSubject/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  });


    


  $('[id^="department_select"]').hide(0);
  $('[id^="radio"]').change(function() 
  {
    $('[id^="department_select"]').show(200);
  })
  $('#js_radio').change(function() 
  {
    $('[id^="department_select"]').hide(200);
  })
  $("#Semesters").show(0); 
  $("#Year").hide(0);
  $('#toggle-subject').change(function() {
    var toggle ;
    if ($(this).prop('checked') == true) {
      toggle = 1;
    }
    else {
      toggle = 0;
    }

  
  });      
});
