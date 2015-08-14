$(document).ready(function(){
  // $.notify({
  //   message: "<p class='font text-center'><strong>نجح:</strong> تمت إضافة قسم جديد بنجاح </p>"
  // },{
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
  //     enter: 'animated flipInY',
  //     exit: 'animated flipOutX'
  //   },
  // });

  //view department edit
  $('body').on('click', '#Edit', function(){
    $('#save').val($(this).val());
    var id = $(this).val();
    $.get('/editDepartments/'+id,function(department){
      $('#id_dep').val(id);
      $('#a').val(department[0].name);
      $('#b').val(department[0].name_en);

    });
  });
  
  // edit departments
  // $('body').on('click', '#save', function () {
  //   $('#formdpet').submit();
  // });

  // $("#formdpet").submit(function() {
  //   var id=$('#save').val();
  //   $.post('/editDept/'+id,function(todo){
  //      alert(todo[0].name);
    
  //   });  
  // });

  // delete departments
  $('body').on('click', '#Delete', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/deleteDepartment/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  });

  $("#newDepartment, #formdpet").validate({
    rules:{
      name:{
        required: true,
      },
      name_en:{
        required: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اسم القسم!",
      },
      name_en:{
        required: "!Please enter Department name",
      },
    },
    errorClass: 'custom-error',
    highlight: function(element) {
      $(element).closest('.form-group').addClass('has-error').removeClass('has-success');
      $('#name_en-error').addClass("pull-left");
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
    },
  });
});