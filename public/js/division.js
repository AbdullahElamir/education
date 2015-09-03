$(document).ready(function(){
  $('body').on('click', '#dS', function(){
    $('#delS').val($(this).val());
  });

  $('body').on('click', '#delS', function(){
    var id=$(this).val();
    $.get('/subject/deleteDivisionsbject/'+id+'/'+$('#id_div').val(),function(data){
      $('#semester [data-id = "'+id+'"]').remove();
      $( "#subS" ).prepend('<tr data-id="'+data.id+'">'+
                            '<td>'+data.name+'</td>'+
                            '<td>'+data.code+'</td>'+
                            '<td class="text-center">'+
                            '<p data-placement="top" data-toggle="tooltip" title="تنسيب">'+
                            '<button id="aS" data-title="add" data-toggle="modal" value="'+data.id+'" data-target="#addS" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-plus">'+
                            '</span></button></p></td></tr>');
       $('#deleteS').modal('hide');
    });
  });

  $('body').on('click', '#aS', function(){
    $('#adS').val($(this).val());
  });

  $('body').on('click', '#adS', function(){
    var id =$(this).val();
    $.post( "/subject/addDivisionSubject", { SubjectId:$(this).val(),DivisionId:$('#id_div').val() })
    .done(function( data ) {
      $(' #subS [data-id = "'+data.id+'"]').remove();
      $( "#semester" ).prepend('<tr data-id="'+data.id+'"><td>'+data.name+'</td><td>'+data.code+'</td><td class="text-center">'+
                                '<p data-placement="top" data-toggle="tooltip" title="حذف">'+
                                '<button id="dS" data-title="Delete" data-toggle="modal" value="'+data.id+'" data-target="#deleteS" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-minus"></span></button>'+
                                '</p></td></tr>');
      $('#addS').modal('hide');
    });
  });
////////////////////////////////////////////////////////////////////
  $('body').on('click', '#dY', function(){
    $('#delY').val($(this).val());
  });

  $('body').on('click', '#delY', function(){
    var id=$(this).val();
    $.get('/subject/deleteDivisionsbject/'+id+'/'+$('#id_div').val(),function(data){
      $('#year [data-id = "'+id+'"]').remove();
      $( "#subY" ).prepend('<tr data-id="'+data.id+'">'+
                            '<td>'+data.name+'</td>'+
                            '<td>'+data.code+'</td>'+
                            '<td class="text-center">'+
                            '<p data-placement="top" data-toggle="tooltip" title="تنسيب">'+
                            '<button id="aY" data-title="add" data-toggle="modal" value="'+data.id+'" data-target="#addY" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-plus">'+
                            '</span></button></p></td></tr>');
       $('#deleteY').modal('hide');
    });
  });

  $('body').on('click', '#aY', function(){
    $('#adY').val($(this).val());
  });

  $('body').on('click', '#adY', function(){
    var id =$(this).val();
    $.post( "/subject/addDivisionSubject", { SubjectId:$(this).val(),DivisionId:$('#id_div').val() })
    .done(function( data ) {
       $(' #subY [data-id = "'+data.id+'"]').remove();
      $( "#year" ).prepend('<tr data-id="'+data.id+'"><td>'+data.name+'</td><td>'+data.code+'</td><td class="text-center">'+
                            '<p data-placement="top" data-toggle="tooltip" title="حذف">'+
                            '<button id="dY" data-title="Delete" data-toggle="modal" value="'+data.id+'" data-target="#deleteY" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-minus"></span></button>'+
                            '</p></td></tr>');
      $('#addY').modal('hide');
    });
  });
});


