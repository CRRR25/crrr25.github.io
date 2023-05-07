package estructures

import (
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strconv"
)

func LeerArchivo(ruta string) {
	ListaDoble := &ListaDoble{}
	file, err := os.Open(ruta)
	if err != nil {
		fmt.Println("Error: No se pudo abrir el archivo.")
		return
	}
	defer file.Close()

	leer := csv.NewReader(file)
	leer.Comma = ','
	encabezado := true
	for {
		linea, err := leer.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println("Error: La linea no se pudo leer con exito.")
			continue
		}
		if encabezado {
			encabezado = false
			continue
		}
		carne, _ := strconv.Atoi(linea[0])
		ListaDoble.AgregarEstudiante(carne, linea[1], linea[2])
	}
	ListaDoble.Mostrar()
}

func CrearArchivo() {
	//Verifica que el archivo existe
	var _, err = os.Stat("Archivos/Archivo.json")
	//Crea el archivo si no existe
	if os.IsNotExist(err) {
		var file, err = os.Create("Archivos/Archivo.json")
		if err != nil {
			return
		}
		defer file.Close()
	}
	fmt.Println("Archivo creado exitosamente", "Archivo.json")
}

func EscribirArchivo(contenido string) {
	CrearArchivo()
	var file, err = os.OpenFile("Archivos/Archivo.json", os.O_RDWR, 0644)
	if err != nil {
		return
	}
	defer file.Close()
	// Escribe algo de texto linea por linea
	_, err = file.WriteString(contenido)
	if err != nil {
		return
	}
	// Salva los cambios
	err = file.Sync()
	if err != nil {
		return
	}
	fmt.Println("Archivo actualizado existosamente.")
}
