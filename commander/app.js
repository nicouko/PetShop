const app=Vue.createApp({
    data()
    {
        return {
            productos:[],
            tipoDeProductos:[],
            cart2:[],
            cartBoolean:false
        }
    },
    created()
    {
        fetch("https://apipetshop.herokuapp.com/api/articulos")
            .then(rawData => rawData.json())
            .then(cookedData=> this.productos=cookedData.response)
            if(localStorage.getItem("cart2")!=undefined){
                (JSON.parse(localStorage.getItem("cart2"))).forEach(item=>{
                    this.cart2.push(item)
                })
            }
    },
    methods:
    {
        toggleAlert(){
            if(this.calcTotal==0)
            {
                swal("Error", "No hay nada en su carrito.. seleccione algo del catalogo para comprar", "error");
            }
            else{
                swal("Comprado!", "La compra fue exitosa", "success");
                while(0<this.cart2.length)
                {
                    this.cart2.shift();
                }
                localStorage.clear();
            }
        },
        goToIndex(){
            window.location.pathname="/htmlFolder/index.html";
        },
        toggleSelect(){
            if(this.tipoDeProductos.includes("Medicamentos")){
                medID.style.color="black";
                medID.style.backgroundColor="paleturquoise";
            }
            else{
                medID.style.color="";
                medID.style.backgroundColor="";
            }
            if(this.tipoDeProductos.includes("Juguetes")){
                jugID.style.color="black";
                jugID.style.backgroundColor="paleturquoise";
            }
            else{
                jugID.style.color="";
                jugID.style.backgroundColor="";
            }
        },
        toggleCart(){
            this.cartBoolean=!this.cartBoolean;
            if(this.cartBoolean){
                sideBar.style.right="0";
            }
            else{
                sideBar.style.right="-25vw";
            }
        },
        meterSacar(producto){
            if(this.cart2.includes(producto))
            {
                let posicion=this.cart2.indexOf(producto);
                this.cart2.splice(posicion);
            }
            else{
                this.cart2.push(producto);
            }
            localStorage.setItem("cart2",JSON.stringify(this.cart2));
        }
    },
    computed:
    {
        hayAlgo(){
            return !(this.tipoDeProductos.includes("Medicamentos")||this.tipoDeProductos.includes("Juguetes"));
        },
        filtrarProductos(){
            return this.productos.filter(producto => this.tipoDeProductos.includes(producto.tipo))
        },
        calcTotal(){
            let tot=0;
            this.cart2.forEach(item=>{
                tot=(item.precio)+tot;
            })
            return tot;
        }
    }

})

app.mount("#app");