$(document).ready(function(){

  $('body').on('click','#addd', function () {
      $("#tbody").prepend('<tr data-id="1">'+
              '<td>رياضة</td>'+
              '<td>M101</td>'+
              '<td> محمد خليف ساسي</td>'+
              '<td> A1</td>'+
              '<td> 50</td>'+
              '<td> شهيد الواجب</td>'+
              '<td class="text-center">'+
              '<p data-placement="top",data-toggle="tooltip",title="تعديل">'+
              '<button id="enable" title="Edit" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p></td>'+
              '<td class="text-center">'+
              '<p data-placement="top",data-toggle="tooltip",title="تعديل">'+
              '<button id="enable" title="Edit" class="btn btn-danger btn-xs" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-remove"></span></button></p></td>');

      
      $('[data-id = "2"]').remove();
  });

});