$(document).ready(function(){
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
    if ($(this).prop('checked') == true) {
      $("#Semesters").hide(200);
      $("#Year").show(200);
    }
    else {
      $("#Semesters").show(200); 
      $("#Year").hide(200);
    }
  
  });      
});
