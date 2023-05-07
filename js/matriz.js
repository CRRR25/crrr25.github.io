class nodo_interno{
    constructor(valor,dia,hora){
        this.valor = valor;
        this.dia = dia;
        this.hora = hora;
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

    insertar_dia(valor, dia,hora){
        let nuevo = new nodo_interno(valor,dia,hora);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.hora < this.primero.hora){
                nuevo.sig = this.primero;
                this.primero.ant = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.hora < aux.hora){
                        nuevo.sig = aux;
                        nuevo.ant = aux.ant;
                        aux.ant.sig = nuevo;
                        aux.ant= nuevo;
                        break;
                    }else if(nuevo.dia == aux.dia && nuevo.hora == aux.hora){
                        console.log("La posicion ya esta ocupada-> "+nuevo.dia+","+nuevo.hora);
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

    insertar_hora(valor, dia,hora){ 
        let nuevo = new nodo_interno(valor,dia,hora);

        if(this.primero == null){
            this.primero = nuevo;
        }else{
            if(nuevo.dia < this.primero.dia){
                nuevo.abajo = this.primero;
                this.primero.arriba = nuevo;
                this.primero = nuevo;
            }else{
                let aux = this.primero;
                while(aux != null){
                    if(nuevo.dia < aux.dia){
                        nuevo.abajo = aux;
                        nuevo.arriba = aux.arriba;
                        aux.arriba.abajo = nuevo;
                        aux.arriba= nuevo;
                        break;
                    }else if(nuevo.dia == aux.dia && nuevo.hora == aux.hora){
                        console.log("La posicion ya esta ocupada-> "+nuevo.dia+","+nuevo.hora);
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

    recorrer_dia(){
        let aux = this.primero;
        while(aux != null){
            console.log("valor =",aux.valor," - dia = ",aux.dia , " hora = ",aux.hora);
            aux = aux.sig;
        }
    }
    recorrer_hora(){
        let aux = this.primero;
        while(aux != null){
            console.log("valor =",aux.valor," - dia = ",aux.dia , " hora = ",aux.hora);
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
        this.cabecetas_dia = new lista_cabecera();
        this.cabecetas_hora = new lista_cabecera();
    }

    insertar_evento(valor,dia,hora){
        let nodo_cabecera_dia = this.cabecetas_dia.buscar_cabecera(dia);
        let nodo_cabecera_hora = this.cabecetas_hora.buscar_cabecera(hora);

        if(nodo_cabecera_dia == null){
            nodo_cabecera_dia =  new nodo_cabecera(dia);
            this.cabecetas_dia.insertar_cabecera(nodo_cabecera_dia);
        }

        if(nodo_cabecera_hora == null){
            nodo_cabecera_hora =  new nodo_cabecera(hora);
            this.cabecetas_hora.insertar_cabecera(nodo_cabecera_hora);
        }
        nodo_cabecera_dia.lista_interna.insertar_dia(valor,dia,hora);
        //insertar en cabecera Y
        nodo_cabecera_hora.lista_interna.insertar_hora(valor,dia,hora);
    }

    recorrer_matriz(){
        console.log("cabeceras en dia");
        let aux = this.cabecetas_dia.primero;
        while(aux != null){
            console.log("   pos->"+aux.dato);
            let aux2 = aux.lista_interna.primero;
            while(aux2!= null){
                console.log("       -"+aux2.valor);
                aux2 = aux2.sig;
            }
            aux = aux.sig;
        }

        console.log("cabeceras en hora");
        aux = this.cabecetas_hora.primero;
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
        cadena+="node[label = Matriz fillcolor=\" darkolivegreen1\" pos = \"-1,1!\"]principal;"
        let aux_dia = this.cabecetas_dia.primero;
        while(aux_dia!=null){
            cadena+="node[label = "+aux_dia.dato+" fillcolor=\" azure1\" pos = \""+aux_dia.dato+",1!\"]dia"+aux_dia.dato+";\n"
            aux_dia = aux_dia.sig;
        }
        aux_dia = this.cabecetas_dia.primero;
        while(aux_dia.sig != null){
            cadena+="dia"+aux_dia.dato+"->"+"dia"+aux_dia.sig.dato+";\n"
            cadena+="dia"+aux_dia.sig.dato+"->"+"dia"+aux_dia.dato+";\n"
            aux_dia = aux_dia.sig;
        }

        if(this.cabecetas_dia.primero!= null){
            cadena+="principal->dia"+this.cabecetas_dia.primero.dato+";\n";
        }
        let aux_hora = this.cabecetas_hora.primero;
        while(aux_hora!=null){
            cadena+="node[label = "+aux_hora.dato+" fillcolor=\" azure1\" pos = \"-1,-"+aux_hora.dato+"!\"]hora"+aux_hora.dato+";\n"
            aux_hora = aux_hora.sig;
        }
        aux_hora = this.cabecetas_hora.primero;
        while(aux_hora.sig != null){
            cadena+="hora"+aux_hora.dato+"->"+"hora"+aux_hora.sig.dato+";\n"
            cadena+="hora"+aux_hora.sig.dato+"->"+"hora"+aux_hora.dato+";\n"
            aux_hora = aux_hora.sig;
        }

        if(this.cabecetas_dia.primero!= null){
            cadena+="principal->hora"+this.cabecetas_hora.primero.dato+";\n";
        }
        aux_dia = this.cabecetas_dia.primero;
        while(aux_dia!=null){ //recorrer listas de x para graficar los nodos de sus lista interna
            let aux = aux_dia.lista_interna.primero;
            while(aux!=null){
                cadena+="   node[label = "+aux.valor+" fillcolor=\" gold2\" pos = \""+aux.dia+",-"+aux.hora+"!\"]dia"+aux.dia+"hora"+aux.hora+";\n"
                aux = aux.sig;
            }
            aux = aux_dia.lista_interna.primero;
            while(aux.sig!= null){
                cadena+="   dia"+aux.dia+"hora"+aux.hora+"->dia"+aux.sig.dia+"hora"+aux.sig.hora+";\n";
                cadena+="   dia"+aux.sig.dia+"hora"+aux.sig.hora+"->dia"+aux.dia+"hora"+aux.hora+";\n";
                aux= aux.sig;
            }
            if(aux_dia.lista_interna.primero!= null){
                cadena+="dia"+aux_dia.dato+"->"+"dia"+aux_dia.lista_interna.primero.dia+"hora"+aux_dia.lista_interna.primero.hora+";\n";
            }

            aux_dia = aux_dia.sig;
        }

        aux_hora = this.cabecetas_hora.primero;
        while(aux_hora!=null){
            let aux = aux_hora.lista_interna.primero;
            while(aux.abajo!= null){
                cadena+="   dia"+aux.dia+"hora"+aux.hora+"->dia"+aux.abajo.dia+"hora"+aux.abajo.hora+";\n";
                cadena+="   dia"+aux.abajo.dia+"hora"+aux.abajo.hora+"->dia"+aux.dia+"hora"+aux.hora+";\n";
                aux= aux.abajo;
            }
            if(aux_hora.lista_interna.primero!= null){
                cadena+="hora"+aux_hora.dato+"->"+"dia"+aux_hora.lista_interna.primero.dia+"hora"+aux_hora.lista_interna.primero.hora+";\n";
            }
            aux_hora = aux_hora.sig;
        }

        cadena+= "\n}"
        console.log(cadena);
    }
}


let matriz1 = new matriz();

matriz1.insertar_evento(0,0,0);
matriz1.insertar_evento(50,0,1);
matriz1.insertar_evento(5,1,1);
matriz1.insertar_evento(6,2,3);
matriz1.insertar_evento(1,10,1);
matriz1.insertar_evento(2,1,2);
matriz1.insertar_evento(7,3,3);

matriz1.recorrer_matriz();
matriz1.graficar_matriz();