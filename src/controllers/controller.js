const fs = require('fs')
const path = require('path')
/**Aca esta la conversion de la B.D a un objeto de JS */
let productsJson = path.join(__dirname,'../data/productsDataBase.json');
const arrayProducts = JSON.parse(fs.readFileSync(productsJson, 'utf-8'));
/**Este es el transforamdor de miles */
const toThousand = n => n.toString().replace( /\B(?=(\d{3})+(?!\d))/g,"." );

const controller = {
    /**El home donde se muestra las ultimas visitas y las ofertas */
    home:function(req, res, next) {
        res.render('index',{arrayProducts, toThousand});
      },
    /**Se muestra el detalle del producto, con los botonos de 'comprar','modificar'y'borrar' */  
    productsDetalle:function(req, res){
        let id = req.params.id;
        let productoEncontrado = arrayProducts.find(unProdu => {return id == unProdu.id});
        if(id == productoEncontrado.id){
        res.render('productsDetail', {
            idPro:productoEncontrado.id,
            namePro:productoEncontrado.name,
            descriPro:productoEncontrado.description,
            precioPro:toThousand(productoEncontrado.price),
            imagenPro:productoEncontrado.image,
            descuPro: productoEncontrado.discount,
            preConDescu:toThousand(productoEncontrado.price - (productoEncontrado.price * productoEncontrado.discount / 100))
        })
        }else{
            res.send('producto no esta añadido')
        }
    },
    /**Aca se muestra todo los productos de la base de datos */
    product:function(req, res){
        res.render('products',{arrayProducts})
    },
    /**Aca el ejs donde se puede modificar los productos */
    productEdit:function(req, res){
        let id = req.params.id;
        let produEncontrado = arrayProducts.find(product => {return product.id == id})
        res.render('productEdit',{
            produId:produEncontrado.id
        })
    },
    /**Aca es para que el put responda */
    edit:function(req, res){
        let id = req.params.id;
        arrayProducts.forEach(product => { 
            if(product.id == id){
                product.name = req.body.name
            } 
        })
        fs.appenFileSync(productsJson,JSON.stringify(arrayProducts))
        
        
        
    },
    /**Aca responde el delete con un id para borrar un producto */
    borrar:function(req, res){
        let id = req.params.id;
        let productosNuevos = arrayProduts.filter(product => {
            return product.id != id
        })
        res.send('producto borrado')
    },
    /**Aca se mostrara el formulario donde se creara el producto */
    productCreate:function(req, res){
        res.render('productsCreate')
    },
    /**Aca es donde llega el producto con todos sus datos del body para guardar en la B.S */
    create:function(req, res){
        let productCreado = {
            id:arrayProducts[arrayProducts.length - 1].id + 1,
            name: req.body.name,
            price: req.body.price,
            discount:req.body.discount,
            category:req.body.category,
            disription:req.body.discription
        }
        /**Aca estoy uniendo el producto nuevo con el arrayProducts */
        arrayProducts = [...arrayProducts,productCreado];
        fs.writeFileSync(productsJson,JSON.stringify(arrayProducts,null,""))
       res.redirect('/')
    }
}

module.exports = controller;