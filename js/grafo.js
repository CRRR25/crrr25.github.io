class nodog{
    constructor(id,nombre_bodega){
        this.id = id;
        this.nombre_bodega = nombre_bodega;
        this.siguiente = null;
        this.anterior = null;
        this.ponderacion=0;
        this.adyasentes = new lista_adyasentes();
    }
}

class lista_adyasentes{
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    insertar(id,nombre_bodega,p){
        let nuevo = new nodog(id,nombre_bodega);
        nuevo.ponderacion = p;
        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
        }else{
            if(this.primero == this.ultimo){
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            }else{
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo= nuevo;
            }
        }
    }
}

class grafo{
    constructor(){
        this.primero= null;
        this.ultimo = null;
    }

    insertar(id,nombre_bodega){
        let nuevo = new nodog(id,nombre_bodega);

        if(this.primero == null){
            this.primero = nuevo;
            this.ultimo = nuevo;
        }else{
            if(this.primero == this.ultimo){
                this.primero.siguiente = nuevo;
                nuevo.anterior = this.primero;
                this.ultimo = nuevo;
            }else{
                nuevo.anterior = this.ultimo;
                this.ultimo.siguiente = nuevo;
                this.ultimo= nuevo;
            }
        }
    }

    buscar(id){
        let aux = this.primero;
        while(aux != null){
            if(aux.id == id){
                return aux;
            }else{
                aux = aux.siguiente;
            }
        }
        return null;
    }

    agregar_adyacente(id, id_adyacente,nombre_bodega,ponderacion){
        let principal = this.buscar(id);

        if(principal != null){
            principal.adyasentes.insertar(id_adyacente,nombre_bodega,ponderacion);
        }else{
            console.log("no existe el nodo origen")
        }
    }

    mostrar(){
        let aux = this.primero;
        while(aux != null){
            console.log("-> "+aux.id);
            let aux2 = aux.adyasentes.primero;
            while(aux2 != null){
                console.log("   -"+aux2.id);
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
    }

    graficar(){
        let cadena= "digraph grafo {\n rankdir=\"LR\" \n"
        cadena +='node[shape=box fillcolor="#069BB0" style=filled]\n';
        let aux = this.primero;
        while(aux != null){
            console.log(aux.nombre_bodega)
            cadena+="n"+aux.id+"[label= \""+aux.nombre_bodega+"\"];\n"
            aux = aux.siguiente;
        }
        // graficar relaciones
        aux = this.primero;
        while(aux != null){
            let aux2 = aux.adyasentes.primero;
            while(aux2 != null){
                cadena+= "n"+aux.id+" -> n"+aux2.id+" [label=\""+aux2.ponderacion+"km\"]; \n";
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
        cadena += "}"
        return cadena
        
    }
}

// let grafo_prueba = new grafo();
// grafo_prueba.insertar(4,'bodega4');
// grafo_prueba.insertar(6,'bodega6');
// grafo_prueba.insertar(9,'bodega9');
// grafo_prueba.insertar(11,'bodega11');
// grafo_prueba.insertar(7,'bodega7');
// grafo_prueba.insertar(10,'bodega10');
// 
// 
// grafo_prueba.agregar_adyacente(4,6,'bodega6',5);
// grafo_prueba.agregar_adyacente(6,4,'bodega4',5);
// 
// grafo_prueba.agregar_adyacente(6,9,'bodega9',2);
// grafo_prueba.agregar_adyacente(9,6,'bodega6',2);
// 
// grafo_prueba.agregar_adyacente(7,9,'bodega9',4);
// grafo_prueba.agregar_adyacente(9,7,'bodega7',4);
// 
// grafo_prueba.agregar_adyacente(4,10,'bodega10',4);
// grafo_prueba.agregar_adyacente(10,4,'bodega4',4);
// 
// grafo_prueba.agregar_adyacente(9,11,'bodega11',9);
// grafo_prueba.agregar_adyacente(11,9,'bodega9',9);
// 
// grafo_prueba.agregar_adyacente(10,11,'bodega11',1);
// grafo_prueba.agregar_adyacente(11,10,'bodega10',1);
// 
// grafo_prueba.agregar_adyacente(7,10,'bodega10',8);
// grafo_prueba.agregar_adyacente(10,7,'bodega7',8);
// 
// grafo_prueba.agregar_adyacente(6,11,'bodega11',6);
// grafo_prueba.agregar_adyacente(11,6,'bodega6',6);
// 
// console.log(grafo_prueba.graficar());
