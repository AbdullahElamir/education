$(document).ready(function(){
  
  $("#departments").change(function(){
    $('#divisions').empty();
    $.get('/cutingStudent/getDiv/'+$(this).val(),function(result){ 
        for(i in result[0]){
          $('#divisions').append("<option value = '"+result[0][i].id+"'>"+result[0][i].name+"</option>").selectpicker('refresh');
        }
    });
  });

  $('body').on('click', '#student_searchbtn', function(e){
    e.preventDefault();
   /* alert($('#studing_year').val());
    alert($('#divisions').val());
    alert($('#student_search').val());*/
    var obj={year:$('#studing_year').val(),div:$('#divisions').val(),id_std:$('#student_search').val()};
    $.post('/cutingStudent/getStudentName/',obj,function(result){ 
      if(result==0){
        alert("عفـــوا لايوجد طلبة منقطعين لهذا الفصل");
      }
    
      $('#tbody').empty();

      for(i in result){
          var gender=result[i].gender;
      if(gender==0){
        gender="ذكر";
      } else if(gender == 1){
        gender="أنثي";
      }
      $('#tbody').append("<tr style='background-color:#ee9ca7'; ><td  align=center>"+result[i].set_number+"</td><td align=center>"+result[i].first_name+" "+result[i].father_name+" "+result[i].last_name+"</td><td align=center>"+gender+"</td><td align=center>"+result[i].physical_address+"</td></tr>");
    }
    });
  });






  



});