class nodo_proveedor{
    constructor(id, nombre, direccion, telefono, correo){
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
        this.izq = null;
        this.der = null;
    }
}

class abb{
    constructor(){
        this.raiz = null;
    }

    insertar(id, nombre, direccion, telefono, correo){
        let nuevo = new nodo_proveedor(id, nombre, direccion, telefono, correo);

        if(this.raiz == null){
            this.raiz= nuevo;
        }else{
            this.raiz = this.insertar_nodo(this.raiz,nuevo);
        }
    }

    insertar_nodo(raiz_actual,nuevo){
        if(raiz_actual != null){
            if(raiz_actual.id > nuevo.id){
                raiz_actual.izq = this.insertar_nodo(raiz_actual.izq,nuevo);

            }else if(raiz_actual.id < nuevo.id){
                raiz_actual.der = this.insertar_nodo(raiz_actual.der,nuevo);
            }else{
                console.log("NO SE PUEDE INSERTAR EL id PORQUE YA EXISTE");
            }

            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    preorden(raiz_actual){
        if(raiz_actual != null){
            console.log(raiz_actual.id);
            this.preorden(raiz_actual.izq);
            this.preorden(raiz_actual.der);
        }
    }

    inOrden(raiz_actual){
        if(raiz_actual != null){
            this.inOrden(raiz_actual.izq);
            console.log(raiz_actual.id);
            this.inOrden(raiz_actual.der);
        }
    }

    postOrden(raiz_actual){
        if(raiz_actual != null){
            this.postOrden(raiz_actual.izq);
            this.postOrden(raiz_actual.der);
            console.log(raiz_actual.id);
        }
    }

    generarDot(){
        let cadena="digraph arbol_abb {\n";
        cadena+= this.generar_nodos(this.raiz);
        cadena+="\n";
        cadena+=this.enlazar(this.raiz);
        cadena+="\n}";

        console.log(cadena);
    }

    generar_nodos(raiz_actual){
        let nodos ="";
        if(raiz_actual != null){
            nodos+= "n"+raiz_actual.id+"[label=\""+raiz_actual.id+"\"]\n";
            nodos+=this.generar_nodos(raiz_actual.izq);
            nodos+=this.generar_nodos(raiz_actual.der);
        }
        return nodos;
    }

    enlazar(raiz_actual){
        let cadena="";
        if(raiz_actual != null){
            cadena += this.enlazar(raiz_actual.izq);
            cadena += this.enlazar(raiz_actual.der);
            if(raiz_actual.izq != null){
                cadena+="n"+raiz_actual.id + "-> n"+raiz_actual.izq.id+"\n";
            }
            if(raiz_actual.der != null){
                cadena+="n"+raiz_actual.id + "-> n"+raiz_actual.der.id+"\n";
            }

            
        }
        return cadena;
    }
}