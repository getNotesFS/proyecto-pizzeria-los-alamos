//BTN JS
 function removeP(_id){
    console.log(_id);
    Swal.fire({
        title: '¿Estás seguro de eliminarlo?',
        text: "No podrás rehacer la acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          ),
           
            window.location.href = "/admin/pizzas/delete/"+_id;
           
        }
      })
 } 

 function removeI(_id){
    console.log(_id);
    Swal.fire({
        title: '¿Estás seguro de eliminarlo?',
        text: "No podrás rehacer la acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          ),
           
            window.location.href = "/admin/ingredientes/delete/"+_id;
           
        }
      })
 } 


 function removeOT(_id){
  console.log(_id);
  Swal.fire({
      title: '¿Estás seguro de eliminarlo?',
      text: "No podrás rehacer la acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'El Otroproducto ha sido eliminado.',
          'success'
        ),
         
          window.location.href = "/admin/otrosproductos/delete/"+_id;
         
      }
    })
} 

 function removeU(_id){
    console.log(_id);
    Swal.fire({
        title: '¿Estás seguro de eliminarlo?',
        text: "No podrás rehacer la acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          ),
           
            window.location.href = "/admin/usuarios/delete/"+_id;
           
        }
      })
 } 

$(document).ready(function () {

    
    
    $("#deletePizza").click(function() {
         var _id= $(this).attr('href');
         console.log("hollll");
         
       /* Swal({
            title: '¿Estás seguro de eliminarlo?',
            text: "No podrás rehacer la acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal(
                'Eliminado!',
                'El producto ha sido eliminado.',
                'success'
              )
            }
          })*/
      
    });

    $(".nav-link").click(function () {
        
        $(".nav-link").removeClass("active");
        // activamos el elemento clicado.
        $(this).addClass("active");
         
        if(!$(this).hasClass("changed")){ 
            $(this).addClass('changed'); 
        }else{
            $(this).removeClass('changed'); 
        } 
      
    });
    $("#updateIngredente").click(function(){
        
    });
    $("#updateOtroProducto").click(function(){
        
    });

    $(".nav-link").click(function () {
        
        $(".nav-link").removeClass("active");
        // activamos el elemento clicado.
        $(this).addClass("active");
         
        if(!$(this).hasClass("changed")){ 
            $(this).addClass('changed'); 
        }else{
            $(this).removeClass('changed'); 
        } 
      
    });

    
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);

    $(".nav a").each(function () {
        var href = $(this).attr('href'); 
        
        
        if (path.substring(0, href.length) === href) {
            //$('a').attr('href');
            
            
            if(path === href){
                
                $(this).addClass("active");
            }
            
            $(this).closest('ul').closest('li div').removeClass("collapse");
             
        }
    });


 
//end data table
$('#table_id').DataTable( {
  "language": {
    "emptyTable":			"<i>No hay datos disponibles en la tabla.</i>",
    "info":		   		"Del _START_ al _END_ de _TOTAL_ ",
    "infoEmpty":			"Mostrando 0 registros de un total de 0.",
    "infoFiltered":			"(filtrados de un total de _MAX_ registros)",
    "infoPostFix":			"(actualizados)",
    "lengthMenu":			"Mostrar _MENU_ registros",
    "loadingRecords":		"Cargando...",
    "processing":			"Procesando...",
    "search":			"<span style='font-size:15px;'>Buscar:</span>",
    "searchPlaceholder":		"Dato para buscar",
    "zeroRecords":			"No se han encontrado coincidencias.",
    "paginate": {
      "first":			"Primera",
      "last":				"Última",
      "next":				"Siguiente",
      "previous":			"Anterior"
    },
    "aria": {
      "sortAscending":	"Ordenación ascendente",
      "sortDescending":	"Ordenación descendente"
    }
  },

  "lengthMenu":		[[10, 25, 50, -1], [10, 25, 50, "Todos"]],
  "iDisplayLength":	10,
  responsive: true,
  columnDefs: [
      { responsivePriority: 1, targets: 0 },
      { responsivePriority: 10001, targets: 4 },
      { responsivePriority: 1, targets: -1 }
  ]
} );

//end data table
  });
  