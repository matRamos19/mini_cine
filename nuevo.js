// sistema de cine
// sala(butacas,pelicula,hacientos preferenciales,discapitados,vip)
// combos_caj(cmbos en cine,precios y valor en puntos,adicion al combos difrentes. )
// cajero (mismo datos , funcion comprar boleto , necita una sala, cliente)
// cliente (mismos datos, historial de peliculas, comboos y puntos acumulados)
class Cliente {
    constructor(nombre, apellido, puntos, dinero) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.puntos = puntos;
        this.dinero = dinero;
        this.historial_peliculas = [];
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
                precio: 20,
                butacas: 100,
                asientosPreferenciales: 10,
                asientosDiscapacidad: 5,
                asientosVIP: 5,

            },
            sala_2: {
                pelicula: "Toy Story",
                precio: 25,
                butacas: 100,
                asientosPreferenciales: 15,
                asientosDiscapacidad: 8,
                asientosVIP: 10,

            },
            sala_3: {
                pelicula: "Dory",
                precio: 30,
                butacas: 100,
                asientosPreferenciales: 10,
                asientosDiscapacidad: 10,
                asientosVIP: 15,

            }
        };
    }

    agregarPelicula(nombreSala, pelicula, precio, butacas, asientosPreferenciales, asientosDiscapacidad, asientosVIP) {
        this.salas[nombreSala] = {
            pelicula,
            precio,
            butacas,
            asientosPreferenciales,
            asientosDiscapacidad,
            asientosVIP,

        };
    }

    mostrarPeliculas() {
        console.log("-------------------Peliculas-----------------");
        for (let ver in this.salas) {
            let sala = this.salas[ver];
            console.log("sala:" + ver + ", pelicula: " + sala.pelicula + ", precio boleto:" + sala.precio);
        }
    }

    mostrarCombo() {
        console.log("--------------------combos--------------------");
        for (let ver in this.combos) {
            let combo = this.combos[ver];
            console.log("combos:" + ver + ", nombre: " + combo.nombre + ", Precio:" + combo.precio + ", puntos por combra:" + combo.puntos_regalo + "  costo de puntos: " + combo.costopuntos);
        }
    }

    mostrarEstadoSalas() {
        console.log("Estado de las salas:");
        for (let ver in this.salas) {
            let sala = this.salas[ver];
            console.log("Sala: " + ver + ", Película: " + sala.pelicula + ", Asientos disponibles: " + (sala.butacas - sala.asientos_vendidos) + ", Asientos vendidos: " + sala.asientos_vendidos);
        }
    }
}

class Cajero {
    disponibilidad(salaPelicula, comboNombre, cine) {
        let sala = cine.salas[salaPelicula];
        if (!sala) {
            return "Sala no encontrada";
        }
        let combo = cine.combos[comboNombre];
        if (!combo) {
            return "Combo no encontrado";
        }
        if (sala.butacas - sala.asientos_vendidos <= 0) {
            return "No quedan más asientos disponibles";
        }
        return null;
    }

    calcularCostoTotal(comboNombre, salaPelicula, cine) {
        let combo = cine.combos[comboNombre];
        let sala = cine.salas[salaPelicula];
        let costoCombo = combo.precio;
        let costoPelicula = sala.precio;
        return {
            costoCombo,
            costoPelicula,
            costoTotal: costoCombo + costoPelicula
        };
    }

    mostrarEstadoCompra(cliente, comboNombre, salaPelicula, cine) {
        let { costoCombo, costoPelicula, costoTotal } = this.calcularCostoTotal(comboNombre, salaPelicula, cine);
        let combo = cine.combos[comboNombre];

        console.log("-----------------------------------------------------");
        console.log("Estado de la Compra:");
        console.log("Costo del combo: " + costoCombo);
        console.log("Costo de la película: " + costoPelicula);
        console.log("Puntos del cliente: " + cliente.puntos);
        console.log("Dinero del cliente disponible: " + cliente.dinero);
        console.log("---------------------------------------------------------");

        if (cliente.puntos >= combo.costopuntos) {
            console.log("El combo puede ser pagado completamente con puntos.");
        } else if (cliente.dinero >= costoTotal) {
            console.log("El combo y la película se pagan completamente con dinero.");
        } else {
            console.log("No tiene suficientes puntos ni dinero para la compra.");
        }
    }

    realizarCompra(cliente, comboNombre, salaPelicula, cine) {
        let { costoCombo, costoPelicula, costoTotal } = this.calcularCostoTotal(comboNombre, salaPelicula, cine);
        let combo = cine.combos[comboNombre];
        let puntosDescuento = Math.min(cliente.puntos, combo.costopuntos);

        let dineroNecesarioCombo;
        if (cliente.puntos >= combo.costopuntos) {
            dineroNecesarioCombo = 0;
            cliente.puntos -= combo.costopuntos;
        } else {
            dineroNecesarioCombo = costoCombo;
        }

        let dineroTotalNecesario = dineroNecesarioCombo + costoPelicula;

        if (cliente.dinero >= dineroTotalNecesario) {
            cliente.dinero -= dineroTotalNecesario;
            return true;
        } else {
            if (cliente.puntos < combo.costopuntos) {
                cliente.puntos += puntosDescuento;
            }
            return false;
        }
    }

    comprarBoleto(cliente, salaPelicula, comboNombre, cine) {
        let Error = this.disponibilidad(salaPelicula, comboNombre, cine);
        if (Error) {
            return Error;
        }

        if (this.realizarCompra(cliente, comboNombre, salaPelicula, cine)) {
            console.log("Boleto comprado por " + cliente.nombre + " " + cliente.apellido + " para " + cine.salas[salaPelicula].pelicula + " en " + salaPelicula + " con el combo " + cine.combos[comboNombre].nombre);
            console.log("puntos restantes del cliente: " + cliente.puntos);
            console.log("dinero actual del cliente: " + cliente.dinero);
        } else {
            return "No tiene suficientes puntos ni dinero para la compra.";
        }
    }
}

let cine = new Cine();
let cliente = new Cliente("hans", "apellido", 50, 111);
let cajero = new Cajero();

cine.agregarPelicula("sala_4", "avengers", 30, 100, 10, 5, 5); 
cine.agregarPelicula("sala_5", "ben", 30, 100, 10, 5, 5); 

cine.mostrarPeliculas();
cine.mostrarCombo();

let compra = cajero.comprarBoleto(cliente, "sala_4", "combo1", cine);
console.log(compra);

cine.mostrarEstadoSalas();