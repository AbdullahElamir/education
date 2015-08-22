$(document).ready(function(){
  $('body').on('click','#sbj', function () {
    $('#SubjectId').val($(this).val());
    $('#DivisionId').val($(this).data('div'));
    $('#addd').val($(this).data('div'));
    var myDataAttr = $(this).val();
    $('#name_s').val($('[data-id = "sbj'+myDataAttr+'"]').data('name'));
    $('#code').val($('[data-id = "sbj'+myDataAttr+'"]').data('code'));

  });
  // $('body').on('click','#addd', function () {
  //     $("#tbody").prepend('<tr data-id="1">'+
  //             '<td>رياضة</td>'+
  //             '<td>M101</td>'+
  //             '<td> محمد خليف ساسي</td>'+
  //             '<td> A1</td>'+
  //             '<td> 50</td>'+
  //             '<td> شهيد الواجب</td>'+
  //             '<td class="text-center">'+
  //             '<p data-placement="top",data-toggle="tooltip",title="تعديل">'+
  //             '<button id="enable" title="Edit" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>'+
  //             '<td class="text-center">'+
  //             '<p data-placement="top",data-toggle="tooltip",title="تعديل">'+
  //             '<button id="enable" title="Edit" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-remove"></span></button></p></td>');

      
  //     $('[data-id = "2"]').remove();
  // });

  $('body').on('click', '#addd', function (e) {
    e.preventDefault();
    $('#sub_group').submit();
  });

  $("#sub_group").submit(function(e) {
    var isvalidate=true//$("#sub_group").valid();
    if(isvalidate){
      $.post("/semester/subGrop", $("#sub_group").serializeObject(), function(data, error){
        if(data ==null){
          // $("#err").empty();
          // for (err in data.result) {
          //   $("#err").append('<h1>'+data.result[err].msg+'</h1>');
          // }
        } 
        else {
          $("#tbody"+$('#addd').val()+" ").prepend('<tr data-idd="'+data.DivisionId+'" data-id="'+data.id+'" >'+
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
          $("#tbody"+$('#editSubGr').data('idd')+" ").prepend('<tr  data-idd="'+data.DivisionId+'" data-id="'+data.id+'" >'+
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
  
});