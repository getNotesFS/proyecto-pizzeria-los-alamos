$(document).ready(function () {
  $("#openMAP").click(function () {
    $("#mapaLA").toggleClass("showLA");
    $(".footerMainContainer").toggleClass("showLA");
    $(".LINE_YELLOW").toggleClass("showLA");
    $("footer").toggleClass("bg-darkLA");
  });

  $("#carritoMenu").hover(function () {
    $(".cartListFlotante").removeClass("hideLA");
    $(".cartListFlotante").mouseover(function () {
      $(".cartListFlotante").removeClass("hideLA");
      $(".cartListFlotante").mouseout(function () {
        $(".cartListFlotante").addClass("hideLA");
      });
    });
  });

  $(".tabsLogRegistro .logg").click(function () {
    if ($("#registerTab").hasClass("active")) {
      $(".tabsLogRegistro .regg").removeClass("opActive");

      if (!$(".tabsLogRegistro .logg ").hasClass("opActive")) {
        $(".tabsLogRegistro .logg").toggleClass("opActive");
      }
    }
  });

  var path = window.location.pathname;
  if (path.charAt(path.length - 1) == "/")
    path = path.substring(0, path.length - 1);
  if (path.charAt(0) != "/") path = "/" + path;
  $(".navbar-nav li a[href='" + path + "']").addClass("active");

  /*AUMENTAR VALOR EN CLICKS*/
   
  var aumentar = $("#cantProductos").val();
 
  $("#aumentar").click(function(event) { 
    ++aumentar;
    $("#cantProductos").val(aumentar);
    console.log(aumentar);
  }); 

  $("#disminuir").click(function(event) { 
    --aumentar;
    $("#cantProductos").val(aumentar);
    console.log(aumentar);
  }); 

  
});
