let precio = 14000 ;

const toThousand = n => n.toString().replace( /\B(?=(\d{3})+(?!\d))/g,"." );



console.log(toThousand(precio))
