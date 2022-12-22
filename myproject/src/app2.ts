import express, {Response, Request, NextFunction }  from "express";
import routeUtilisateur from "./routes/routeUtilisateur";
// ne pas oublier dans le package.json d'indiquer quel fichier on doit lancer avec npm start
const app = express();
app.use(express.json());
const port = 8080;

// pour faire appel a notre route 
app.use(routeUtilisateur);


app.listen(port, () => {
    console.log(`Mon serveur est lancé sur le port : ${port}`);
    
});

