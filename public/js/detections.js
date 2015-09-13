$(document).ready(function(){
  $('body').on('change', '#department', function(){
    var id = $(this).val();
    $('#division').empty();
    $.get('/transcript/division/'+id,function(data){
      for(key in data){
          $('#division').append("<option value = '"+data[key].id+"'>"+data[key].name+"</option>").selectpicker('refresh');
        }
    });
  });
  
  $('body').on('click', '#submit', function(){
    window.location.href='/transcript/detection/'+$('#semester').val()+'/'+$('#division').val()+'/'+$('#level').val();
  });
});