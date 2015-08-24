$(document).ready(function(){
  $('body').on('click','#sbj', function () {
    $('#SubjectId').val($(this).val());
    $('#DivisionId').val($(this).data('div'));
    $('#addd').val($(this).data('div'));
    var myDataAttr = $(this).val();
    $('#name_s').val($('[data-id = "sbj'+myDataAttr+'"]').data('name'));
    $('#code').val($('[data-id = "sbj'+myDataAttr+'"]').data('code'));

  });
 

  $('body').on('click', '#addd', function (e) {
    e.preventDefault();
    $('#sub_group').submit();
  });

  $("#sub_group").submit(function(e) {
    var isvalidate=true//$("#sub_group").valid();
    if(isvalidate){
      $.post("/semester/subGroup", $("#sub_group").serializeObject(), function(data, error){
        if(data ==null){
          // $("#err").empty();
          // for (err in data.result) {
          //   $("#err").append('<h1>'+data.result[err].msg+'</h1>');
          // }
        } 
        else {
          $("#tbody"+$('#addd').val()+" ").prepend('<tr  data-idd="'+data.DivisionId+'" data-id="'+data.id+'" data-name = "'+data.Subject.name+'" data-code ="'+data.Subject.code+'" data-fac ="'+data.Faculty_member.id+'" data-groupname="'+data.sub_group_name+'" data-quantity="'+data.quantity+'" data-loc="'+data.Location.id+'">'+
            '<td>'+data.Subject.name+'</td>'+
            '<td>'+data.Subject.code+'</td>'+
            '<td>'+data.Faculty_member.name+'</td>'+
            '<td>'+data.sub_group_name+'</td>'+
            '<td>'+data.quantity+'</td>'+
            '<td>'+data.Location.name+'</td>'+
            '<td class="text-center">'+
              '<p data-placement="top" data-toggle="tooltip" title="تعديل">'+
                '<button value="'+data.id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button>'+
              '</p></td>'+
            '<td class="text-center">'+
              '<p data-placement="top" data-toggle="tooltip" title="تعديل">'+
                '<button id="delSub" value="'+data.id+'" data-title="Edit" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>'+
              '</p></td></tr>');

          $('#add').modal('hide');

        }
      });
    }
    return false;
  });

  $('body').on('click', '#delSub', function(){
    $('#yes').val($(this).val());
  });

  $('body').on('click', '#yes', function(){
    var id=$(this).val();
    $.get('/semester/deleteSubGroup/'+id,function(todo){
      $('#delete').modal('hide');
      $('[data-id = "'+id+'"]').remove();
    });
  });

  $('body').on('click', '#editSub', function(){
    var myDataAttr = $(this).val();
    $('#editSubGr').val(myDataAttr);
    $('#editSubGr').data('idd',$('[data-id = "'+myDataAttr+'"]').data('idd'));
    $('#name_e').val($('[data-id = "'+myDataAttr+'"]').data('name'));
    $('#code_e').val($('[data-id = "'+myDataAttr+'"]').data('code'));
    $('#faculty_Member').selectpicker('val', $('[data-id = "'+myDataAttr+'"]').data('fac'));
    $('#sub_group_n').val($('[data-id = "'+myDataAttr+'"]').data('groupname'));
    $('#quantit').val($('[data-id = "'+myDataAttr+'"]').data('quantity'));
    $('#location').selectpicker('val', $('[data-id = "'+myDataAttr+'"]').data('loc'));
  });

  $('body').on('click', '#editSubGr', function (e) {
    e.preventDefault();
    $('#editForm').submit();
  });

  $("#editForm").submit(function(e) {
    var isvalidate=true//$("#sub_group").valid();
    if(isvalidate){
      $.post("/semester/updateSub", {body:$("#editForm").serializeObject(),id:$('#editSubGr').val()}, function(data, error){
        if(data ==null){
          // $("#err").empty();
          // for (err in data.result) {
          //   $("#err").append('<h1>'+data.result[err].msg+'</h1>');
          // }
        } 
        else {
          $('[data-id = "'+$('#editSubGr').val()+'"]').remove();
          $("#tbody"+$('#editSubGr').data('idd')+" ").prepend('<tr  data-idd="'+data.DivisionId+'" data-id="'+data.id+'" data-name = "'+data.Subject.name+'" data-code ="'+data.Subject.code+'" data-fac ="'+data.Faculty_member.id+'" data-groupname="'+data.sub_group_name+'" data-quantity="'+data.quantity+'" data-loc="'+data.Location.id+'">'+
            '<td>'+data.Subject.name+'</td>'+
            '<td>'+data.Subject.code+'</td>'+
            '<td>'+data.Faculty_member.name+'</td>'+
            '<td>'+data.sub_group_name+'</td>'+
            '<td>'+data.quantity+'</td>'+
            '<td>'+data.Location.name+'</td>'+
            '<td class="text-center">'+
              '<p data-placement="top" data-toggle="tooltip" title="تعديل">'+
                '<button value="'+data.id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button>'+
              '</p></td>'+
            '<td class="text-center">'+
              '<p data-placement="top" data-toggle="tooltip" title="تعديل">'+
                '<button id="delSub" value="'+data.id+'" data-title="Edit" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>'+
              '</p></td></tr>');

          $('#edit').modal('hide');

        }
      });
    }
    return false;
  });
  
  // This function to remove and reset "form" from validation and value when close or hide bootstrap modal!
  $('#add').on('hidden.bs.modal', function(){
    $(this).removeData('bs.modal');
    $('#sub_group_name, #quantity').val("");
    $('.selectpicker').selectpicker('val', null);
    $('#sub_group').validate().resetForm();
  });

  $("#sub_group").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      FacultyMemberId:{
        required: true,
      },
      sub_group_name:{
        required: true,
      },
      quantity:{
        required:true,
        number:true,
        digits:true,
      },
      LocationId:{
        required:true,
      },
    },
    messages:{
      FacultyMemberId:{
        required: "الرجاء اختيار اسم المحاضر/ة!",
      },
      sub_group_name:{
        required: "الرجاء ادخال رقم المجموعة!",
      },
      quantity:{
        required:"الرجاء ادخال عدد الطلبة!",
        number:"الرجاء ادخال ارقام فقط!",
        digits:"الرجاء ادخال ارقام صحيحة فقط!",
      },
      LocationId:{
        required:"الرجاء اختيار القاعة الدراسية!",
      },
    },
    errorClass: 'custom-error',
    errorPlacement: function (error, element) {
      if ($(element).is('select')) {
          element.next().after(error);
      } else {
          error.insertAfter(element);
      }
    },
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
  });
  $('.selectpicker').selectpicker().change(function(){
    $(this).valid()
  });
});