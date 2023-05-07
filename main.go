package main

import (
	f "Fase1/estructures"
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

//func main() {
//	cola := f.Cola{Primero: nil, Longitud: 0}
//	lista := f.ListaDoble{Inicio: nil, Final: nil, Longitud: 0}
//	enMenuPrincipal := true
//
//	for enMenuPrincipal {
//		fmt.Println("********* EDD GoDrive ******************")
//		fmt.Println("		1. Iniciar Sesion Admin			")
//		fmt.Println("		2. Iniciar Sesion Estudiante	")
//		fmt.Println("		3. Salir						")
//		fmt.Println("***********************************")
//		fmt.Println("Ingrese una opcion:")
//		var opcion int
//		fmt.Scanln(&opcion)
//
//		switch opcion {
//		case 1:
//			var teclado int
//			for {
//				fmt.Println("***Dashboard Administrador - EDD GoDrive ***")
//				fmt.Println("*		1. Ver Estudiantes Pendientes		*")
//				fmt.Println("*		2. Ver Estudiantes del Sistema		*")
//				fmt.Println("*		3. Registrar un nuevo Estudiante	*")
//				fmt.Println("*		4. Carga MasiVa de Estudiantes		*")
//				fmt.Println("*		5. Cerrar Sesion					*")
//				fmt.Println("********************************************")
//				fmt.Println("Ingrese una opcion:")
//				fmt.Scanln(&teclado)
//
//				switch teclado {
//				case 1:
//					cola.Mostrar()
//					var opcion1 int
//					for {
//						fmt.Println("********* EDD GoDrive ******************")
//						fmt.Println("		1. Aceptar Estudiante					")
//						fmt.Println("		2. Rechazar	Estudiante					")
//						fmt.Println("		3. Volver al menu						")
//						fmt.Println("***********************************")
//						fmt.Println("Ingrese una opcion:")
//						fmt.Scanln(&opcion1)
//
//						switch opcion1 {
//						case 1:
//							informacion := cola.Aceptar()
//							linea := strings.Split(informacion, " ")
//							carne, _ := strconv.Atoi(linea[0])
//							lista.AgregarEstudiante(carne, linea[1], linea[2])
//							//lista.Mostrar()
//						case 2:
//							cola.Descolar()
//						case 3:
//							enMenuPrincipal = false
//						default:
//							fmt.Println("Opción inválida")
//						}
//					}
//				case 2:
//					fmt.Println("Ver estudiantes del sistema")
//					lista.Mostrar()
//				case 3:
//					fmt.Println("Ingrese el carnet de nuevo estudiante:")
//					var carnet int
//					fmt.Scanln(&carnet)
//					fmt.Println("Ingrese el nombre de nuevo estudiante:")
//					var nombre string
//					fmt.Scanln(&nombre)
//					fmt.Println("Ingrese el apellido de nuevo estudiante:")
//					var apellido string
//					fmt.Scanln(&apellido)
//					fmt.Println("Ingrese el password de nuevo estudiante:")
//					var pass string
//					fmt.Scanln(&pass)
//					cola.Encolar(nombre, apellido, carnet, pass)
//					//cola.Mostrar()
//				case 4:
//					fmt.Println("Carga masiva de estudiantes")
//					var ruta string
//					fmt.Println("Ingrese la ruta del archivo: ")
//					fmt.Scanln(&ruta)
//					file, err := os.Open(ruta)
//					if err != nil {
//						fmt.Println("Error: No se pudo abrir el archivo.")
//						return
//					}
//					defer file.Close()
//
//					leer := csv.NewReader(file)
//					leer.Comma = ','
//					encabezado := true
//					for {
//						linea, err := leer.Read()
//						if err == io.EOF {
//							break
//						}
//						if err != nil {
//							fmt.Println("Error: La linea no se pudo leer con exito.")
//							continue
//						}
//						if encabezado {
//							encabezado = false
//							continue
//						}
//						carne, _ := strconv.Atoi(linea[0])
//						lista.AgregarEstudiante(carne, linea[1], linea[2])
//					}
//				case 5:
//					enMenuPrincipal = false
//
//				default:
//					fmt.Println("Opción inválida")
//				}
//			}
//		case 2:
//			fmt.Println("Ha elegido la opción 2")
//		case 3:
//			return
//		default:
//			fmt.Println("Opción inválida")
//		}
//	}
//}

func Menu_Estudiante() {
	var opcion int
	for {
		fmt.Println("********* EDD GoDrive ******************")
		fmt.Println("		1. Iniciar Sesion Estudiante	")
		fmt.Println("		2. Salir						")
		fmt.Println("***********************************")
		fmt.Println("Ingrese una opcion:")
		fmt.Scanln(&opcion)

		switch opcion {
		case 1:
			fmt.Println("Ver archivos")
		case 2:
			fmt.Println("Subir archivo")
		case 3:
			fmt.Println("Descargar archivo")
		case 4:
			return
		default:
			fmt.Println("Opción inválida")
		}
	}
}

func main() {
	cola := f.Cola{Primero: nil, Longitud: 0}
	lista := f.ListaDoble{Inicio: nil, Final: nil, Longitud: 0}
	pila := f.Pila{Primero: nil, Longitud: 0}
	enMenuPrincipal := true

	// Bucle principal del programa
	for enMenuPrincipal {
		fmt.Println("********* EDD GoDrive ******************")
		fmt.Println("		1. Iniciar Sesion Admin			")
		fmt.Println("		2. Iniciar Sesion Estudiante	")
		fmt.Println("		3. Salir						")
		fmt.Println("***********************************")
		fmt.Print("Seleccione una opción: ")
		var seleccion int
		fmt.Scanln(&seleccion)
		switch seleccion {
		case 2:
			fmt.Println("Inicio de sesión Estudiante")
		case 1:
			pila.Push(f.Obtener_Hora())
			pila.GraficarPila()
			fmt.Println("***Dashboard Administrador - EDD GoDrive ***")
			fmt.Println("*		1. Ver Estudiantes Pendientes		*")
			fmt.Println("*		2. Ver Estudiantes del Sistema		*")
			fmt.Println("*		3. Registrar un nuevo Estudiante	*")
			fmt.Println("*		4. Carga Masiva de Estudiantes		*")
			fmt.Println("*		5. Cerrar Sesion					*")
			fmt.Println("********************************************")
			fmt.Print("Seleccione una opción: ")
			var seleccionSecundaria int
			fmt.Scanln(&seleccionSecundaria)

			switch seleccionSecundaria {
			case 2:
				fmt.Println("Ver Estudiantes del Sistema")
				lista.Mostrar()
				lista.ArchivoJSON()
				lista.Graficar_Lista()
			case 1:
				cola.Graficar()
				fmt.Println("Estudiantes Pendientes:")
				cola.Mostrar()
				fmt.Println("********* EDD GoDrive ******************")
				fmt.Println("		1. Aceptar Estudiante					")
				fmt.Println("		2. Rechazar	Estudiante					")
				fmt.Println("		3. Volver al menu						")
				fmt.Println("***********************************")
				fmt.Println("Ingrese una opcion:")

				fmt.Print("Seleccione una opción: ")
				var seleccionTerciaria int
				fmt.Scanln(&seleccionTerciaria)

				switch seleccionTerciaria {
				case 1:
					informacion := cola.Aceptar()
					linea := strings.Split(informacion, " ")
					carne, _ := strconv.Atoi(linea[0])
					lista.AgregarEstudiante(carne, linea[1]+" "+linea[2], linea[3])
				case 2:
					cola.Descolar()
				case 3:
					continue
				default:
					fmt.Println("Selección inválida")
				}
			case 3:
				fmt.Println("Registrar un nuevo Estudiante")
				fmt.Println("Ingrese el carnet de nuevo estudiante:")
				var carnet int
				fmt.Scanln(&carnet)
				fmt.Println("Ingrese el nombre de nuevo estudiante:")
				var nombre string
				fmt.Scanln(&nombre)
				fmt.Println("Ingrese el apellido de nuevo estudiante:")
				var apellido string
				fmt.Scanln(&apellido)
				fmt.Println("Ingrese el password de nuevo estudiante:")
				var pass string
				fmt.Scanln(&pass)
				cola.Encolar(nombre, apellido, carnet, pass)
			case 4:
				fmt.Println("Carga Masiva de Estudiantes")
				var ruta string
				fmt.Println("Ingrese la ruta del archivo: ")
				fmt.Scanln(&ruta)
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
					lista.AgregarEstudiante(carne, linea[1], linea[2])
				}
			case 5:
				continue
			default:
				fmt.Println("Selección inválida")
			}
		case 3:
			enMenuPrincipal = false
		default:
			fmt.Println("Selección inválida")
		}
	}
}
