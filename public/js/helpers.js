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

  /*this is to parse url for error or success msgs*/
  $getMsg = (function(a){
    if(a=="") return {};
    var b = {};
    for(var i =0; i<a.length; ++i){
      var p=a[i].split('=',2);
      if(p.length ==1)
        b[p[0]]="";
      else
        b[p[0]]=decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&'));

  /* this to replace the url*/
  replaceUrl = function(url) {
    window.history.pushState("","",url);
  }
});