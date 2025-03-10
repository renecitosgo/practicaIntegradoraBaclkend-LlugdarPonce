// console.log(process.cwd())
// console.log(process.pid)
// console.log(process.memoryUsage())
// console.log(process.argv)
// console.log(process.version)

// console.log(process.argv.slice(2))


// const numeros = [1, 2, 3, 4, 5]

// const subArray = numeros.slice(2)
// console.log(subArray)
// const { Command } = require("commander");

// const program = new Command();

// program
//     .option("-d", "variable para debugg", false)
//     .option("-p <port>", "puerto del servidor", 8080)
//     .option("--mode <mode>", "modo de trabajo de mi server", "production")
//     .option("-u <user>", "usuario utilizando el aplicativo", "no se ha declarado el usuario")
//     .option("-l, --letters [letters...]", "specify letter");

// program.parse();

// console.log("options: ", program.opts());
// console.log("argumentos desconocidos: ", program.args);

    
// node process.js -d -p3000 --mode development -u root --letters a b s     

// node process.js -p3000 -u root 2 a 5 --letters a b s     


// process.env.ALGO_MAS


process.on("exit", code => {
    console.log("Antes de salir del proceso:", code);
});

process.on("uncaughtException", exception => {
    console.error("Este atrapa todos los errores no controlados:", exception);
    process.exit(1); // Terminamos el proceso con código de error
});

console.log("Ejecutando código");

// Provocamos un error no controlado
inexistenteFuncion();



