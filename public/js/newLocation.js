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
  $("#newLocation").validate({
    rules:{
      name:{
        required: true,
      },
      quantity:{
        required: true,
        number: true,
        digits: true,
        range: [1, 9],
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
        range: "الرجاء ادخال ارقام صحيحة من 1 الي 9 !"
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