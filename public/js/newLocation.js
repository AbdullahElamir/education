$(document).ready(function(){

   $('body').on('click', '#Edit', function(){
    $('#eitLoc').val($(this).val());
     var id = $(this).val();
     $.get('/getLocation/'+id,function(location){
      $('#locid').val(id);
      $('#name').val(location[0].name);
      $('#quantity').val(location[0].quantity);

    });

   });


     $('body').on('click', '#del', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/deleteLocation/'+$(this).val(),function(todo){
      $('[data-id = "'+id+'"]').remove();
    });
  }); 


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
  $("#newLocation, #updateLocation").validate({
    rules:{
      name:{
        required: true,
      },
      quantity:{
        required: true,
        number: true,
        digits: true,
      },
    },
    messages:{
      name:{
        required: "الرجاء ادخال اسم القاعة!",
      },
      quantity:{
        required: "الرجاء ادخال كمية استعاب الطلبة!",
        number: "الرجاء ادخال ارقام فقط!",
        digits: "الررجاء ادخال ارقام صحيحة!",
      },
    },
    highlight: function(element) {
      $(element).closest('.row').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.row').removeClass('has-error');
    },
  });
});