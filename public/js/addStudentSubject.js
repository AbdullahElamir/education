$(document).ready(function(){
  isSuccessful = function(){
    var degre=[];
    var ratioDegre=[];
    var degreeChapter,degreeFinal,degreeSum;
    var ratioDegreChapter,ratioDegreFinal,RatioSum;
    for(var i=0;i<($('#degree tr').length-1) ;i++ ){
      degreeChapter=$("#degree #chapter"+i).text();
      ratioDegreChapter=$("#degree #chap"+i).text();
      degreeFinal=$("#degree #fina"+i).text();
      ratioDegreFinal=$("#degree #fin"+i).text();
      degreeSum=$("#degree #summm"+i).text();
      RatioSum=$("#degree #summ"+i).text();
      var t=0,r=0;
      if(degreeFinal<parseInt((0.55*ratioDegreFinal))){
        $("#degree #final"+i).css({ 'background-color' : '  #ee9ca7'});
        t=1; 
      } else {
        t=0;
      } 
      if(degreeSum<parseInt((RatioSum*0.55))){
        $("#degree #sum"+i).css({ 'background-color' : '  #ee9ca7'});  
        r=1;
      } else {
        r=0;
      }
      if(t==0 && r==0){
        $("#status"+i).html('نــاجح');
      }          
      if(t==1 || r==1){
        $("#status"+i).html('راســب');
      }
    }
  },
  isSuccessful();
    $('#generale_teble').hide(0);
    $('#Division_teble').hide(0);
    $('body').on('click', '#Department_bt', function(){
    $('#generale_teble').hide(200);
    $('#Department_teble').show(200);
    $('#Division_teble').hide(200);
  });
  $('body').on('click', '#generale_bt', function(){
    $('#Department_teble').hide(200);
    $('#Division_teble').hide(200);
    $('#generale_teble').show(200);
  });
  $('body').on('click', '#Division_bt', function(){
    $('#Department_teble').hide(200);
    $('#Division_teble').show(200);
    $('#generale_teble').hide(200);
  });
  
  $('body').on('click', '#viw', function (e) {
    $('#upres').val($(this).val());
    $('#chapter_degree').val($('[data-id = "'+$(this).val()+'"]').data('deg'));
    $('#final_exam').val($('[data-id = "'+$(this).val()+'"]').data('fin'));
    $('#subject_status').selectpicker('val' ,$('[data-id = "'+$(this).val()+'"]').data('sub'));
    $('#result_case').selectpicker('val' ,$('[data-id = "'+$(this).val()+'"]').data('case')); 
  });
  $('body').on('click', '#del', function (e) {
    $('#ok').val($(this).val());
  });
  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/transcript/deletetranscript/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  });
  $('body').on('click', '#adAc', function (e) {
    $('#subG').val($(this).val());
  });

  $('body').on('click', '#submit', function (e) {
    e.preventDefault();
    $('#addForm').submit();
  });

  $("#addForm").submit(function(e) {
    var isvalidate=$("#addForm").valid();
    if(isvalidate){
      $.post("/transcript/addStudentSubject", $("#addForm").serializeObject(), function(data, error){
          url=document.URL;
          var id = url.substring(url.lastIndexOf('/') + 1);
          if(data==false){
            $('#add').modal('hide');
            custNotify("danger","خطا","هذه المادة موجودة","warning-sign","bounceInDown","bounceOutUp");
          } else  {
          window.location.href='/transcript/addStudentSubject/'+id;
          }

/*        if(data!=false){
          $("#Acbody").prepend('<tr data-id="'+data.id+'" data-sub="'+data.subject_status+'" data-case="'+data.result_case+'" data-deg="'+data.chapter_degree+'" data-fin="'+data.final_exam+'">'+
            '<td>'+data.Sub_group.Subject.name+'</td>'+
            '<td>'+data.Sub_group.Subject.name_en+'</td>'+
            '<td>'+data.Sub_group.Subject.code+'</td>'+
            '<td>'+data.Sub_group.sub_group_name+'</td>'+
            '<td class="text-center">'+
              '<p data-placement="top" data-toggle="tooltip" title="تعديل">'+
                '<button id="viw" value="'+data.id+'" data-title="تعديل" data-toggle="modal" data-target="#Show_Semester" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button>'+
              '</p></td><td class="text-center">'+
              '<p data-placement="top" data-toggle="tooltip" title="حذف">'+
                '<button id="del" value="'+data.id+'" data-title="حذف" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>'
          );
          $('#add').modal('hide');
          custNotify("success","نجح","تم الاضافة بنجاح","ok-sign","bounceInDown","bounceOutUp");
        }
        else {
          $('#add').modal('hide');
          custNotify("danger","خطا","هذه المادة موجودة","warning-sign","bounceInDown","bounceOutUp");
        }
        */
      });
    }
    return false;
  });

  $('body').on('click', '#upres', function (e) {
    e.preventDefault();
    $('#updateG').submit();
  });

  
  $("#updateG").submit(function(e) {
    var isvalidate=$("#updateG").valid();
    if(isvalidate){
      $.post("/transcript/updateG", {body:$("#updateG").serializeObject(),id:$('#upres').val()}, function(data, error){
          url=document.URL;
          var id = url.substring(url.lastIndexOf('/') + 1);
          window.location.href='/transcript/addStudentSubject/'+id;
/*        $('[data-id = "'+$('#upres').val()+'"]').remove();
        $("#Acbody").prepend('<tr data-id="'+data.id+'" data-sub="'+data.subject_status+'" data-case="'+data.result_case+'" data-deg="'+data.chapter_degree+'" data-fin="'+data.final_exam+'">'+
                '<td>'+data.Sub_group.Subject.name+'</td>'+
                '<td>'+data.Sub_group.Subject.name_en+'</td>'+
                '<td>'+data.Sub_group.Subject.code+'</td>'+
                '<td>'+data.Sub_group.sub_group_name+'</td>'+
                '<td>'+data.chapter_degree+ '\\'+data.Sub_group.Subject.chapter_degree+'</td>'+
                '<td>'+data.final_exam +'\\'+ data.Sub_group.Subject.final_theor+'</td>'+
                '<td>'+data.sum_dagree+'\\'+ (data.Sub_group.Subject.final_theor + data.Sub_group.Subject.chapter_degree)+'</td>'+
                '<td class="text-center">'+
                  '<p data-placement="top" data-toggle="tooltip" title="تعديل">'+
                    '<button id="viw" value="'+data.id+'" data-title="تعديل" data-toggle="modal" data-target="#Show_Semester" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-eye-open"></span></button>'+
                  '</p></td><td class="text-center">'+
                  '<p data-placement="top" data-toggle="tooltip" title="حذف">'+
                    '<button id="del" value="'+data.id+'" data-title="حذف" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></p></td></tr>');
        $('#Show_Semester').modal('hide');
        custNotify("success","نجح","تم التعديل بنجاح","ok-sign","bounceInDown","bounceOutUp");*/
      });
    }
    return false;
  });
  
  $("#addForm").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      chapter_degree:{
        required: true,
        number: true,
      },
      final_exam:{
        required: true,
        number: true,
      },
      subject_status:{
        required:true,
      },
      result_case:{
        required:true,
      },
    },
    messages:{
      chapter_degree:{
        required: "الرجاء ادخال أعمال السنة!",
        number: "الرجاء ادخال ارقام فقط!",
      },
      final_exam:{
        required: "الرجاء ادخال درجة الامتحان النهائي!",
        number: "الرجاء ادخال ارقام فقط!",
      },
      subject_status:{
        required:"الرجاء اختيار حالة المادة!",
      },
      result_case:{
        required:"الرجاء اختيار التقدير!",
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
  
  $('#add').on('hidden.bs.modal', function(){
    $(this).removeData('bs.modal');
    $('.form-group').removeClass('has-error');
    $('#chapter, #final').val("");
    $('.selectpicker').selectpicker('val', null);
    $('#addForm').validate().resetForm();
  });

});