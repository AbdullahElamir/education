$(document).ready(function(){
  // delete faculityMembers
  $('body').on('click', '#Delete', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    alert(id);
    $.get('/deleteFaculityMembers/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  });


  $('.editFacultyMember').on('click',function(){
    var myDataAttr = $(this).data('noname');
    console.log(myDataAttr);
    $('#id_faculty_Member').val(myDataAttr);
    $('#name').val($("#faculty_Member-"+myDataAttr).data('name'));
    $('#qualification').val($("#faculty_Member-"+myDataAttr).data('qualification'));
    $('#gender').val($("#faculty_Member-"+myDataAttr).data('gender'));
    $('#nationality').val($("#faculty_Member-"+myDataAttr).data('nationality'));
    $('#birth_date').val($("#faculty_Member-"+myDataAttr).data('birth_date'));
    $('#place_birth').val($("#faculty_Member-"+myDataAttr).data('place_birth'));
    $('#physical_address').val($("#faculty_Member-"+myDataAttr).data('physical_address'));
    $('#phone').val($("#faculty_Member-"+myDataAttr).data('phone'));
   console.log($("#faculty_Member-"+myDataAttr).data('name')+"-"+$("#faculty_Member-"+myDataAttr).data('gender'));
  });

  // $('.delete_person').on('click',function(){
  //   var myDataAttr = $(this).data('delete');
  //   console.log(myDataAttr);
  //   $('#id_person2').val(myDataAttr);
  //   $('#delete_name').val($("#person-"+myDataAttr).data('name'));
  // });
  


});