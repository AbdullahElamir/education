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

  $('body').on('click','#delete',function () {
    $('#deletee').val($(this).val());
    $("#topid").append($(" "+'[data-id = "'+$(this).val()+'"] a:first').text()+" ?");
  });

  $("#updateLocation").validate({
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

  var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
      var p=a[i].split('=', 2);
      if (p.length == 1)
        b[p[0]] = "";
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&'));
  
  if(qs["msg"]==1){
    $.notify({
      message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-ok-sign'></i>&nbsp;<strong>نجح:</strong> تمت إضافة قاعة دراسية جديدة بنجاح </p>"
      },{
      type: 'success',
      allow_dismiss: true,
      showProgressbar: false,
      placement: {
        from: 'top',
        align: 'center'
      },
      mouse_over: null,
      newest_on_top: true,
      animate: {
        enter: 'animated bounceInDown',
        exit: 'animated bounceOutUp'
      },
    });
    var pageUrl = '/locations'
    window.history.pushState("","",pageUrl);
  }
});