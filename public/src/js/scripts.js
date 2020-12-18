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

  //DATA TABLE MY ACCOUNT_STYLE

 
  $('#table_idP').DataTable( {
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
        { responsivePriority: 3, targets: -1 }
    ]
} );
  
//end data table


//AJAX LOGIN FORM
$('.titulo_ParrafosDark').click(function() {
  
  console.log("http://localhost:3000/api/usuarios/mail/"+$('input#correoHeadReg').val());

   loadExistMain($('#correoHeadReg').val());

 

});
$( "input.correoHeadReg" ).keyup(function() {
  const mail = $(this).val();
  if(mail.toLowerCase().indexOf("@") >= 0){
    
    const url= '/api/usuarios/mail/'+mail;
    fetch(url,{method:'GET'})
    .then(res => res.json())
    .then(data =>{
      if(data.Correo == mail){
        console.log("Encontramos correo: "+data.Correo);
        $('input#correoHeadReg').removeClass('is-valid'); 
        $('input#correoHeadReg').addClass('is-invalid');
          
        }
       if(data.status==404){
        console.log("No se ha encontrado");
        $('input#correoHeadReg').removeClass('is-invalid');
        $('input#correoHeadReg').addClass('is-valid');
      }
    });
  }else if(mail !=' '){
    $('input#correoHeadReg').removeClass('is-valid'); 
    $('input#correoHeadReg').removeClass('is-invalid'); 
  }else{
    $('input#correoHeadReg').removeClass('is-valid'); 
    $('input#correoHeadReg').addClass('is-invalid');
  }
   
 


  

});







});


function loadExistMain(mail){
 
  const url= '/api/usuarios/mail/'+mail;
  fetch(url,{method:'GET'})
  .then(res => res.json())
  .then(data =>{
    if(data.Correo == mail){
      console.log("Encontramos correo: "+data.Correo);
       
        
      }
     if(data.status==404){
      console.log("No se ha encontrado");
       
    }
      return data;
  });

   
}

/*fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  })
  .then((responseJson) => {
    if(responseJson.Correo == mail){
      console.log("Encontramos correo");
    }else if(responseJson.status==404){
      console.log("No se ha encontrado");
    }
  })
  .catch((error) => {
    console.log(error)
  });*/