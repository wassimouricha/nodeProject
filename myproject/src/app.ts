import express, {Response, Request, NextFunction }  from "express";
import routesFilm from "./routes/routeFilm";
const app = express();
app.use(express.json());
const port = 8080;

// pour faire appel a notre route 
app.use(routesFilm);






app.listen(port, () => {
    console.log(`Mon serveur est lancé sur le port : ${port}`);
    
});

