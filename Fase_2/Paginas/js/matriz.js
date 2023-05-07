class nodo_interno{
    constructor(valor,documento,carnet, nombre_doc){
        this.valor = valor;
        this.documento = documento;
        this.carnet = carnet;
        this.nombre_doc = nombre_doc;
        this.sig = null;
        this.ant = null;
        this.arriba = null;
        this.abajo = null;
    }
}

class lista_interna{
    constructor(){
        this.primero = null;
    }

    insertar_documento(valor,documento,carnet, nombre_doc){
        let nuevo = new nodo_interno(valor,documento,carnet, nombre_doc);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.carnet < this.primero.carnet){
                nuevo.sig = this.primero;
                this.primero.ant = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.carnet < aux.carnet){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant= nuevo;
                        break;
                    }else if(nuevo.documento == aux.documento && nuevo.carnet == aux.carnet){
                        console.log("La posicion ya esta ocupada-> "+nuevo.documento+","+nuevo.carnet);
                        break;
                    }else{
                        if(aux.sig ==null){
                            aux.sig=nuevo;
                            nuevo.ant = aux;
                            break;
                        }else{
                            aux = aux.sig;
                        }
                    }
                }
            }
        }
    }

    insertar_carnet(valor,documento,carnet, nombre_doc){ 
        let nuevo = new nodo_interno(valor,documento,carnet, nombre_doc);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.documento < this.primero.documento){
                nuevo.abajo = this.primero;
                this.primero.arriba = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.documento < aux.documento){
                        nuevo.abajo = aux;
                        nuevo.arriba = aux.arriba;
                        aux.arriba.abajo = nuevo;
                        aux.arriba= nuevo;
                        break;
                    }else if(nuevo.documento == aux.documento && nuevo.carnet == aux.carnet){
                        console.log("La posicion ya esta ocupada-> "+nuevo.documento+","+nuevo.carnet);
                        break;
                    }else{
                        if(aux.abajo ==null){
                            aux.abajo=nuevo;
                            nuevo.arriba = aux;
                            break;
                        }else{
                            aux = aux.abajo;
                        }
                    }
                }
            }
        }
    }

    recorrer_documento(){
        let aux = this.primero;
        while(aux != null){
            console.log("valor =",aux.valor," - documento = ",aux.documento , " carnet = ",aux.carnet);
            aux = aux.sig;
        }
    }
    recorrer_carnet(){
        let aux = this.primero;
        while(aux != null){
            console.log("valor =",aux.valor," - documento = ",aux.documento , " carnet = ",aux.carnet);
            aux = aux.abajo;
        }
    }
}


class nodo_cabecera{
    constructor(dato){
        this.dato = dato;
        this.sig= null;
        this.ant = null;
        this.lista_interna = new lista_interna();
    }
}

class lista_cabecera{
    constructor(){
        this.primero = null;
    }

    insertar_cabecera(nuevo){

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.dato<this.primero.dato){
                nuevo.sig = this.primero;
                this.primero.ant=nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dato < aux.dato){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant = nuevo;
                        break;
                    }else{
                        if(aux.sig == null){
                            aux.sig = nuevo;
                            nuevo.ant = aux;
                            break;
                        }else{
                            aux = aux.sig;
                        }
                    }
                }
            }
        }
    }

    buscar_cabecera(dato){
        let aux = this.primero;
        while(aux != null){
            if(aux.dato == dato){
                return aux;
            }else{
                aux = aux.sig;
            }
        }
        return null;
    }

    recorrer(){
        let aux = this.primero;
        while(aux != null){
            console.log("dato =",aux.dato);
            aux = aux.sig;
        }
    }
}

class matriz{
    constructor(){
        this.cabecetas_documento = new lista_cabecera();
        this.cabecetas_carnet = new lista_cabecera();
    }

    insertar_doc_permisos(valor,documento,carnet){
        let nodo_cabecera_documento = this.cabecetas_documento.buscar_cabecera(documento);
        let nodo_cabecera_carnet = this.cabecetas_carnet.buscar_cabecera(carnet);

        if(nodo_cabecera_documento == null){
            nodo_cabecera_documento =  new nodo_cabecera(documento);
            this.cabecetas_documento.insertar_cabecera(nodo_cabecera_documento);
        }

        if(nodo_cabecera_carnet == null){
            nodo_cabecera_carnet =  new nodo_cabecera(carnet);
            this.cabecetas_carnet.insertar_cabecera(nodo_cabecera_carnet);
        }
        nodo_cabecera_documento.lista_interna.insertar_documento(valor,documento,carnet);
        //insertar en cabecera Y
        nodo_cabecera_carnet.lista_interna.insertar_carnet(valor,documento,carnet);
    }

    recorrer_matriz(){
        console.log("cabeceras en documento");
        let aux = this.cabecetas_documento.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.valor);
                aux2 = aux2.sig;
            }
            aux = aux.sig;
        }

        console.log("cabeceras en carnet");
        aux = this.cabecetas_carnet.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.valor);
                aux2 = aux2.abajo;
            }
            aux = aux.sig;
        }
    }

    graficar_matriz(){
        let cadena="";
        cadena+= "digraph Matriz{ \n";
        cadena+= "node[shape = box,width=0.7,height=0.7,fillcolor=\"azure2\" color=\"white\" style=\"filled\"];\n";
        cadena+= "edge[style = \"bold\"]; \n"
        cadena+="node[label = Documentos fillcolor=\" darkolivegreen1\" pos = \"-1,1!\"]principal;"
        let aux_documento = this.cabecetas_documento.primero;
        while(aux_documento!=null){
            cadena+="node[label = "+aux_documento.car+" fillcolor=\" azure1\" pos = \""+aux_documento.dato+",1!\"]documento"+aux_documento.dato+";\n"
            aux_documento = aux_documento.sig;
        }
        aux_documento = this.cabecetas_documento.primero;
        while(aux_documento.sig != null){
            cadena+="documento"+aux_documento.dato+"->"+"documento"+aux_documento.sig.dato+";\n"
            cadena+="documento"+aux_documento.sig.dato+"->"+"documento"+aux_documento.dato+";\n"
            aux_documento = aux_documento.sig;
        }

        if(this.cabecetas_documento.primero!= null){
            cadena+="principal->documento"+this.cabecetas_documento.primero.dato+";\n";
        }
        let aux_carnet = this.cabecetas_carnet.primero;
        while(aux_carnet!=null){
            cadena+="node[label = "+aux_carnet.dato+" fillcolor=\" azure1\" pos = \"-1,-"+aux_carnet.dato+"!\"]carnet"+aux_carnet.dato+";\n"
            aux_carnet = aux_carnet.sig;
        }
        aux_carnet = this.cabecetas_carnet.primero;
        while(aux_carnet.sig != null){
            cadena+="carnet"+aux_carnet.dato+"->"+"carnet"+aux_carnet.sig.dato+";\n"
            cadena+="carnet"+aux_carnet.sig.dato+"->"+"carnet"+aux_carnet.dato+";\n"
            aux_carnet = aux_carnet.sig;
        }

        if(this.cabecetas_documento.primero!= null){
            cadena+="principal->carnet"+this.cabecetas_carnet.primero.dato+";\n";
        }
        aux_documento = this.cabecetas_documento.primero;
        while(aux_documento!=null){ //recorrer listas de x para graficar los nodos de sus lista interna
            let aux = aux_documento.lista_interna.primero;
            while(aux!=null){
                cadena+="   node[label = "+aux.nombre_doc+" fillcolor=\" gold2\" pos = \""+aux.documento+",-"+aux.carnet+"!\"]documento"+aux.documento+"carnet"+aux.carnet+";\n"
                aux = aux.sig;
            }
            aux = aux_documento.lista_interna.primero;
            while(aux.sig!= null){
                cadena+="   documento"+aux.documento+"carnet"+aux.carnet+"->documento"+aux.sig.documento+"carnet"+aux.sig.carnet+";\n";
                cadena+="   documento"+aux.sig.documento+"carnet"+aux.sig.carnet+"->documento"+aux.documento+"carnet"+aux.carnet+";\n";
                aux= aux.sig;
            }
            if(aux_documento.lista_interna.primero!= null){
                cadena+="documento"+aux_documento.dato+"->"+"documento"+aux_documento.lista_interna.primero.documento+"carnet"+aux_documento.lista_interna.primero.carnet+";\n";
            }

            aux_documento = aux_documento.sig;
        }

        aux_carnet = this.cabecetas_carnet.primero;
        while(aux_carnet!=null){
            let aux = aux_carnet.lista_interna.primero;
            while(aux.abajo!= null){
                cadena+="   documento"+aux.documento+"carnet"+aux.carnet+"->documento"+aux.abajo.documento+"carnet"+aux.abajo.carnet+";\n";
                cadena+="   documento"+aux.abajo.documento+"carnet"+aux.abajo.carnet+"->documento"+aux.documento+"carnet"+aux.carnet+";\n";
                aux= aux.abajo;
            }
            if(aux_carnet.lista_interna.primero!= null){
                cadena+="carnet"+aux_carnet.dato+"->"+"documento"+aux_carnet.lista_interna.primero.documento+"carnet"+aux_carnet.lista_interna.primero.carnet+";\n";
            }
            aux_carnet = aux_carnet.sig;
        }

        cadena+= "\n}"
        console.log(cadena);
    }
}


let matriz1 = new matriz();

matriz1.insertar_doc_permisos(0,0,0, "documento1");
matriz1.insertar_doc_permisos(1,0,1, "documento2");
matriz1.insertar_doc_permisos(5,1,1, "documento3");
matriz1.insertar_doc_permisos(6,2,3,  "documento4");
matriz1.insertar_doc_permisos(1,10,1, "documento5");
matriz1.insertar_doc_permisos(2,1,2, "documento6");
matriz1.insertar_doc_permisos(7,3,3, "documento7");

matriz1.recorrer_matriz();
matriz1.graficar_matriz();