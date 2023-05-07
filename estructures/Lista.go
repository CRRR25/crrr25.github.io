package estructures

import (
	"fmt"
	"strconv"
	"time"
)

type ListaDoble struct {
	Inicio   *Nodo
	Final    *Nodo
	Longitud int
}

type Nodo struct {
	carnet    int
	nombre    string
	pass      string
	anterior  *Nodo
	siguiente *Nodo
	//pila      *Pila
}

func (l *ListaDoble) estaVacia() bool {
	if l.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (l *ListaDoble) AgregarEstudiante(carnet int, nombre string, pass string) {
	if l.estaVacia() {
		nuevoNodo := &Nodo{carnet: carnet, nombre: nombre, pass: pass, anterior: nil, siguiente: nil}
		l.Inicio = nuevoNodo
		l.Final = nuevoNodo
		l.Longitud++
	} else {
		nuevoNodo := &Nodo{carnet: carnet, nombre: nombre, pass: pass, anterior: nil, siguiente: nil}
		aux := l.Final
		aux.siguiente = nuevoNodo
		nuevoNodo.anterior = aux
		l.Final = nuevoNodo
		l.Longitud++
	}
}
func (l *ListaDoble) Graficar_Lista() {
	nombre_archivo := "Archivos/Lista.dot"
	nombre_imagen := "Archivos/Lista.jpg"
	contenido := "digraph G {\n"
	contenido += "\trankdir=LR;\n"
	contenido += "\tnode [shape=record];\n"
	contenido += "\tgraph [splines=ortho];\n"
	contenido += "\tsubgraph cluster_0 {\n"
	contenido += "\t\tstyle=filled;\n"
	contenido += "\t\tcolor=crimson;\n"
	contenido += "\t\tnode [style=filled,color=aquamarine1];\n"
	contenido += "\t\tlabel = \"Lista de Estudiantes\";\n"
	aux := l.Inicio
	for i := 0; i < l.Longitud; i++ {
		contenido += "\t\t" + strconv.Itoa(aux.carnet) + " [label=\"<f0> |<f1> " + strconv.Itoa(aux.carnet) + "|" + aux.nombre + " |<f2> \"];\n"
		aux = aux.siguiente
	}
	contenido += "\t}\n"
	aux = l.Inicio
	for i := 0; i < l.Longitud-1; i++ {
		contenido += "\t" + strconv.Itoa(aux.carnet) + ":f2 -> " + strconv.Itoa(aux.siguiente.carnet) + ":f0;\n"
		aux = aux.siguiente
	}
	aux = l.Inicio
	for i := 0; i < l.Longitud-1; i++ {
		contenido += "\t" + strconv.Itoa(aux.siguiente.carnet) + ":f0 -> " + strconv.Itoa(aux.carnet) + ":f2;\n"
		aux = aux.siguiente
	}
	contenido += "}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(contenido, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

func (l *ListaDoble) Mostrar() {
	fmt.Println("Lista de estudiantes: ")
	aux := l.Inicio
	for i := 0; i < l.Longitud; i++ {
		println("Carnet: " + strconv.Itoa(aux.carnet) + " Nombre: " + aux.nombre + " Pass: " + aux.pass)
		aux = aux.siguiente
	}
}

func (l *ListaDoble) ArchivoJSON() {
	contenido := "{\n"
	contenido += "\t\"alumnos\": [\n"
	aux := l.Inicio
	for aux.siguiente != nil {
		contenido += "\t\t{\n"
		contenido += "\t\t\t\"nombre\": " + aux.nombre + ", \n"
		contenido += "\t\t\t\"carnet\": " + strconv.Itoa(aux.carnet) + ", \n"
		contenido += "\t\t\t\"password\": " + aux.pass + ", \n"
		contenido += "\t\t\t\"Carpeta_Raiz\": \"/\" \n"
		contenido += "\t\t},\n"
		aux = aux.siguiente
	}
	//esto es para el ultimo elemento
	contenido += "\t\t{\n"
	contenido += "\t\t\t\"nombre\": " + aux.nombre + ", \n"
	contenido += "\t\t\t\"carnet\": " + strconv.Itoa(aux.carnet) + ", \n"
	contenido += "\t\t\t\"password\": " + aux.pass + ", \n"
	contenido += "\t\t\t\"Carpeta_Raiz\": \"/\" \n"
	contenido += "\t\t}\n"
	contenido += "\t]\n"
	contenido += "}"
	EscribirArchivo(contenido)
}

type nodo struct {
	nomnbre   string
	apellido  string
	carnet    int
	pass      string
	siguiente *nodo
}
type Cola struct {
	Primero  *nodo
	Longitud int
}

func (c *Cola) estaVacia() bool {
	if c.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (c *Cola) Encolar(nombre string, apellido string, carnet int, pass string) {
	if c.estaVacia() {
		nuevoNodo := &nodo{nombre, apellido, carnet, pass, nil}
		c.Primero = nuevoNodo
		c.Longitud++
	} else {
		nuevoNodo := &nodo{nombre, apellido, carnet, pass, nil}
		aux := c.Primero
		for aux.siguiente != nil {
			aux = aux.siguiente
		}
		aux.siguiente = nuevoNodo
		c.Longitud++
	}
}

func (c *Cola) Descolar() {
	if c.estaVacia() {
		fmt.Println("La cola no contiene elementos")
	} else {
		fmt.Println("Se rechazo al estudiante:", c.Primero.nomnbre)
		c.Primero = c.Primero.siguiente
		c.Longitud--
	}
}

func (c *Cola) MostrarPrimero() {
	fmt.Println(c.Primero.nomnbre)
}

var retorno string

func (c *Cola) Aceptar() string {

	if c.estaVacia() {
		retorno = "No hay estudiantes en la cola"
	} else {
		fmt.Println("Se acepto al estudiante: " + c.Primero.nomnbre + " " + c.Primero.apellido)
		carnet := strconv.Itoa(c.Primero.carnet)
		nombre_completo := c.Primero.nomnbre + " " + c.Primero.apellido
		retorno = carnet + " " + nombre_completo + " " + c.Primero.pass
		c.Primero = c.Primero.siguiente
		c.Longitud--
	}
	return retorno
}

func (c *Cola) Mostrar() {
	aux := c.Primero
	for i := 0; i < c.Longitud; i++ {
		fmt.Println("Posicion:", i)
		fmt.Println("Nombre:", aux.nomnbre)
		fmt.Println("Apellido:", aux.apellido)
		fmt.Println("Carnet:", aux.carnet)
		fmt.Println("Pass:", aux.pass)
		aux = aux.siguiente
	}
}

func (c *Cola) Graficar() {
	nombre_archivo := "Archivos/cola.dot"
	nombre_imagen := "Archivos/cola.jpg"
	texto := "digraph cola{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record];\n"
	texto += "nodonull2[label=\"null\"];\n"
	aux := c.Primero
	contador := 0
	for i := 0; i < c.Longitud; i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + "[label=\"{" + aux.nomnbre + "|}\"];\n"
		aux = aux.siguiente
	}
	for i := 0; i < c.Longitud-1; i++ {
		c := i + 1
		texto += "nodo" + strconv.Itoa(i) + "->nodo" + strconv.Itoa(c) + ";\n"
		contador = c
	}
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull2;\n"
	texto += "}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

func Obtener_Hora() string {
	t := time.Now()
	fecha := fmt.Sprintf("%d-%02d-%02dT%02d:%02d", t.Year(), t.Month(), t.Day(), t.Hour(), t.Minute())
	return fecha
}

type nodoPila struct {
	hora      string
	siguiente *nodoPila
}

type Pila struct {
	Primero  *nodoPila
	Longitud int
}

func (p *Pila) estaVacia() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Push(hora string) {
	if p.estaVacia() {
		nuevoNodo := &nodoPila{hora, nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &nodoPila{hora, p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

func (p *Pila) Pop() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		p.Primero = p.Primero.siguiente
		p.Longitud--
	}
}

func (p *Pila) Peek() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		fmt.Println(p.Primero.hora)
	}
}

func (p *Pila) GraficarPila() {
	nombre_archivo := "Archivos/pila.dot"
	nombre_imagen := "Archivos/pila.jpg"
	texto := "digraph pila{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record]"
	aux := p.Primero
	texto += "nodo0 [label=\""
	for i := 0; i < p.Longitud; i++ {
		texto = texto + "|(" + aux.hora + ")"
		aux = aux.siguiente
	}
	texto += "\"]; \n}"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(texto, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}
