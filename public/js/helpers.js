$(document).ready(function(){
  $.fn.serializeObject = function()
  {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };
  $(".prevent").on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key == 122 || key == 27 )
      {}
    else
      e.preventDefault();
  });
  // Custom function for bootstrap notify
  custNotify = function(notType,msgType,msg,sign,enterAnimat,exitAnimat){
    $.notify({
      message: "<p class='font h5 text-center'><i class='glyphicon glyphicon-"+sign+"'></i>&nbsp;<strong>"+msgType+":</strong> "+msg+" </p>"
      },{
      type: notType,
      allow_dismiss: true,
      showProgressbar: false,
      placement: {
        from: 'top',
        align: 'center'
      },
      mouse_over: null,
      newest_on_top: true,
      animate: {
        enter: 'animated '+enterAnimat,
        exit: 'animated '+exitAnimat,
      },
    });
  }
});