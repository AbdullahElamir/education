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
    var isvalidate=$("#sub_group").valid();
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
            '<td id="name-'+data.id+'">'+data.Subject.name+'</td>'+
            '<td id="code-'+data.id+'">'+data.Subject.code+'</td>'+
            '<td id="Faculty_member-'+data.id+'">'+data.Faculty_member.name+'</td>'+
            '<td id="sub_group_name-'+data.id+'">'+data.sub_group_name+'</td>'+
            '<td id="quantity-'+data.id+'">'+data.quantity+'</td>'+
            '<td id="Location-'+data.id+'">'+data.Location.name+'</td>'+
            '<td class="text-center">'+
              '<p data-placement="top" data-toggle="tooltip" title="تعديل">'+
                '<button id="editSub" value="'+data.id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs editSub"><span class="glyphicon glyphicon-pencil"></span></button>'+
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
    $.get('/semester/deleteSubGroup/'+id,function(result){
      switch(result.msg){
        case "1" :
          $('#delete').modal('hide');
          $('[data-id = "'+id+'"]').remove();
          custNotify("success","نجح","تم الغاء هذه المادة من الفصل بنجاح","ok-sign","bounceInDown","bounceOutUp");
          break;
        case "2" :
          $('#delete').modal('hide');
          custNotify("danger","فشل","لايمكن حذف هذه المادة من الفصل لادراسي لاعتماد بعض الكيانات عليها","warning-sign","bounceIn","bounceOut");
          break;

      }
    });
  });
  $('body').on('click', '.editSub', function(){
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
    var isvalidate=$("#editForm").valid();
    if(isvalidate){
      $.post("/semester/updateSub", {body:$("#editForm").serializeObject(),id:$('#editSubGr').val()}, function(data, error){
        if(data ==null){
          // $("#err").empty();
          // for (err in data.result) {
          //   $("#err").append('<h1>'+data.result[err].msg+'</h1>');
          // }
        } 
        else {
          console.log("gothere");
          var subGId = $('#editSubGr').val();
          console.log(subGId);
          $('#name-'+subGId).html(data.Subject.name);
          $('#code-'+subGId).html(data.Subject.code);
          $('#Faculty_member-'+subGId).html(data.Faculty_member.name);
          $('[data-id = "'+subGId+'"]').data('fac',data.Faculty_member.id);
          $('#sub_group_name-'+subGId).html(data.sub_group_name);
          $('[data-id = "'+subGId+'"]').data('groupname',data.sub_group_name);
          $('#quantity-'+subGId).html(data.quantity);
          $('[data-id = "'+subGId+'"]').data('quantity',data.quantity);
          $('#Location-'+subGId).html(data.Location.name);
          $('[data-id = "'+subGId+'"]').data('loc',data.Location.id);
          $('#edit').modal('hide');
        }
      });
    }
    return false;
  });
  
  // This function to remove and reset "form" from validation and value when close or hide bootstrap modal!
  $('#add, #edit').on('hidden.bs.modal', function(){
    $(this).removeData('bs.modal');
    $('#sub_group_name, #quantity').val("");
    $('.selectpicker').selectpicker('val', null);
    $('#sub_group, #editForm').validate().resetForm();
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
  
  $("#editForm").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      faculty_Members:{
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
      locations:{
        required:true,
      },
    },
    messages:{
      faculty_Members:{
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
      locations:{
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