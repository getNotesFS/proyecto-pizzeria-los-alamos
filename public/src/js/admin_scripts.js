$(document).ready(function () {

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
  
  
  });
  