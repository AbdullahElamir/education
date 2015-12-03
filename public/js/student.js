$(document).ready(function(){

  var nat = new Array();

  $('body').on('click', '#Deletee', function(){
    alert("delete");
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/student/deleteStudent/'+$(this).val(),function(result){
      //$('[data-id = "'+id+'"]').remove();
      switch(result.msg){
        case "1" :
          $('[data-id = "'+id+'"]').remove();
          custNotify("success","نجح","تم حذف لاطالب/الطالبة بنجاح","ok-sign","bounceInDown","bounceOutUp");
          break;
        case "2" :
          $('#delete').modal('hide');
          custNotify("danger","فشل","لايمكن حذف الطالب/الطالبة  لاعتماد بعض الكيانات عليها/عليه ","warning-sign","bounceIn","bounceOut");
          break;
      }
    });
  });

  $.get('/student/getAllNationality/',function(todo){
    for (var i = 0; i < todo.length; i++) {
      var k = new Object({id : i,value : todo[i].id, text : todo[i].name});
      nat.push(k);
    };
  });
    
  $('body').on('click', '#editt',function(){
    $('#id_Student').val($(this).val());  
    var myDataAttr = $(this).val();
    var bDate = $('[data-id = "'+myDataAttr+'"]').data('birth_date');
    var bb = bDate.split(" ");
    var cdate = $('[data-id = "'+myDataAttr+'"]').data('date_cert')
    var cd = cdate.split(" ");
    $('#first_name_edit').val($('[data-id = "'+myDataAttr+'"]').data('first_name'));
    $('#first_name_en').val($('[data-id = "'+myDataAttr+'"]').data('first_name_en'));
    $('#father_name_edit').val($('[data-id = "'+myDataAttr+'"]').data('father_name'));
    $('#father_name_en').val($('[data-id = "'+myDataAttr+'"]').data('father_name_en'));
    $('#grand_name_edit').val($('[data-id = "'+myDataAttr+'"]').data('grand_name'));
    $('#grand_name_en').val($('[data-id = "'+myDataAttr+'"]').data('grand_name_en'));
    $('#last_name_edit').val($('[data-id = "'+myDataAttr+'"]').data('last_name'));
    $('#last_name_en').val($('[data-id = "'+myDataAttr+'"]').data('last_name_en'));
    $('#mother_name').val($('[data-id = "'+myDataAttr+'"]').data('mother_name'));
    $('#mother_name_en').val($('[data-id = "'+myDataAttr+'"]').data('mother_name_en'));
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
    $('#birth_date').val(bb[3]);
    $('#date_cert').val(cd[2]+"-"+cd[3]+"-"+cd[1]);
    $('#place_cert').val($('[data-id = "'+myDataAttr+'"]').data('place_cert'));
    $('#set_number').val($('[data-id = "'+myDataAttr+'"]').data('set_number'));
    $('#student_rate').val($('[data-id = "'+myDataAttr+'"]').data('student_rate'));
    $('#nid').val($('[data-id = "'+myDataAttr+'"]').data('nid'));
  });

  $('body').on('click', '#save', function (e) {
    e.preventDefault();
    $('#updateStudent').submit();
  });

  $("#updateStudent").submit(function(e) {
    var isvalidate = $("#updateStudent").valid(),
        obj = $("form").serializeObject();
    if(isvalidate){
      $.post("/student/updateStudent", obj, function(data, error){
        if(data !=true){
        }
        else {
          if( obj.gender == 0 ){
              var gender = "ذكر";
            }
            else {
              var gender = "أنثى";
            }
          $('[data-id = "'+obj.id+'"]').remove();
          $("#tbody").prepend('<tr data-id="'+obj.id+'" data-first_name="'+obj.first_name+'" data-first_name_en="'+obj.first_name_en+'" data-father_name="'+obj.father_name+'" data-father_name_en="'+obj.father_name_en+'" data-grand_name="'+obj.grand_name+'" data-grand_name_en="'+obj.father_name_en+'" data-last_name="'+obj.last_name+'" data-last_name_en="'+obj.father_name_en+'" data-mother_name="'+obj.mother_name+'" data-mother_name_en="'+obj.father_name_en+'" data-birth_date="'+obj.birth_date+'" data-place_birth="'+obj.place_birth+'" data-nationality="'+obj.nationality+'" data-gender="'+obj.gender+'" data-no_paper_family="'+obj.no_paper_family+'" data-no_reg_family="'+obj.no_reg_family+'" data-physical_address="'+obj.physical_address+'" data-civil_reg="'+obj.civil_reg+'" data-phone="'+obj.phone+'" data-father_work_place="'+obj.father_work_place+'" data-last_cert="'+obj.last_cert+'" data-cust_last_cert="'+obj.cust_last_cert+'" data-date_cert="'+obj.date_cert+'" data-place_cert="'+obj.place_cert+'" data-set_number="'+obj.set_number+'" data-student_rate="'+obj.student_rate+'" data-nid="'+obj.nid+'">'+
              '<td>'+
                obj.set_number+
              '</td>'+
              '<td>'+
                obj.first_name+'  '+
                obj.father_name+'  '+
                obj.grand_name+'  '+
                obj.last_name+
              '</td>'+
              '<td class="text-center">'+
                gender+
              '</td><td>'+
                obj.physical_address+
              '</td>'+
              '<td class="text-center">'+
                obj.student_rate+
              '</td>'+
              '<td class="text-center">'+
                nat[obj.nationality-1].text+
              '</td>'+
              '<td class="text-center">'+
                '<p data-placement="top" data-toggle="tooltip" title="تعديل">'+
                  '<button id="editt" value="'+obj.id+'" data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-pencil"></span></button>'+
                '</p>'+
              '</td>'+
              '<td class="text-center">'+
                '<p data-placement="top" data-toggle="tooltip" title="تنزيل">'+
                  '<a href="/transcript/studentData/'+obj.id+'" id="downloadSubject" value="'+obj.id+'" data-title="تنزيل" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-arrow-down"></span></a>'+
                '</p>'+
              '</td>'+
              '<td class="text-center">'+
                '<p data-placement="top" data-toggle="tooltip" title="إلغاء">'+
                  '<button id="Deletee" value="'+obj.id+'" data-title="Deletee" data-toggle="modal" data-target="#delette" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button>'+
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