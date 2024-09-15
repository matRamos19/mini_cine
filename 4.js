class Cliente {
    constructor(nombre, apellido, puntos, dinero) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.puntos = puntos;
        this.dinero = dinero;
        this.historial_peliculas = [];
    }

    agregarPeliculaVista(pelicula) {
        this.historial_peliculas.push(pelicula);
    }

    mostrarDatos() {
        console.log("Nombre: " + this.nombre + " " + this.apellido);
        console.log("Puntos: " + this.puntos);
        console.log("Dinero disponible: " + this.dinero);
        console.log("Historial de películas vistas: " + this.historial_peliculas.join(", "));
    }
}

class Cine {
    constructor() {
        this.combos = {
            combo1: {
                nombre: "mega",
                precio: 10,
                costopuntos: 30,
                puntos_regalo: 3
            },
            combo2: {
                nombre: "ultra",
                precio: 20,
                costopuntos: 40,
                puntos_regalo: 4
            },
            combo3: {
                nombre: "mega_ultra",
                precio: 30,
                costopuntos: 50,
                puntos_regalo: 5
            }
        };

        this.salas = {
            sala_1: {
                pelicula: "Nemo",
                asientosNormales: { total: 70, precio: 20 },
                asientosPreferenciales: { total: 10, precio: 35 },
                asientosDiscapacidad: { total: 10, precio: 25 },
                asientosVIP: { total: 10, precio: 40 },
                asientos_vendidos: 0
            },
            sala_2: {
                pelicula: "Toy Story",
                asientosNormales: { total: 70, precio: 20 },
                asientosPreferenciales: { total: 15, precio: 30 },
                asientosDiscapacidad: { total: 8, precio: 20 },
                asientosVIP: { total: 10, precio: 35 },
                asientos_vendidos: 0
            },
            sala_3: {
                pelicula: "Dory",
                asientosNormales: { total: 70, precio: 25 },
                asientosPreferenciales: { total: 10, precio: 40 },
                asientosDiscapacidad: { total: 10, precio: 25 },
                asientosVIP: { total: 15, precio: 45 },
                asientos_vendidos: 0
            }
        };
    }

    agregarPelicula(nombreSala, pelicula, asientosNormales, asientosPreferenciales, asientosDiscapacidad, asientosVIP) {
        this.salas[nombreSala] = {
            pelicula: pelicula,
            asientosNormales: { total: asientosNormales, precio: 20 },
            asientosPreferenciales: { total: asientosPreferenciales, precio: 35 },
            asientosDiscapacidad: { total: asientosDiscapacidad, precio: 25 },
            asientosVIP: { total: asientosVIP, precio: 40 },
            asientos_vendidos: 0
        };
    }

    mostrarPeliculas() {
        console.log("-------------------Películas-----------------");
        for (let ver in this.salas) {
            let sala = this.salas[ver];
            console.log("Sala: " + ver + ", Película: " + sala.pelicula);
        }
    }

    mostrarCombo() {
        console.log("--------------------Combos--------------------");
        for (let ver in this.combos) {
            let combo = this.combos[ver];
            console.log("Combo: " + ver + ", Nombre: " + combo.nombre + ", Precio: " + combo.precio + ", Puntos por compra: " + combo.puntos_regalo + ", Costo de puntos: " + combo.costopuntos);
        }
    }

    mostrarEstadoSalas() {
        console.log("Estado de las salas:");
        for (let ver in this.salas) {
            let sala = this.salas[ver];
            console.log("Sala: " + ver + ", Película: " + sala.pelicula + ", Asientos vendidos: " + sala.asientos_vendidos);
        }
    }
}

class Cajero {
    disponibilidad(salaPelicula, comboNombres, cine, asientos) {
        let sala = cine.salas[salaPelicula];
        if (!sala) {
            return "Sala no encontrada";
        }
        for (let comboNombre of comboNombres) {
            let combo = cine.combos[comboNombre];
            if (!combo) {
                return "Combo " + comboNombre + " no encontrado";
            }
        }

        let asientosDisponibles = sala.asientosNormales.total + sala.asientosPreferenciales.total + sala.asientosDiscapacidad.total + sala.asientosVIP.total;
        let asientosSolicitados = asientos.normales + asientos.preferenciales + asientos.discapacidad + asientos.vip;
        if (asientosSolicitados > asientosDisponibles) {
            return "No quedan suficientes asientos disponibles";
        }
        if (asientos.normales > sala.asientosNormales.total) {
            return "No hay suficientes asientos normales disponibles";
        }
        if (asientos.preferenciales > sala.asientosPreferenciales.total) {
            return "No hay suficientes asientos preferenciales disponibles";
        }
        if (asientos.discapacidad > sala.asientosDiscapacidad.total) {
            return "No hay suficientes asientos de discapacidad disponibles";
        }
        if (asientos.vip > sala.asientosVIP.total) {
            return "No hay suficientes asientos VIP disponibles";
        }

        return null;
    }

    calcularCostoTotal(comboNombres, salaPelicula, cine, asientos) {
        let sala = cine.salas[salaPelicula];
        let costoComboTotal = 0;
        for (let comboNombre of comboNombres) {
            let combo = cine.combos[comboNombre];
            costoComboTotal += combo.precio;
        }
        
        
        let costoAsientos = 0;
        if (asientos.normales > 0) {
            costoAsientos += sala.asientosNormales.precio * asientos.normales;
        }
        if (asientos.preferenciales > 0) {
            costoAsientos += sala.asientosPreferenciales.precio * asientos.preferenciales;
        }
        if (asientos.discapacidad > 0) {
            costoAsientos += sala.asientosDiscapacidad.precio * asientos.discapacidad;
        }
        if (asientos.vip > 0) {
            costoAsientos += sala.asientosVIP.precio * asientos.vip;
        }

        return {
            costoComboTotal: costoComboTotal,
            costoAsientos: costoAsientos,
            costoTotal: costoComboTotal + costoAsientos
        };
    }

    mostrarEstadoCompra(cliente, comboNombres, salaPelicula, cine, asientos) {
        let { costoComboTotal, costoAsientos, costoTotal } = this.calcularCostoTotal(comboNombres, salaPelicula, cine, asientos);

        
        let primerComboPrecio = 0;
        if (comboNombres.length > 0) {
            let primerCombo = cine.combos[comboNombres[0]];
            primerComboPrecio = primerCombo.precio;
        }

        let totalConDescuento = costoTotal - primerComboPrecio;

        console.log("-----------------------------------------------------");
        console.log("Estado de la Compra:");
        console.log("Costo total de los combos: " + costoComboTotal);
        console.log("Costo de los asientos: " + costoAsientos);
        console.log("Puntos del cliente: " + cliente.puntos);
        console.log("Dinero del cliente disponible: " + cliente.dinero);
        console.log("Total con descuento por primer combo: $" + totalConDescuento);
        console.log("---------------------------------------------------------");

        let puntosRequeridos = 0;
        for (let comboNombre of comboNombres) {
            let combo = cine.combos[comboNombre];
            puntosRequeridos += combo.costopuntos;
        }

        if (cliente.puntos >= puntosRequeridos) {
            console.log("Los combos pueden ser pagados completamente con puntos.");
        } else if (cliente.dinero >= totalConDescuento) {
            console.log("Algunos combos serán pagados con puntos y el resto con dinero.");
        } else {
            console.log("No tiene suficientes puntos ni dinero para la compra.");
        }
    }
}

// Ejemplo de uso

// Crear instancia de Cine
let cine = new Cine();

// Crear instancia de Cliente
let cliente = new Cliente("Juan", "Pérez", 50, 100);

// Crear instancia de Cajero
let cajero = new Cajero();

// Agregar una película
cine.agregarPelicula("sala_4", "Moana", 60, 12, 8, 10);

// Mostrar películas
cine.mostrarPeliculas();

// Mostrar combos
cine.mostrarCombo();

// Mostrar estado de las salas
cine.mostrarEstadoSalas();

// Verificar disponibilidad y calcular costos
let asientos = { normales: 2, preferenciales: 1, discapacidad: 1, vip: 0 };
let comboNombres = ["combo1", "combo2"];
let disponibilidad = cajero.disponibilidad("sala_1", comboNombres, cine, asientos);

if (disponibilidad === null) {
    cajero.mostrarEstadoCompra(cliente, comboNombres, "sala_1", cine, asientos);
} else {
    console.log(disponibilidad);
}
