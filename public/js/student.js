$(document).ready(function(){
  // delete faculityMembers
  $('body').on('click', '#Deletee', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/student/deleteStudent/'+$(this).val(),function(todo){
      $('[date-id = "'+id+'"]').remove();
    });
  });
  

  $('body').on('click', '#editt',function(){
    $('#id_Student').val($(this).val());
    
    var myDataAttr = $(this).val();
    $('#first_name').val($('[data-id = "'+myDataAttr+'"]').data('first_name'));
    $('#first_name_en').val($('[data-id = "'+myDataAttr+'"]').data('first_name_en'));
    $('#father_name').val($('[data-id = "'+myDataAttr+'"]').data('father_name'));
    $('#father_name_en').val($('[data-id = "'+myDataAttr+'"]').data('father_name_en'));
    $('#grand_name').val($('[data-id = "'+myDataAttr+'"]').data('grand_name'));
    $('#grand_name_en').val($('[data-id = "'+myDataAttr+'"]').data('grand_name_en'));
    $('#last_name').val($('[data-id = "'+myDataAttr+'"]').data('last_name'));
    $('#last_name_en').val($('[data-id = "'+myDataAttr+'"]').data('last_name_en'));
    $('#mother_name').val($('[data-id = "'+myDataAttr+'"]').data('mother_name'));
    $('#mother_name_en').val($('[data-id = "'+myDataAttr+'"]').data('mother_name_en'));    
    $('#place_birth').selectpicker($('[data-id = "'+myDataAttr+'"]').data('place_birth'));
    $('#nationality').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('nationality'));
    $('#gender').selectpicker('val' ,$('[data-id = "'+myDataAttr+'"]').data('gender'));
    $('#no_paper_family').val($('[data-id = "'+myDataAttr+'"]').data('no_paper_family'));
    $('#no_reg_family').val($('[data-id = "'+myDataAttr+'"]').data('no_reg_family'));
    $('#physical_address').val($('[data-id = "'+myDataAttr+'"]').data('physical_address'));
    $('#civil_reg').val($('[data-id = "'+myDataAttr+'"]').data('civil_reg'));
    $('#phone').val($('[data-id = "'+myDataAttr+'"]').data('phone'));
    $('#father_work_place').val($('[data-id = "'+myDataAttr+'"]').data('father_work_place'));
    $('#last_cert').val($('[data-id = "'+myDataAttr+'"]').data('last_cert'));
    $('#cust_last_cert').val($('[data-id = "'+myDataAttr+'"]').data('cust_last_cert'));
    $('#birth_date').val('defaultDate',$('[data-id = "'+myDataAttr+'"]').data('birth_date')); 
    $('#date_cert').val('defaultDate',$('[data-id = "'+myDataAttr+'"]').data('date_cert'));
    $('#place_cert').val($('[data-id = "'+myDataAttr+'"]').data('place_cert'));
    $('#set_number').val($('[data-id = "'+myDataAttr+'"]').data('set_number'));
    $('#student_rate').val($('[data-id = "'+myDataAttr+'"]').data('student_rate'));
    $('#nid').val($('[data-id = "'+myDataAttr+'"]').data('nid'));
  });

  $('body').on('click', '#save', function (e) {
    alert("inside js #save ");
    e.preventDefault();
    $('#updateStudent').submit();
  });

  $("#updateStudent").submit(function(e) {
    
    var isvalidate = $("#updateStudent").valid();
    if(isvalidate){
      $.post("/student/updateStudent", $("form").serializeObject(), function(data, error){
        if(data !=true){
        } 
        else {
          $('[data-id = "'+$("form").serializeObject().id+'"]').remove();
          $("#tbody").prepend('<tr data-id="'+$("form").serializeObject().id+'" data-first_name="'+$("form").serializeObject().first_name+'" data-first_name_en="'+$("form").serializeObject().first_name_en+'" data-father_name="{'+$("form").serializeObject().father_name+'}" data-father_name_en="{'+$("form").serializeObject().father_name_en+'}" data-grand_name="{'+$("form").serializeObject().grand_name+'}" data-grand_name_en="{'+$("form").serializeObject().father_name_en+'}" data-last_name="{'+$("form").serializeObject().last_name+'}" data-last_name_en="{'+$("form").serializeObject().father_name_en+'}" data-mother_name="{'+$("form").serializeObject().mother_name+'}" data-mother_name_en="{'+$("form").serializeObject().father_name_en+'}" data-birth_date="{'+$("form").serializeObject().birth_date+'}" data-place_birth="{'+$("form").serializeObject().place_birth+'}" data-nationality="{'+$("form").serializeObject().nationality+'}" data-gender="{'+$("form").serializeObject().gender+'}" data-no_paper_family="{'+$("form").serializeObject().no_paper_family+'}" data-no_reg_family="{'+$("form").serializeObject().no_reg_family+'}" data-physical_address="{'+$("form").serializeObject().physical_address+'}" data-civil_reg="{'+$("form").serializeObject().civil_reg+'}" data-phone="{'+$("form").serializeObject().phone+'}" data-father_work_place="{'+$("form").serializeObject().father_work_place+'}" data-last_cert="{'+$("form").serializeObject().last_cert+'}" data-cust_last_cert="{'+$("form").serializeObject().cust_last_cert+'}" data-date_cert="{'+$("form").serializeObject().date_cert+'}" data-place_cert="{'+$("form").serializeObject().place_cert+'}" data-set_number="{'+$("form").serializeObject().set_number+'}" data-student_rate="{'+$("form").serializeObject().student_rate+'}" data-nid="{'+$("form").serializeObject().nid+'}">'+
              '<td>'+
                $("form").serializeObject().nid+
              '</td>'+
              '<td>'+
                $("form").serializeObject().first_name+'  '+
                $("form").serializeObject().father_name+'  '+
                $("form").serializeObject().grand_name+'  '+
                $("form").serializeObject().last_name+
              '</td>'+
              '<td>'+
                $("form").serializeObject().mother_name+
              '</td>'+
              '<td>ذكر'+
              '</td>'+
              '<td>'+
                $("form").serializeObject().physical_address+
              '</td>'+
              '<td>'+
                 $("form").serializeObject().student_rate+
              '</td>'+
              '<td>'+
                 $("form").serializeObject().nationality+
              '</td>'+
              '<td class="text-center">'+
                '<p data-placement="top" data-toggle="tooltip" title="تعديل">'+
                  '<button id="editt" value="{i.id}" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button>'+
                '</p>'+
              '</td>'+
              '<td class="text-center">'+
                '<p data-placement="top" data-toggle="tooltip" title="إلغاء">'+
                  '<button id="Deletee" value="{i.id}" data-title="Deletee" data-toggle="modal" data-target="#delette" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button>'+
                '</p>'+
              '</td>'+
            '</tr>');

          $('#edit').modal('hide');
       
        }
      });
    }
    return false;
  });

});