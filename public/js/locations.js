$(document).ready(function(){
  $('body').on('click', '#Edit', function(){
    $('#eitLoc').val($(this).val());
     var id = $(this).val();
     $.get('/location/getLocation/'+id,function(location){
      $('#locid').val(id);
      $('#name').val(location[0].name);
      $('#quantity').val(location[0].quantity);
    });
  });

  $("#updateLocation").submit(function(e) {
    var isvalidate=$("#updateLocation").valid();
    if(isvalidate){
      $.post("/location/editLocation", $("#updateLocation").serializeObject(), function(data, error){
        if(data == null){
          // to do something for back-end validation
        } 
        else {
          var locId = $('#eitLoc').val();
          $('#name-'+locId).html(data.name);
          $('[data-id = "'+locId+'"]').data('name',data.name);
          $('#quantity-'+locId).html(data.quantity);
          $('[data-id = "'+locId+'"]').data('quantity',data.quantity);
          $('#edit').modal('hide');
          custNotify("success","نجح","تمت التعديل بنجاح","ok-sign","bounceInDown","bounceOutUp");
        }
      });
    }
    return false;
  });

  $('body').on('click', '#del', function(){
    $('#ok').val($(this).val());
  });

  $('body').on('click', '#ok', function(){
    var id=$(this).val();
    $.get('/location/deleteLocation/'+$(this).val(),function(result){
      switch(result.msg){
        case "1" :
          $('[data-id = "'+id+'"]').remove();
          custNotify("success","نجح","تم حذف هذه القاعة بنجاح","ok-sign","bounceInDown","bounceOutUp");
          break;
        case "2" :
          $('#delete').modal('hide');
          custNotify("danger","فشل","لايمكن حذف هذه القاعة  لاعتماد بعض الكيانات عليها","warning-sign","bounceIn","bounceOut");
          break;
      }
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
      $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
    },
  });
  $('#edit').on('hidden.bs.modal', function(){
    $(this).removeData('bs.modal');
    $('.form-group').removeClass('has-error');
    $('#updateLocation').validate().resetForm();
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
    custNotify("success","نجح","تمت إضافة قاعة دراسية جديدة بنجاح","ok-sign","bounceInDown","bounceOutUp");
    var pageUrl = '/location'
    window.history.pushState("","",pageUrl);
  }
});