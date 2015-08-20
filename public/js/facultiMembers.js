$(document).ready(function(){
  // delete faculityMembers
  $('body').on('click', '#Deletee', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/deleteFaculityMembers/'+$(this).val(),function(todo){
      $('[date-id = "'+id+'"]').remove();
    });
  });

/*
$('.editDivision').on('click',function(){
    var myDataAttr = $(this).val();
    $('#name').val($('[data-id = "'+myDataAttr+'"]').data('name'));
    $('#name_en').val($('[data-id = "'+myDataAttr+'"]').data('name_en'));
    $('#id').val($('[data-id = "'+myDataAttr+'"]').data('id'));
    $('#DepartmentId').val($('[data-id = "'+myDataAttr+'"]').data('departmentid'));
  });
*/

  $('body').on('click', '#editt',function(){
    var myDataAttr = $(this).val();  
    var dates= $('[data-id = "'+myDataAttr+'"]').data('birth_date');
    console.log(dates);
    console.log($('[data-id = "'+myDataAttr+'"]').data('gender'));
    date = new Date(dates);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    console.log(year+"-"+monthIndex+"-"+day);
    
      $('#name').val($('[data-id = "'+myDataAttr+'"]').data('name'));
      $('#qualification').val($('[data-id = "'+myDataAttr+'"]').data('qualification'));
      $('#gender').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('gender'));
      $('#nationality').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('nationality'));
      $('#birth_date').val("hjk");
      $('#place_birth').val($('[data-id = "'+myDataAttr+'"]').data('place_birth'));
      $('#physical_address').val($('[data-id = "'+myDataAttr+'"]').data('physical_address'));
      $('#phone').val($('[data-id = "'+myDataAttr+'"]').data('phone'));
      $('#specialization').val($('[data-id = "'+myDataAttr+'"]').data('specialization'));
      $('#departmentId').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('dDepartmentId'));
      console.log($('[data-id = "'+myDataAttr+'"]').data('dDepartmentId'));
  });
    // var myDataAttr = $(this).data('noname');
    // console.log(myDataAttr);
    // $('#id_faculty_Member').val(myDataAttr);
    
   // console.log($("#faculty_Member-"+myDataAttr).data('name')+"-"+$("#faculty_Member-"+myDataAttr).data('gender'));
  // });

  // $('.delete_person').on('click',function(){
  //   var myDataAttr = $(this).data('delete');
  //   console.log(myDataAttr);
  //   $('#id_person2').val(myDataAttr);
  //   $('#delete_name').val($("#person-"+myDataAttr).data('name'));
  // });

});