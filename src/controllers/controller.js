const fs = require('fs')
const path = require('path')

let productsJson = path.join(__dirname,'../data/productsDataBase.json')
const arrayProducts = JSON.parse(fs.readFileSync(productsJson, 'utf-8'))

const controller = {
    home:function(req, res, next) {
        res.render('index', { title: 'Express' });
      },
    productsDetalle:function(req, res){
        let id = req.params.id;
        let productoEncontrado = arrayProducts.find(unProdu => {return id == unProdu.id});
        if(id == productoEncontrado.id){
        res.render('products', {
            namePro:productoEncontrado.name,
            descriPro:productoEncontrado.description,
            precioPro:productoEncontrado.price,
            imagenPro:productoEncontrado.image
        })
        }else{
            res.send('producto no esta añadido')
        }
        

    },
    /*productUni:function(req, res){
        let id = req.params.id;
        let productoMostrar = arrayProducts.find(unProducto=>{return id == unProducto.id})
            if(id == productoMostrar.id){
                res.render('products',{
                    namePro:productoMostrar.name,
                    descriPro:productoMostrar.description,
                    precioPro:productoMostrar.price,
                    imagenPro:productoMostrar.image
                })
            }else{res.render('products',{done : 'no encontrado'})}
        
    }*/
}

module.exports = controller;