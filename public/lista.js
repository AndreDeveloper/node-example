pesquisar = function(){
    document.location.assign("/lista/" + $("#search").val());
}

 excluir = function (id){
     document.location.assign("/item/excluir/" + id);
 }

 editar = function (id){
     document.location.assign("/item/" + id);
 }