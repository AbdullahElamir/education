$(document).ready(function(){

 // alert("hii");

  $('body').on('click','#delete',function () {
    $('#deletee').val($(this).val());
    $("#topid").append($(" "+'[data-id = "'+$(this).val()+'"] a:first').text()+" ?");

  });
  
 /* $('body').on('click','#deletee',function () {
    var id=$(this).val();
    $.get('/typeBusiness/deleteTOB/'+$(this).val(),function(result){
      $('[data-id = "'+id+'"]').remove();
    })
  }); */

	});