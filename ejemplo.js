function persona( nombre , apellido , edad){
 this.nombre = nombre;
 this.apellido = apellido;
 this.edad = edad;

 this.misdatos = function(){
    console.log("mi nombre es:"+this.nombre+ " mi apellido:"+ this.apellido+ "y mi es:"+this.edad); 
    ;


 };
 
}


let nuevo= new persona(
    "jorge",
    "ramos",
    18
);

let nuevo1 = new persona(
    "jose",
    "ramires",
    19
)
nuevo1.direccion = "huachipa";


console.log(nuevo.misdatos());
console.log(nuevo1.misdatos());
console.log(nuevo1);