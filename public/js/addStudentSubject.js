$(document).ready(function(){

  //edit section
  //1-get the degrees from the chapter and final input 
  var ChapterDegree=0,finalDegree=0;
  $('#chapter').on("input", function() {
    ChapterDegree = this.value;
    // set Appreciation automatic to the select #result_case by function sum
    setSelectedValueToResultCase(sum(ChapterDegree,finalDegree),"#result");
  });
  //1-get the degree from the chapter and final input 
  $('#final').on("input", function() {
    finalDegree = this.value;
    //set Appreciation automatic to the select #result_case by function sum
    setSelectedValueToResultCase(sum(ChapterDegree,finalDegree),"#result");
  });

  //add section (registration degree)
  //1-get the degrees from the chapter_degree and final_exam input 
  $('#chapter_degree').on("input",function(){
    ChapterDegree = this.value;
    //set Appreciation automatic to the select #result_case by function sum
    setSelectedValueToResultCase(sum(ChapterDegree,finalDegree),"#result_case");  
  });

  //1-get the degrees from the chapter_degree and final_exam input 
  $('#final_exam').on("input",function(){
    finalDegree = this.value;
    //set Appreciation automatic to the select #result_case by function sum
    setSelectedValueToResultCase(sum(ChapterDegree,finalDegree),"#result_case");
  });

  //2-sumation the two values (cahpter+fianl degree)
  sum = function(Chapter,finall){
    return parseFloat(Chapter)+parseFloat(finall);
  },

  // 3-set Appreciation automatic to the select #result_case
  setSelectedValueToResultCase = function(someDegres,id){
    // Excelant from 85 to 100 degree
    if(someDegres>=85 ){
      $(id+' option[value="1"]').prop('selected', 'selected').change(); 
    // very good from 85 to 75 degree
    } else if(someDegres>=75 && someDegres<85) {
      $(id+' option[value="2"]').prop('selected', 'selected').change();      
    // good from 75 to 65 degree
    } else if(someDegres>=65 && someDegres<75) {
      $(id+' option[value="3"]').prop('selected', 'selected').change(); 
    // acceptable from 65 to 50 degree
    } else if(someDegres>=50 && someDegres<65) {
      $(id+' option[value="4"]').prop('selected', 'selected').change(); 
    // week from 50 to 35 degree 
    } else if(someDegres>=35 && someDegres<50) {
      $(id+' option[value="5"]').prop('selected', 'selected').change(); 
    // very week from 35 to 0 degree
    } else if(someDegres>=0 && someDegres<35) {
      $(id+' option[value="6"]').prop('selected', 'selected').change(); 
    } 
  } ,

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
      var pass=0,fail=0;
      if(degreeFinal<parseInt((0.50*ratioDegreFinal))){
        $("#degree #final"+i).css({ 'background-color' : '  #ee9ca7'});
        pass=1; 
      } else {
        pass=0;
      } 
      if(degreeSum<parseInt((RatioSum*0.50))){
        $("#degree #sum"+i).css({ 'background-color' : '  #ee9ca7'});  
        fail=1;
      } else {
        fail=0;
      }
      if(pass==0 && fail==0){

        $("#status"+i).html('نــاجح');
      }          
      if(pass==1 || fail==1){
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
    var test=$('[data-id = "'+$(this).val()+'"]').data('pract');
    $.get('/transcript/getSubjectbyAcadimId/'+$(this).val(),function(todo){
      $('#tog').val(todo.has);
        if(todo.has==2){
        // enable 
          if(test ==-8){
            $("#toggle_mod").empty();
            var html='هل حضر الامتحان العملي ؟   <input name="isPractical" id="toggleRR" data-on="نعم" data-off="لا"  type="checkbox">';
            $("#toggle_mod").append(html);
            $("#practical").prop('disabled', true);
            $("#toggle_mod").show();
            $('#toggleRR').bootstrapToggle(); 
            $('#toggleRR').prop('checked', false).change() ;
            $('#toggleRR').change(function() {
                if ($(this).prop('checked') == true) {
                  $("#practical").prop('disabled', false);
                } else {
                  $("#practical").prop('disabled', true);
                }     
            });
          } else {
            $("#toggle_mod").empty();
            $("#toggle_mod").append('هل حضر الامتحان العملي ؟  <input name="isPractical" id="toggleRR" data-on="نعم" data-off="لا"  type="checkbox">');
            $("#practical").prop('disabled', false);
            $("#toggle_mod").show();
            $('#toggleRR').bootstrapToggle(); 
            $('#toggleRR').prop('checked', true).change() ;
            $('#toggleRR').change(function() {
              if ($(this).prop('checked') == true) {
                $("#practical").prop('disabled', false);
              } else {
                $("#practical").prop('disabled', true);
              }     
            });
          }  
       }
      if(todo.has==1){
        // disable
        $("#toggle_mod").hide();     
        $("#practical").prop('disabled', true);
      }
    });
    var pract=$('[data-id = "'+$(this).val()+'"]').data('pract');
    if(pract ==-8){
      pract=0;
    }
    $('#upres').val($(this).val());
    $('#chapter_degree').val($('[data-id = "'+$(this).val()+'"]').data('deg'));
    $('#final_exam').val($('[data-id = "'+$(this).val()+'"]').data('fin'));
    $('#practical').val(pract);
    $('#subject_status').selectpicker('val' ,$('[data-id = "'+$(this).val()+'"]').data('sub'));
    $('#result_case').selectpicker('val' ,$('[data-id = "'+$(this).val()+'"]').data('case')); 
    $('#notes').selectpicker('val',$('[data-id = "'+$(this).val()+'"]').data('notes'));
  });

  $('body').on('click', '#del', function (e) {
    $('#del_subject').val($(this).val());
  });
  
  $('body').on('click', '#del_subject', function(){
    var id=$(this).val();
    $.get('/transcript/deletetranscript/'+$(this).val(),function(result){
      switch(result.msg){
        case "1" :
          $('[data-id = "'+id+'"]').remove();
          custNotify("success","نجح","تم حذف هذه المادة بنجاح","ok-sign","bounceInDown","bounceOutUp");
          break;
        case "2" :
          $('#delete').modal('hide');
          custNotify("danger","فشل","لايمكن حذف هذه المادة لاعتماد بعض الكيانات عليها","warning-sign","bounceIn","bounceOut");
          break;
      }
    });
  });

  $('#toggle-subject').change(function() {
    if ($(this).prop('checked') == true) {
      $("#parct").prop('disabled', false);
    } else {
      $("#parct").prop('disabled', true);
    }
  }); 

  $('body').on('click', '#adA', function (e) {
    /* in this line I used hidden button like global varibal to use it in the max chapter and */
    /* final degree in the validation section */
    var subgroupId= $(this).val();
    var subjectId = $('#depSub-'+subgroupId).data('subjectid');
    $.get('/transcript/getSubject/'+subjectId,function(todo){
    $('#tog').val(todo.has);
    if(todo.has==2){
        // enable
      $("#parct").prop('disabled', true);
        $("#toggle_model").show();
    }
    if(todo.has==1){
        // disable
      $("#toggle_model").hide();     
      $("#parct").prop('disabled', true);
    }
  });
    rowindex = $(this).closest('tr').index();
    $('#chapterGlobalVaribalButton').val( $("#mytablee #chap"+rowindex).text());
    $('#finalGlobalVaribalButton').val( $("#mytablee #final"+rowindex).text());
    $('#subG').val(subgroupId);   
  });

   // rowindex = $(this).closest('tr').index();
   //  $('#chapterGlobalVaribalButton').val( $("#mytablee #chap"+rowindex).text());
   //  $('#finalGlobalVaribalButton').val( $("#mytablee #final"+rowindex).text());
   //  $('#subG').val($(this).val()); 



  $('body').on('click', '#ad', function (e) {
    /* in this line I used hidden button like global varibal to use it in the max chapter and */
    /* final degree in the validation section */
    var subgroupId= $(this).val();
    var subjectId = $('#genSub-'+subgroupId).data('subjectid');
    $.get('/transcript/getSubject/'+subjectId,function(todo){
      $('#tog').val(todo.has); 
      if(todo.has==2){
        // enable  
        $("#parct").prop('disabled', true);
        $("#toggle_model").show();
      }
      if(todo.has==1){
        // disable
        $("#toggle_model").hide();     
        $("#parct").prop('disabled', true);
      }
    });
    rowindex = $(this).closest('tr').index();
    $('#chapterGlobalVaribalButton').val( $("#mytableee #chap"+rowindex).text());
    $('#finalGlobalVaribalButton').val( $("#mytableee #final"+rowindex).text());
    $('#subG').val(subgroupId);   
  });

  $('body').on('click', '#a', function (e) {
    /* in this line I used hidden button like global varibal to use it in the max chapter and */
    /* final degree in the validation section */
    var subgroupId= $(this).val();
    var subjectId = $('#divSub-'+subgroupId).data('subjectid');
    $.get('/transcript/getSubject/'+subjectId,function(todo){
      $('#tog').val(todo.has);
      if(todo.has==2){
        // enable
        $("#parct").prop('disabled', true);
        $("#toggle_model").show();
      }
      if(todo.has==1){
        // disable
        $("#toggle_model").hide();     
        $("#parct").prop('disabled', true);
      }
    });
    rowindex = $(this).closest('tr').index();
    $('#chapterGlobalVaribalButton').val( $("#mytableeee #chap"+rowindex).text());
    $('#finalGlobalVaribalButton').val( $("#mytableeee #final"+rowindex).text());
    $('#subG').val(subgroupId);   
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
      });
    }
    return false;
  });


  $("#addForm").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      final_practical:{
        required: true,
        number: true,
        min:0.0,
      },
      chapter_degree:{
        required: true,
        number: true,
        min:0.0,
        max: function(){
              return parseFloat($("#chapterGlobalVaribalButton").val());
            }
      },
      final_exam:{
        required: true,
        number: true,
        min:0.0,
        max: function(){
              return parseFloat($("#finalGlobalVaribalButton").val());
            }
      },
      subject_status:{
        required:true,
      },
      result_case:{
        required:true,
      },
      note:{
        required:true,
      },
    },
    messages:{
      final_practical:{
        required: "الرجاء ادخال الامتحان العملي!",
        number: "الرجاء ادخال ارقام فقط!",
        min: "الرجاء ادخال قيمة اكبر من او تساوي الصفر",
      },
      chapter_degree:{
        required: "الرجاء ادخال أعمال السنة!",
        number: "الرجاء ادخال ارقام فقط!",
        min: "الرجاء ادخال قيمة اكبر من او تساوي الصفر",
        max: function(){
              return "درجة اعمال هذه المادة من "+$("#chapterGlobalVaribalButton").val() + " الرجاء التأكد من الدرجة المدخلة";
            }
      },
      final_exam:{
        required: "الرجاء ادخال درجة الامتحان النهائي!",
        number: "الرجاء ادخال ارقام فقط!",
        min: "الرجاء ادخال قيمة اكبر من او تساوي الصفر",
        max: function(){
              return "درجة اعمال هذه المادة من "+$("#finalGlobalVaribalButton").val() + " الرجاء التأكد من الدرجة المدخلة";
            }
      },
      subject_status:{
        required:"الرجاء اختيار حالة المادة!",
      },
      result_case:{
        required:"الرجاء اختيار التقدير!",
      },
      note:{
        required:"الرجاء اختيار الملاحضة!",
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
  $("#updateG").validate({
    ignore: ':not(select:hidden, input:visible, textarea:visible)',
    rules:{
      final_practical:{
        required: true,
        number: true,
        min:0.0,
      },
      chapter_degree:{
        required: true,
        number: true,
        min:0.0,
        /*max: function(){
              return parseFloat($("#chapterGlobalVaribalButton").val());
            }*/
      },
      final_exam:{
        required: true,
        number: true,
        min:0.0,
       /* max: function(){
              return parseFloat($("#finalGlobalVaribalButton").val());
            }*/
      },
      subject_status:{
        required:true,
      },
      result_case:{
        required:true,
      },
      note:{
        required:true,
      },
    },
    messages:{
      final_practical:{
        required: "الرجاء ادخال الامتحان العملي!",
        number: "الرجاء ادخال ارقام فقط!",
        min: "الرجاء ادخال قيمة اكبر من او تساوي الصفر",
      },
      chapter_degree:{
        required: "الرجاء ادخال أعمال السنة!",
        number: "الرجاء ادخال ارقام فقط!",
        min: "الرجاء ادخال قيمة اكبر من او تساوي الصفر",
       /* max: function(){
              return "درجة اعمال هذه المادة من "+$("#chapterGlobalVaribalButton").val() + " الرجاء التأكد من الدرجة المدخلة";
            }*/
      },
      final_exam:{
        required: "الرجاء ادخال درجة الامتحان النهائي!",
        number: "الرجاء ادخال ارقام فقط!",
        min: "الرجاء ادخال قيمة اكبر من او تساوي الصفر",
       /* max: function(){
              return "درجة اعمال هذه المادة من "+$("#finalGlobalVaribalButton").val() + " الرجاء التأكد من الدرجة المدخلة";
            }*/
      },
      subject_status:{
        required:"الرجاء اختيار حالة المادة!",
      },
      result_case:{
        required:"الرجاء اختيار التقدير!",
      },
      note:{
        required:"الرجاء اختيار الملاحضة!",
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
});