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


  });
  