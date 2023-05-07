let orden = []
class nodo_estudiante{
    constructor(carnet, nombre, password, carpeta_raiz){
        this.carnet = carnet;
        this.nombre = nombre;
        this.password = password;
        this.carpeta_raiz = carpeta_raiz;
        this.izquierda = null;
        this.der = null;
        this.altura = 0;
    }
}

class avl{
    constructor(){
        this.raiz = null;
    }

    insertar(carnet, nombre, password, carpeta_raiz){
        let nuevo = new nodo_estudiante(carnet, nombre, password, carpeta_raiz);

        if(this.raiz == null){
            this.raiz= nuevo;
        }else{
            this.raiz = this.insertar_nodo_estudiante(this.raiz,nuevo);
        }
    }

    insertar_nodo_estudiante(raiz_actual,nuevo){
        if(raiz_actual != null){
            //recorrer hijos
            if(raiz_actual.carnet > nuevo.carnet){
                raiz_actual.izquierda = this.insertar_nodo_estudiante(raiz_actual.izquierda,nuevo);
                //validaciones
                
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izquierda)==-2){
                    //console.log("entra a rotacion IZQUIERDA");
                    //if(this.altura(raiz_actual.izq.der)-this.altura(raiz_actual.izquierda.izquierda))
                    if(nuevo.carnet < raiz_actual.izquierda.carnet){ //-1 ROTACION IZQUIERDA
                        //console.log("entra a rotacion IZQUIERDA IZQUIERDA");
                        raiz_actual = this.r_izquierda(raiz_actual);
                    }else{ //1 ROTACION IZQ-DERECHA
                        //console.log("entra a rotacion IZQUIERDA DERECHA");
                        raiz_actual = this.r_izquierda_der(raiz_actual);
                    }
                }
            }else if(raiz_actual.carnet < nuevo.carnet){
                raiz_actual.der = this.insertar_nodo_estudiante(raiz_actual.der,nuevo);
                //validaciones
                if(this.altura(raiz_actual.der)-this.altura(raiz_actual.izquierda)==2){
                    //console.log("entra a rotacion DERECHA");
                    if(nuevo.carnet > raiz_actual.der.carnet){ // 1 ROTACION DERECHA
                        //console.log("entra a rotacion DERECHA DERECHA");
                        raiz_actual=this.r_derecha(raiz_actual);
                    }else{//-1 ROTACION DERECHA IZQUIERDA
                        //console.log("entra a rotacion DERECHA IZQUIERDA");
                        raiz_actual = this.r_der_izquierda(raiz_actual);
                    }
                }

            }else{
                console.log("NO SE PUEDE INSERTAR EL carnet PORQUE YA EXISTE");
            }

            raiz_actual.altura = this.altura_maxima(this.altura(raiz_actual.der),this.altura(raiz_actual.izquierda))+1;
            return raiz_actual;
        }else{
            raiz_actual = nuevo;
            return raiz_actual;
        }
    }

    altura(nodo_estudiante){
        if(nodo_estudiante != null){
            return nodo_estudiante.altura;
        }else{
            return -1;
        }
    }

    altura_maxima(h1,h2){
        if(h2>=h1){ //************************ MAYOR O IGUAL */
            return h2;
        }else{
            return h1;
        }

    }
    //ROTACIONES
    //simple izquerda
    r_izquierda(nodo_estudiante){
        let aux = nodo_estudiante.izquierda;
        nodo_estudiante.izquierda= aux.der;
        aux.der = nodo_estudiante;
        nodo_estudiante.altura = this.altura_maxima(this.altura(nodo_estudiante.der),this.altura(nodo_estudiante.izquierda)) +1;
        aux.altura = this.altura_maxima(nodo_estudiante.altura.altura,this.altura(nodo_estudiante.izquierda))+1;
        return aux;
    }
    //simple derecha
    r_derecha(nodo_estudiante){
        let aux = nodo_estudiante.der;
        nodo_estudiante.der= aux.izquierda;
        aux.izquierda = nodo_estudiante;
        nodo_estudiante.altura = this.altura_maxima(this.altura(nodo_estudiante.izquierda),this.altura(nodo_estudiante.der)) +1;
        aux.altura = this.altura_maxima(nodo_estudiante.altura.altura,this.altura(nodo_estudiante.der))+1;
        return aux;
    }

    //rotacion izq-der
    r_izquierda_der(nodo_estudiante){
        nodo_estudiante.izquierda = this.r_derecha(nodo_estudiante.izquierda);
        let aux = this.r_izquierda(nodo_estudiante);
        return aux;
    }

    //rotacion der-izq
    r_der_izquierda(nodo_estudiante){
        nodo_estudiante.der = this.r_izquierda(nodo_estudiante.der);
        let aux = this.r_derecha(nodo_estudiante);
        return aux;
    }

    //****************************************************** */

    preorden(raiz_actual){
        if(raiz_actual != null){
            //console.log(raiz_actual.carnet);
            var estudiante = {
                carnet : raiz_actual.carnet,
                nombre : raiz_actual.nombre
            }
            console.log("Carnet Entrante: "+raiz_actual.carnet);
            orden.push(estudiante);
            this.preorden(raiz_actual.izquierda);
            this.preorden(raiz_actual.der);
            orden.push(raiz_actual.carnet);
        }
        return orden;
    }
    inOrden(raiz_actual){
        if(raiz_actual != null){
            this.inOrden(raiz_actual.izquierda);
            var estudiante = {
                carnet : raiz_actual.carnet,
                nombre : raiz_actual.nombre
            }
            console.log("Carnet Entrante: "+raiz_actual.carnet);
            orden.push(estudiante);
            console.log("altura= "+(this.altura(raiz_actual.der)-this.altura(raiz_actual.iz)))
            this.inOrden(raiz_actual.der);
        }
        return orden;
    }

    postOrden(raiz_actual){
        if(raiz_actual != null){
            this.postOrden(raiz_actual.izquierda);
            this.postOrden(raiz_actual.der);
            var estudiante = {
                carnet : raiz_actual.carnet,
                nombre : raiz_actual.nombre
            }
            console.log("Carnet Entrante: "+raiz_actual.carnet);
            orden.push(estudiante);
        }
        return orden;
    }

    generarDot(){
        let cadena="digraph arbol {\n" +"node [shape = record, color=black , style=filled, fillcolor=olivedrab2];\n" + 'edge[arrowhead = icurve color="chocolate4" penwidth="1.5"];\n';
        cadena+= this.generar_nodo_estudiantes(this.raiz);
        cadena+="\n";
        cadena+=this.enlazar(this.raiz);
        cadena+="\n}";

        return cadena;
    }

/*
    generar_nodo_estudiantes(raiz_actual){ //metodo preorden
        let nodo_estudiantes ="";
        if(raiz_actual != null){
       
            nodo_estudiantes+= "n"+raiz_actual.carnet+" [ label =\"<C0>|"+"Carnet: "+ raiz_actual.carnet+"\nNombre: "+ raiz_actual.nombre+ "\nAltura: "+ raiz_actual.altura+ "|<C1>\"];\n";
            nodo_estudiantes+=this.generar_nodo_estudiantes(raiz_actual.izquierda);
            nodo_estudiantes+=this.generar_nodo_estudiantes(raiz_actual.der);
        }
        return nodo_estudiantes;
    }
    */
/*
    generar_nodo_estudiantes(raiz_actual){ //metodo inorden
        let nodo_estudiantes ="";
        if(raiz_actual != null){
            nodo_estudiantes+=this.generar_nodo_estudiantes(raiz_actual.izquierda);
            nodo_estudiantes+= "n"+raiz_actual.carnet+" [ label =\"<C0>|"+"Carnet: "+ raiz_actual.carnet+"\nNombre: "+ raiz_actual.nombre+ "\nAltura: "+ raiz_actual.altura+ "|<C1>\"];\n";
            nodo_estudiantes+=this.generar_nodo_estudiantes(raiz_actual.der);
        }
        return nodo_estudiantes;
    }
*/

    generar_nodo_estudiantes(raiz_actual){ //metodo postorden
        let nodo_estudiantes ="";
        if(raiz_actual != null){
            nodo_estudiantes+=this.generar_nodo_estudiantes(raiz_actual.izquierda);
            nodo_estudiantes+=this.generar_nodo_estudiantes(raiz_actual.der);
            nodo_estudiantes+= "n"+raiz_actual.carnet+" [ label =\"<C0>|"+"Carnet: "+ raiz_actual.carnet+"\nNombre: "+ raiz_actual.nombre+ "\nAltura: "+ raiz_actual.altura+ "|<C1>\"];\n";
        }
        return nodo_estudiantes;
    }



    enlazar(raiz_actual){
        let cadena="";
        if(raiz_actual != null){
            cadena += this.enlazar(raiz_actual.izquierda);
            cadena += this.enlazar(raiz_actual.der);
            //validaciones
            if(raiz_actual.izquierda != null){
                cadena+="n"+raiz_actual.carnet + "-> n"+raiz_actual.izquierda.carnet+"\n";
            }
            if(raiz_actual.der != null){
                cadena+="n"+raiz_actual.carnet + "-> n"+raiz_actual.der.carnet+"\n";
            }

            
        }
        return cadena;
    }
    buscar(carnet){
        let aux = this.raiz;
        while(aux != null){
            if(carnet == aux.carnet){
                return aux.nombre;
            }else if(carnet < aux.carnet){
                aux = aux.izquierda;
            }else{
                aux = aux.der;
            }
        }
        return null;
    }
    eliminar_todo(){
        this.raiz = null;
    }
}