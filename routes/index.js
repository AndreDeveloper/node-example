//Get home page
exports.index = function(req, res){
    res.render("index", {tile: "PRIMEIRO CRUD"});
}