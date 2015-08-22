$(document).ready(function(){
  // delete faculityMembers
  $('body').on('click', '#Deletee', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/deleteStudent/'+$(this).val(),function(todo){
      $('[date-id = "'+id+'"]').remove();
    });
  });
  
  alert("Student js ");

  $('body').on('click', '#editt',function(){
    $('#id_Student').val($(this).val());
    alert("inside js view edit ");
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
    
    $('#birth_date').datetimepicker('setDate',$('[data-id = "'+myDataAttr+'"]').data('birth_date'));
    
    $('#place_birth').val($('[data-id = "'+myDataAttr+'"]').data('place_birth'));
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
    $('#date_cert').val($('[data-id = "'+myDataAttr+'"]').data('date_cert'));
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
    alert("inside js updateStudent ");
    var isvalidate = $("#updateStudent").valid();
    if(isvalidate){
      $.post("/updateStudent", $("form").serializeObject(), function(data, error){
        if(data !=true){
          alert("error result");
        } 
        else {
          alert("True result");
          // if($("#tbody").children().length>=10){
          //   $("#tbody tr:last-child").remove();
          // }
          // $('[data-id = "'+$("form").serializeObject().id+'"]').remove();
          // $("#tbody").prepend('<tr data-id="'+$("form").serializeObject().id+'">'+
          //   '<td> <input type="checkbox"></td>'+
          //   '<td>'+$("form").serializeObject().name+'</td>'+
          //   '<td class="text-left">'+$("form").serializeObject().name_en+'</td>'+
          //   '<td></td>'+
          //   '<td class="text-center">'+
          //   '<p data-placement="top", data-toggle="tooltip", title="تعديل">'+
          //   '<button id="Edit" value="'+$("form").serializeObject().id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button></p></td><td class="text-center">'+
          //   '<p data-placement="top", data-toggle="tooltip", title="إلغاء">'+
          //   '<button id="Delete" value="'+$("form").serializeObject().id+'" data-title="Delete" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>');
          // $('#name').val($("form").serializeObject().name);
          // $('#name_en').val($("form").serializeObject().name_en);
          // $('#edit').modal('hide');
          //  $.notify({
          //   message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-ok-sign'></i>&nbsp;<strong>نجح:</strong> تم التعديل بنجاح </p>"
          //   },{
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
          //     enter: 'animated bounceInDown',
          //     exit: 'animated bounceOutUp'
          //   },
          // });
        }
      });
    }
    return false;
  });

});