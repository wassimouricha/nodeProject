import express , { NextFunction, Request, Response } from "express";
// entre crochet ça veut dire qu'on recupere un objet spécifique d'une bibliothèque
// sans crochet celà signifie que nous importons le fichier en entiers
import { filmsMarvel } from "../models/films";

const router = express.Router()

router.get("/", (request: Request,response: Response, next: NextFunction) =>{
    console.log("Hey bah alors celui-ci");
    response.send("Bienvenue sur mon site");
    next();
},
(req: Request, res: Response) => {
    console.log('Mon middleware dans une route');
    
}
);

// route pour tout les films
router.get("/films", (req:Request, res: Response)=>{
    res.status(200).json(filmsMarvel);
res.status(200).send("Bienvenue sur mon site");
});



   // middleware
   const monMiddleware = (req: Request, res: Response , next: NextFunction) =>{
    const date = Date.now();
    const newDate = new Date(date);
    // jj/MM/aaaa HH:mm:ss
    console.log("je suis un middleware pour la date : " + newDate.toLocaleString());
    
    next();
};

router.use(monMiddleware);


// requete pour avoir un film en particuliers
router.get("/films/:id", (req:Request, res: Response, next: NextFunction)=>{
    const id = parseInt(req.params.id);
    const film = filmsMarvel.find((film) => film.id === id);
    if(film?.id == null){
        res.status(404).send("Aucun films ne correspond a cet Id");
    }else if(film){
        res.send(`Id du film : ${film.id}, le titre du film est : ${film.titre} , d'une durée de : ${film.duree} minutes et réalisé par : ${film.realisateur} ` );
        //  res.send(film);
        next();
    };

},
(req: Request, res: Response) => {
const id = parseInt(req.params.id) ;
    if(id === 1 ){
        console.log("Bonjour 1" );
    }else if (id == 1 ){

    res.status(404).send("Aucun middleware ne correspond a cet Id");
    console.log("Erreur 404");
    }
});


// ou en format json
// route pour appeller un film par rapport a son id
// app.get("/films/:id", (req:Request, res: Response) => {
//  const film = filmsMarvel.find((film)=> {
//      film.id ===  parseInt(req.params.id);
//  });
// //  gerer un cas ou l'id n'existe
// if(!film){
//     res.status(404).send(`Aucun films ne correspond a cet Id : ${req.params.id}`);
// }else{
//     res.status(200).json(film);
// }
// } );


// app.get("/:id/:nom", (req:Request, res: Response)=>{
// res.send(`Je suis l'id :  ${req.params.id} et mon nom est ${req.params.nom}`);
// });


// requete pour poster un film
router.post("/films", (req:Request, res: Response) => {
    const film = {
        id: filmsMarvel.length +1,
        titre: req.body.titre,
        realisateur: req.body.realisateur,
        annee: req.body.annee,
        couleur: req.body.couleur,
        duree: req.body.duree
    }
    filmsMarvel.push(film);
    console.log(req.body);
    res.send(film);
});


// requete pour modifier un film existant
router.put("/films/:id" , (req:Request, res: Response) => {
    const id = parseInt(req.params.id);
    const film = filmsMarvel.find((film) => film.id == parseInt(req.params.id));
    if (!film){
        res.status(404).send("le film n'a pas été trouvé")
    }else{
        film.titre = req.body.titre;
        film.annee = req.body.annee;
        film.realisateur= req.body.realisateur;
        film.couleur = req.body.couleur;
        film.duree = req.body.duree;
        // ou
        // filmsMarvel[id -1] = req.body;
        // res.send(filmsMarvel[id - 1])
    }
    res.send(film);
});



// supprimer un film
router.delete("/films/:id", (req:Request, res: Response) => {
    const id = parseInt(req.params.id);
    const film = filmsMarvel.find((film) => film.id == id);
    if(!film){
        res.status(404).send(`le film d'id ${id} n'a pas été trouvé`)
    }else {
        const index = filmsMarvel.indexOf(film);
        filmsMarvel.splice(index , 1);
        res.send(`Film ${id} supprimé`)
    }

});







export default router;