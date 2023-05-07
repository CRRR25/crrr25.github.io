
class nodo_vendedor{
    constructor(id, nombre, edad, correo, password){
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.correo = correo;
        this.password = password;
        this.clientes = new lista_doble();
        this.meses = new lista_doble();
        this.izq = null;
        this.der = null;
        this.altura = 0;
    }
}

class avl{
    constructor(){
        this.raiz = null;
    }

    insertar(id, nombre, edad, correo, password){
        let nuevo = new nodo_vendedor(id, nombre, edad, correo, password);

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
                
                
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)==-2){
                    console.log("entra a rotacion IZQUIERDA");
                    
                    if(nuevo.id < raiz_actual.izq.id){ 
                        console.log("entra a rotacion IZQUIERDA IZQUIERDA");
                        raiz_actual = this.r_izquierda(raiz_actual);
                    }else{ 
                        console.log("entra a rotacion IZQUIERDA DERECHA");
                        raiz_actual = this.r_izq_der(raiz_actual);
                    }
                }
            }else if(raiz_actual.id < nuevo.id){
                raiz_actual.der = this.insertar_nodo(raiz_actual.der,nuevo);
               
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izq)==2){
                    console.log("entra a rotacion DERECHA");
                    if(nuevo.id > raiz_actual.der.id){ 
                        console.log("entra a rotacion DERECHA DERECHA");
                        raiz_actual=this.r_derecha(raiz_actual);
                    }else{
                        console.log("entra a rotacion DERECHA IZQUIERDA");
                        raiz_actual = this.r_der_izq(raiz_actual);
                    }
                }

            }else{
                console.log("NO SE PUEDE INSERTAR EL id PORQUE YA EXISTE");
            }

            raiz_actual.altura = this.altura_maxima(this.altura(raiz_actual.der),this.altura(raiz_actual.izq))+1;
            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    altura(nodo){
        if(nodo != null){
            return nodo.altura;
        }else{
            return -1;
        }
    }

    altura_maxima(h1,h2){
        if(h2>=h1){ 
            return h2;
        }else{
            return h1;
        }

    }
    r_izquierda(nodo){
        let aux = nodo.izq;
        nodo.izq= aux.der;
        aux.der = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.der),this.altura(nodo.izq)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.izq))+1;
        return aux;
    }

    r_derecha(nodo){
        let aux = nodo.der;
        nodo.der= aux.izq;
        aux.izq = nodo;
        nodo.altura = this.altura_maxima(this.altura(nodo.izq),this.altura(nodo.der)) +1;
        aux.altura = this.altura_maxima(nodo.altura.altura,this.altura(nodo.der))+1;
        return aux;
    }

    r_izq_der(nodo){
        nodo.izq = this.r_derecha(nodo.izq);
        let aux = this.r_izquierda(nodo);
        return aux;
    }

    r_der_izq(nodo){
        nodo.der = this.r_izquierda(nodo.der);
        let aux = this.r_derecha(nodo);
        return aux;
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
            console.log("altura= "+(this.altura(raiz_actual.der)-this.altura(raiz_actual.iz)))
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

    Buscar(id, nodo){
        
        if(nodo.id == id){
            console.log("encontrado " + nodo.nombre)
            return nodo
        }
        else if(nodo.id> id){
            nodo = nodo.izq
            console.log("izquierda " + nodo.nombre)
            return this.Buscar(id,nodo)

        }else if(nodo.id < id){
            nodo = nodo.der
            console.log("derecha " + nodo.nombre)
            return this.Buscar(id,nodo)
        }else{

            console.log("No se encontro el elemento dentro del arbol avl");
            return null
        }
    }

    generarDot(){
        let cadena="digraph arbol_avl {\n";
        cadena+= this.generar_nodos(this.raiz);
        cadena+="\n";
        cadena+=this.enlazar(this.raiz);
        cadena+="\n}";
        console.log(cadena);
        return cadena;
    }

    generar_nodos(raiz_actual){ 
        let nodos ="";
        if(raiz_actual != null){
            nodos+= "n"+raiz_actual.id+"[label=\" id: "+raiz_actual.id+"  nombre: "+raiz_actual.nombre+" correo: "+raiz_actual.correo+"\"]\n";
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



class nodo_cliente{
    constructor(id,nombre,correo){
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.siguiente = null;
        this.anterior = null;
    }
}
class nodo_mes{
    constructor(mes){
        this.mes = mes;
        this.calendario = new matriz();
        this.siguiente = null;
        this.anterior = null;
    }
}

class lista_doble{
    constructor(){
        this.primero=null;
    }

    insertar(id,nombre,correo){
        let nuevo = new nodo_cliente(id,nombre,correo);
        if(this.primero == null){ //la lista esta vacia
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            while(aux.siguiente != null){
                if(aux.id==id){
                    console.log("el valor ya existe, No se puede insertar");
                    return
                }
                aux = aux.siguiente;
            };
            if(aux.id==id){
                console.log("el valor ya existe, No se puede insertar");
                return
            }
            aux.siguiente = nuevo;
            nuevo.anterior = aux;
        }
    }
    insertar2(mes){
        let nuevo = new nodo_mes(mes);
        if(this.primero == null){
            this.primero = nuevo;
        }else{
            let aux = this.primero;
            while(aux.siguiente != null){
                if(aux.mes==mes){
                    console.log("el valor ya existe, No se puede insertar");
                    return
                }
                aux = aux.siguiente;
            };
            if(aux.mes==mes){
                console.log("el valor ya existe, No se puede insertar");
                return
            }
            aux.siguiente = nuevo;
            nuevo.anterior = aux;
        }
    }
    buscar_mess(mes){
        let aux = this.primero;
        while(aux != null){
            if(aux.mes==mes){
                
                return aux
            }
            aux = aux.siguiente;
        }

        return null

    }
    mostrar(){
        let aux = this.primero;
        console.log("***** Mostar Lista *****")
        while(aux != null){
            
            console.log('* '+aux.id+' '+aux.nombre);
            aux = aux.siguiente;
        }
    }
    mostrar2(){
        let aux = this.primero;
        console.log("***** Mostar Lista *****")
        while(aux != null){
            
            console.log('* '+aux.mes);
            aux = aux.siguiente;
        }
    }

    
}

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



//arbol = new avl();
//
//arbol.insertar(30, "rangel", 12,5555,"dhdhdh");
//arbol.insertar(40, "tavo", 12,5555,"dhdhdh");
//arbol.insertar(20, "jose", 12,5555,"dhdhdh");
//arbol.insertar(10, "vivi", 12,5555,"dhdhdh");
//arbol.insertar(5, "isa", 12,5555,"dhdhdh");
//arbol.insertar(70, "nao", 12,5555,"dhdhdh");
//
//arbol.inOrden(arbol.raiz);
//arbol.generarDot();
//let nodo  = arbol.raiz;
//vendedor = arbol.Buscar(70, nodo);
//vendedor.clientes.insertar(1,"tavo","ggggg") ;
//
//vendedor.clientes.mostrar()

//var lista = new lista_doble();
//lista.insertar2("enero");
//lista.insertar2("enero");
//lista.insertar2("marzo");
//lista.insertar2("diciembre");
//lista.mostrar2();
//var b = lista.buscar_mess("enero")
//if(b != null){
//    console.log("encotrado "+b.mes);
//    b.calendario.insertar_evento("\"si sale\"",12,13)
//    b.calendario.recorrer_matriz();
//    b.calendario.graficar_matriz();
//}else{
//    console.log("no encotrado insertar ");
//    lista.insertar2("junio");
//    var c = lista.buscar_mess("junio");
//    c.calendario.insertar_evento("\"si sale\"",12,13)
//    c.calendario.insertar_evento("\"si sale\"",14,13)
//    lista.mostrar2();
//    c.calendario.recorrer_matriz();
//    c.calendario.graficar_matriz();
//}

