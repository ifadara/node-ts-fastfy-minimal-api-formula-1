import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({
    logger: true
});

server.register(cors, {
    origin: "*"
})

const teams = [
    { id: 1, name: "McLaren", base: "Woking, United Kingdom"},
    { id: 2, name: "Mercedes", base: "Brackley, United Kingdom"},
    { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom"},
    { id: 4, name: "Ferrari", base: "Maranello, Italy"},
    { id: 5, name: "Alpine", base: "Enstone, United Kingdom"},
    { id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom"},
    { id: 7, name: "AlphaTauri", base: "Faenza, Italy"},
    { id: 8, name: "Alfa Romeo", base: "Hinwil, Switzerland"},
    { id: 9, name: "Haas", base: "Kannapolis, United States"},
    { id: 10, name: "Williams", base: "Grove, United Kingdom"}
];


const drivers = [
    {id: 1, name: "Lewis Hamilton", team: "Mercedes"},
    {id: 2, name: "Max Verstappen", team: "Red Bull Racing"},
    {id: 3, name: "Lando Norris", team: "McLaren"},
    {id: 4, name: "Charles Leclerc", team: "Ferrari"},
    {id: 5, name: "Carlos Sainz", team: "Ferrari"},
    {id: 6, name: "Sergio Perez", team: "Red Bull Racing"},
    {id: 7, name: "George Russell", team: "Mercedes"},
    {id: 8, name: "Fernando Alonso", team: "Aston Martin"},
    {id: 9, name: "Esteban Ocon", team: "Alpine"},
    {id: 10, name: "Pierre Gasly", team: "Alpine"},
    {id: 11, name: "Valtteri Bottas", team: "Alfa Romeo"},
    {id: 12, name: "Zhou Guanyu", team: "Alfa Romeo"},
    {id: 13, name: "Kevin Magnussen", team: "Haas"},
    {id: 14, name: "Nico Hülkenberg", team: "Haas"},
    {id: 15, name: "Yuki Tsunoda", team: "AlphaTauri"},
    {id: 16, name: "Nyck de Vries", team: "AlphaTauri"},
    {id: 17, name: "Alexander Albon", team: "Williams"},
    {id: 18, name: "Logan Sargeant", team: "Williams"},
    {id: 19, name: "Lance Stroll", team: "Aston Martin"},
    {id: 20, name: "Oscar Piastri", team: "McLaren"},
];



server.get("/teams", async (request, response) => {
    response.type("application/json").code(200);
    return { teams };
});

server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200);
    return { drivers };
});

interface DriverParams{
    id: string
}

server.get<{Params: DriverParams}>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id)

    const driver = drivers.find(d => d.id === id);

    if(!driver){
        response.type("application/json").code(404);
        return { message: "Driver Not Found" };
    }
    else{
        response.type("application/json").code(200);
        return { driver };
    }
    
});

server.listen({port: 8080}, () => {
    console.log("server init");
})