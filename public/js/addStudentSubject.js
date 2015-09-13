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
      if(degreeFinal<parseInt((0.55*ratioDegreFinal))){
        $("#degree #final"+i).css({ 'background-color' : '  #ee9ca7'});
        pass=1; 
      } else {
        pass=0;
      } 
      if(degreeSum<parseInt((RatioSum*0.55))){
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
    $('#upres').val($(this).val());
    $('#chapter_degree').val($('[data-id = "'+$(this).val()+'"]').data('deg'));
    $('#final_exam').val($('[data-id = "'+$(this).val()+'"]').data('fin'));
    $('#subject_status').selectpicker('val' ,$('[data-id = "'+$(this).val()+'"]').data('sub'));
    $('#result_case').selectpicker('val' ,$('[data-id = "'+$(this).val()+'"]').data('case')); 
    $('#notes').selectpicker('val',$('[data-id = "'+$(this).val()+'"]').data('notes'));
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

  $('body').on('click', '#adA', function (e) {
    /* in this line I used hidden button like global varibal to use it in the max chapter and */
    /* final degree in the validation section */
    rowindex = $(this).closest('tr').index();
    $('#chapterGlobalVaribalButton').val( $("#mytablee #chap"+rowindex).text());
    $('#finalGlobalVaribalButton').val( $("#mytablee #final"+rowindex).text());
    $('#subG').val($(this).val());   
  });


  $('body').on('click', '#ad', function (e) {
    /* in this line I used hidden button like global varibal to use it in the max chapter and */
    /* final degree in the validation section */
    rowindex = $(this).closest('tr').index();
    $('#chapterGlobalVaribalButton').val( $("#mytableee #chap"+rowindex).text());
    $('#finalGlobalVaribalButton').val( $("#mytableee #final"+rowindex).text());
    $('#subG').val($(this).val());   
  });


  $('body').on('click', '#a', function (e) {
    /* in this line I used hidden button like global varibal to use it in the max chapter and */
    /* final degree in the validation section */
    rowindex = $(this).closest('tr').index();
    $('#chapterGlobalVaribalButton').val( $("#mytableeee #chap"+rowindex).text());
    $('#finalGlobalVaribalButton').val( $("#mytableeee #final"+rowindex).text());
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

});