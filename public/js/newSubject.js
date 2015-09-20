$(document).ready(function(){
  
  var iddd =[];
  var subject=[];
  var toggle =1;
  $('#subjectId').on('change', function() {
    var check=$.inArray($('#subjectId>option:selected').text(),subject)
    if(check == -1 ) {
      iddd.push($(this).val() );
      subject.push($('#subjectId>option:selected').text());
      $("#my").append("<tr><td class='text-center'>"+$('#subjectId>option:selected').text()+"</td><td class='text-left'><p data-placement='top' data-toggle='tooltip' title='إلغاء'><button type='button' id='dela' value='"+$(this).val()+"' data-id"+$(this).val()+"="+$('#subjectId>option:selected').text()+"  class='btn btn-danger btn-xs'><span class='glyphicon glyphicon-trash'></span></button></td></tr>");
    }
    else {
      custNotify("danger","خطأ","عفوا لايمكن ادخال المادة مرتين","warning-sign","bounceInDown","bounceOutUp");
    }    
  });

  function removeItem(array, item){
    for(var i in array) {
      if(array[i]==item) {
        array.splice(i,1);
        break;
      }
    }
    return array;
  }

  var x,y=[];
  $('body').on('click', '#dela', function() {
    x=removeItem(iddd,$(this).val());
    if(x== 0) {
      $("#my").empty();
      iddd=[];
      subject=[];
    }
    else {
      $.post('/subject/getSub/',{x:x},function(subject) {
        var is=[];
        var su=[];
        for(i in subject) {
          is.push(subject[i].id); 
          su.push(subject[i].name);
        }
        $("#my").empty();
        for(var i=0;i<is.length;i++) {
          $("#my").append("<tr><td class='text-center'>"+su[i]+"</td><td class='text-left'><p data-placement='top' data-toggle='tooltip' title='إلغاء'><button type='button' id='dela' value='"+is[i]+"'  class='btn btn-danger btn-xs'><span class='glyphicon glyphicon-trash'></span></button></td></tr>");
        }
        iddd=is;
        subject=su;
      });
      iddd=is;
      subject=su;
    }
  });

  $('body').on('click', '#save', function() {
    var isvalidate=$("#newSubject ,#updateSubject").valid();
    if($("#newSubject input[type='radio']:checked").val() == 1) {
      var obj = {name: $('#name').val(), name_en: $('#name_en').val() , code : $('#code').val() ,no_th_unit : $('#no_th_unit').val() , no_th_hour : $('#no_th_hour').val(), no_pr_unit: $('#no_pr_unit').val() ,no_pr_hour: $('#no_pr_hour').val(),chapter_degree: $('#chapter_degree').val() ,final_theor:  $('#final_theor').val(),final_practical: $('#final_practical').val() ,system_type : toggle,DepartmentId: 1 ,subject_type :  1,idd:iddd,mul:$('#departmentMulSeln').val()}; 
      if(isvalidate){
        $.post('/subject/saveSubject',obj,function(todo){
          if(todo == true) {
            window.location.href="/subject?msg=1";
          } 
          else {
            custNotify("danger","خطأ","عفوا لايمكن ادخال المادة مرتين","warning-sign","bounceInDown","bounceOutUp");
          }
        });
      } 
    } 
    else {
      var obj = {name: $('#name').val(), name_en: $('#name_en').val() , code : $('#code').val() ,no_th_unit : $('#no_th_unit').val() , no_th_hour : $('#no_th_hour').val(), no_pr_unit: $('#no_pr_unit').val() ,no_pr_hour: $('#no_pr_hour').val(),chapter_degree: $('#chapter_degree').val() ,final_theor:  $('#final_theor').val(),final_practical: $('#final_practical').val() ,system_type : toggle,DepartmentId: $('#department_iddepartment').val() ,subject_type :  $("#newSubject input[type='radio']:checked").val(),idd:iddd,mul:$('#departmentMulSeln').val()}; 
      if(isvalidate){
        $.post('/subject/saveSubject',obj,function(todo){
          if(todo == true) {
            window.location.href="/subject?msg=1";
          } 
          else {
            
            custNotify("danger","خطأ","عفوا لايمكن ادخال المادة مرتين","warning-sign","bounceInDown","bounceOutUp");
          }
        });
      } 
    }
  });

  $('body').on('click', '#sh', function() {
    var id = $(this).val();
    $.get('/subject/getSubject/'+id,function(sub){
      $('#subject_name').val(sub.subject[0].name);
      $('#subject_name_en').val(sub.subject[0].name_en);     
      $('#subject_no_th_unit').val(sub.subject[0].no_th_unit);
      $('#chapter_degree').val(sub.subject[0].chapter_degree);
      $('#final_theor').val(sub.subject[0].final_theor);
      $('#final_practical').val(sub.subject[0].final_practical);
      $('#subject_code').val(sub.subject[0].code);
      if(sub.subject[0].subject_type==1) {
        var x= "عامة";
        $('#department').val(sub.subject[0].Department.name);
      } 
      else if (sub.subject[0].subject_type==2) {
        $('#department').val(sub.subject[0].Department.name);
       var x= "خاصة";
      } 
      else if(sub.subject[0].subject_type==3){
        $('#department').val(sub.subject[0].Department.name);
        var x= "كلاهما";
      }else if(sub.subject[0].subject_type==4){
        var x = "اقسام";
      }
      $('#subject_type').val(x);
      if(sub.subject[0].system_type==1) {
        var y= "فصل";
      } 
      else if (sub.subject[0].system_type==2) {
        var y= "عام";
      }
      $('#System_Type').val(y);
      
      $('#user').val(sub.subject[0].User.name);
    });
  });

  var subj=[];
  var subjId=[];
  var count;
  var x=0;
  $('body').on('click', '#ed', function() {
    $('#edittt').val($(this).val());
    x=$(this).val();
    subj=[];
    subjId=[];
      $("#myy ").empty();
      $.get('/subject/getpreSubject/'+$(this).val(),function(sub){
      $("#myy").append("<table id='myy' class='table table-bordered'><th class='text-center'>المواد التمهيدية</th></div>");
      for (i in sub){
        subj.push(sub[i].name);
        subjId.push(sub[i].id);
        count=sub.length;
        $("#myy").append("<tr><td class='text-center'>"+sub[i].name+"</td><td><p data-placement='top' data-toggle='tooltip' title='إلغاء'><button type='button' id='delee' value='"+sub[i].id+"'   class='btn btn-danger btn-xs'><span class='glyphicon glyphicon-trash'></span></button></td></tr></table>");    
      } 
    });
  });

  $('body').on('click', '#delee', function() {
    subj=[];
    subjId=[];
    $("#myy ").empty();
    var objj={pre:$(this).val() ,sub:x}
    $.post('/subject/deletePre/',objj,function(subject){
      $.get('/subject/getpreSubject/'+x,function(sub){
        $("#myy").append("<table id='myy' class='table table-bordered'><th class='text-center'>المواد التمهيدية</th></div>");
        for (i in sub){
          subj.push(sub[i].name);
          subjId.push(sub[i].id);
          count=sub.length;
          $("#myy").append("<tr><td class='text-center'>"+sub[i].name+"</td><td><p data-placement='top' data-toggle='tooltip' title='إلغاء'><button type='button' id='delee' value='"+sub[i].id+"'   class='btn btn-danger btn-xs'><span class='glyphicon glyphicon-trash'></span></button></td></tr></table>");    
        } 
      });
    });
  });

  $('body').on('click', '#edittt', function() {
    var obj ={subName :subj , subPreId : subjId , subjectId : $(this).val() ,count :count}
    $.post('/subject/updatePree/',obj,function(subject){
    });   
  });

  $('#subject_id').on('change', function() {
    var subName= $('#subject_id>option:selected').text();
    var subId=$(this).val();
    var check=$.inArray(subName,subj);
    if(check == -1) {
      subj.push(subName);
      subjId.push(subId);
      $("#myy").append("<tr id='hii'><td class='text-center'>"+subName+"</td><td><p ></p><button id='delee' value='"+subId+"'   class='btn btn-danger btn-xs'><span class='glyphicon glyphicon-trash'></span></button></td></tr></table>");    
    }
    else { 
      $("#edit").modal('hide');
      custNotify("danger","خطأ","عفوا لقد قمت بإدخال المادة سابقا","warning-sign","bounceIn","bounceOut");
    }
  });
  $('#radiod').on('change', function() {
    if($(this).val()==4){
      // $('#tabThree').tab('show');
      $('a[href=#tabThree]').tab('show');
      $('#tabThreec').show();
    }
  });
  $('body').on('click', '#ed', function() {
    var id = $(this).val();
    $.get('/subject/getSubject/'+id,function(sub){
      $('#name').val(sub.subject[0].name);
      $('#name_en').val(sub.subject[0].name_en);
      $('#code').val(sub.subject[0].code);
      $('#subject_type').val(sub.subject[0].subject_type);
      $('#no_th_unit').val(sub.subject[0].no_th_unit);
      $('#no_prr_unit').val(sub.subject[0].no_pr_unit); 
      $('#no_th_hour').val(sub.subject[0].no_th_hour);
      $('#no_prr_hour').val(sub.subject[0].no_pr_hour);
      $('#chapter_degre').val(sub.subject[0].chapter_degree);
      $('#final_theorr').val(sub.subject[0].final_theor);
      $('#final_practicall').val(sub.subject[0].final_practical);
      $('#id').val(sub.subject[0].id);
      if(sub.subject[0].subject_type == 1) {
        //عام
        $('#js_radio').prop("checked",true);
        $('[id^="department_select"]').hide(200);
        $('#tabThree').hide();
        
      }
      else if(sub.subject[0].subject_type == 2) {
        // خاص
        $('#radio').prop("checked",true);
        $('[id^="department_select"]').show(200);
        $('#tabThreec').hide();
        $('#department_select option[value="'+sub.subject[0].DepartmentId+'"]').prop('selected', 'selected').change();
      }
      else if(sub.subject[0].subject_type==3) {
        //كلاهما
        $('#radioo').prop("checked",true);
        $('#tabThreec').hide();
        $('[id^="department_select"]').show(200);
        $('#department_select option[value="'+sub.subject[0].DepartmentId+'"]').prop('selected', 'selected').change();
      }else if(sub.subject[0].subject_type==4){
        $('#radiod').prop("checked",true);
        $('#tabThreec').show();
        $('#myS').empty();
        for(var i=0;i<sub.resl.length;i++){
          $('#myS').append("<tr data-id='ds"+sub.resl[i].id+"'><td class='text-center'>"+sub.resl[i].Department.name+"</td><td><p ></p><button id='delS' value='"+sub.resl[i].id+"'   class='btn btn-danger btn-xs'><span class='glyphicon glyphicon-trash'></span></button></td></tr></table>");    
        }
      }
    });  
  });

  $('body').on('click', '#del', function() {
    $('#ok').val($(this).val());
  });
  
  $('body').on('click', '#delS', function() {
    var id=$(this).val();
    $.get('/subject/deleteDepartSubject/'+$(this).val(),function(todo) {
      switch(todo.msg){
        case "1" :
          // custNotify("success","نجح","لقد تم مسح القسم بنجاح","ok-sign","bounceInDown","bounceOutUp");
          $('#myS [data-id = "ds'+id+'"]').remove();
          break;
        case "2" :
          // custNotify("danger","فشل","لايمكن مسح القسم","warning-sign","bounceInDown","bounceOutUp");
          break;
        default:
          break; 
      }
    });
  });
  $('#departmentMul').on('change', function() {
    var ob={SubjectId:$('#id').val(),DepartmentId:$(this).val()}
    $.post('/subject/addDepatSub/',ob,function(sub) {
      if(sub){
        // $("#edit").modal('hide');
        $('#myS').append('<tr data-id="ds'+sub.id+'"><td class="text-center">'+sub.Department.name+'</td><td><p></p><button id="delS" value="'+sub.id+'" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></button></td></tr>');
        custNotify("success","نجح","لقد تم اضافة القسم بنجاح","ok-sign","bounceInDown","bounceOutUp");
      }else{
        // $("#edit").modal('hide'); 
        custNotify("danger","فشل","لايمكن اضافة القسم","warning-sign","bounceInDown","bounceOutUp");
      }
    });
  });
  $('body').on('click','#ok', function() {
    var id=$(this).val();
    $.get('/subject/deleteSubject/'+$(this).val(),function(todo) {
      switch(todo.msg){
        case "1" :
          custNotify("success","نجح","لقد تم مسح المادة بنجاح","ok-sign","bounceInDown","bounceOutUp");
          $('[data-id = "'+id+'"]').remove();
          break;
        case "2" :
          custNotify("danger","فشل","لايمكن مسح المادة لوجود كيانات معتمدة عليها","warning-sign","bounceInDown","bounceOutUp");
          break;
        default:
          break; 
      }
    });
  });

  $('#department_select').hide(0);
  $('#departmentMul').hide(0);
  
  $('.radiooo ,.radioo').change(function() { 
    // $('#tabThreec').hide();

    $('#department_select').show(200);
    $('#departmentMuln').hide(200);
  });

  $('.radio_js').change(function() {
    $('#department_select').hide(200);
    // $('#tabThreec').hide();
    $('#departmentMuln').hide(200);
  });
  $('.radioM').change(function() {
    $('#departmentMuln').show(200);
    $('#department_select').hide(200);
  });
  $("#Semesters").show(0); 
  $("#Year").hide(0);
  $('#toggle-subject').change(function() {
    if ($(this).prop('checked') == true) {
      toggle = 2;
    }
    else {
      toggle = 1;
    }
  });  
  
  $("#newSubject").validate({
    rules:{
      name:{
        required: true,
      },
      name_en:{
        required: true,
      },
      no_th_unit:{
        required: true,
        number: true,
      },
      no_th_hour:{
        required: true,
        number: true,
      },
      code:{
        required: true,
      },
      no_pr_unit:{
        required: true,
        number: true,
      },
      no_pr_hour:{
        required: true,
        number: true,
      },
      chapter_degree:{
        required: true,
      },
      final_theor:{
        required: true,
      },
      final_practical:{
        required: true,
      },
      subjectId:{
        required: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء أدخال اسم المادة",
      },
      name_en:{
        required: "!Please enter Subject name",
      },
      no_th_unit:{
        required: "الرجاء أدخال عدد الوحدات النظري",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      no_th_hour:{
        required: "الرجاء أدخال عدد سعات النظري",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      code:{
        required: "الرجاء أدخال رمز المادة",
      },
      no_pr_unit:{
        required: "الرجاء ادخال عدد وحدات العملي",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      no_pr_hour:{
        required: "الرجاء أدخال عدد سعات العملي",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      chapter_degree:{
        required: "الرجاء أدخال درجة اعمال السنة",
      },
      final_theor:{
        required: "الرجاء أدخال درجة الامتحان النظري",
      },
      final_practical:{
        required: "الرجاء أدخال درجت العملي",
      },
      subjectId:{
        required: "الرجاء اختيار المواد التمهدية!",
      },
    },
    errorClass: 'custom-error',
    errorPlacement: function(error, element) {
      if(element.parent('.input-group').length) {
          error.insertAfter(element.parent());
      }
      if(!(element.parent('.input-group').length)) {
          element.parent().append(error);
      }
    },
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
    invalidHandler: function(event, validator) {
      var errors = validator.numberOfInvalids();
      if (errors) {
        custNotify("danger","خطأ","الرجاء التأكد من صحة ادخال البيانات","warning-sign","bounceIn","bounceOut");
      }
    },
  });
  
  $("#updateSubject").validate({
    rules:{
      name:{
        required: true,
      },
      name_en:{
        required: true,
      },
      no_th_unit:{
        required: true,
        number: true,
      },
      no_th_hour:{
        required: true,
        number: true,
      },
      code:{
        required: true,
      },
      no_pr_unit:{
        required: true,
        number: true,
      },
      no_pr_hour:{
        required: true,
        number: true,
      },
      chapter_degree:{
        required: true,
      },
      final_theor:{
        required: true,
      },
      final_practical:{
        required: true,
      },
      subjectId:{
        required: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء أدخال اسم المادة",
      },
      name_en:{
        required: "!Please enter Subject name",
      },
      no_th_unit:{
        required: "الرجاء أدخال عدد الوحدات النظري",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      no_th_hour:{
        required: "الرجاء أدخال عدد سعات النظري",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      code:{
        required: "الرجاء أدخال رمز المادة",
      },
      no_pr_unit:{
        required: "الرجاء ادخال عدد وحدات العملي",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      no_pr_hour:{
        required: "الرجاء أدخال عدد سعات العملي",
        number: "خطأ الرجاء أدخال ارقام فقط",
      },
      chapter_degree:{
        required: "الرجاء أدخال درجة اعمال السنة",
      },
      final_theor:{
        required: "الرجاء أدخال درجة الامتحان النظري",
      },
      final_practical:{
        required: "الرجاء أدخال درجت العملي",
      },
      subjectId:{
        required: "الرجاء اختيار المواد التمهدية!",
      },
    },
    errorClass: 'custom-error',
    errorPlacement: function(error, element) {
      if(element.parent('.input-group').length) {
          error.insertAfter(element.parent());
      }
      if(!(element.parent('.input-group').length)) {
          element.parent().append(error);
      }
    },
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
  });

  $('#system_type').on('change',function() {
    $('select[name="sem_type"]').each(function() {
      var id = $('#system_type').val();
      if(id==1){
        $(this).rules("add", {
          required: true,
          messages: {
            required: "الرجاء اختيار الفصل الدراسي!",
          }
        });
      }
      else {
        $(this).rules( 'remove', 'required' );
      }    
    });
    var id = $('#system_type').val();
    if(id==1){
      $('#sem_type').show();
    }
    else {
      $('#sem_type').hide();
      $('.sem_type').selectpicker('val', '');
    }
  });
  
  var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
      var p=a[i].split('=', 2);
      if (p.length == 1)
        b[p[0]] = "";
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&'));

  if(qs["msg"]==1){
    custNotify("success","نجح","تمت إضافة مادة دراسية جديدة بنجاح","ok-sign","bounceInDown","bounceOutUp");
    var pageUrl = '/subject'
    window.history.pushState("","",pageUrl);
  }
  $('#subject_search_btn').on('click', function(){
    window.location.href="/subject?q="+$('#subject_search').val();
  });  
  $("#subject_search").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 13  )
      {
      $("#subject_search_btn").click(); 
      }
  });
});
