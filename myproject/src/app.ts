import express, {Response, Request }  from "express";

const app = express();
const port = 8080;
const cocktails = [
    {
        id: 1,
        nom: "Margarita",
    },
    {
        id: 2,
        nom: "Mojito",
    },
    {
        id: 3,
        nom: "Cuba libre",
    }
]

const filmsMarvel = [
    {
    id: 1,
    titre: "Iron Man",
    realisateur: "Jon Favreau",
    annee: "2008",
    couleur: true,
    duree: 120,
    },
    {
    id: 2,
    titre: "Thor",
    realisateur: "Kenneth Branagh",
    annee: "2011",
    couleur: true,
    duree: 115,
    },
    {
    id: 3,
    titre: "Avenger",
    realisateur: "Joss Whedon",
    annee: "2012",
    couleur: true,
    duree: 143,
    },
   ];
   

app.get("/", (request: Request,response: Response) =>{
    console.log("Hey bah alors celui-ci");
    response.send("Bienvenue sur mon site");
    
});

// app.get("/", (req:Request, res: Response) => {
//     res.send("Bienvenue sur mon site");
// });

app.get("/films", (req:Request, res: Response)=>{
res.send(filmsMarvel);
res.status(200).send("Bienvenue sur mon site");
});



app.get("/films/:id", (req:Request, res: Response)=>{
    const id = parseInt(req.params.id);
    const film = filmsMarvel.find((film) => film.id === id);
    if(film?.id == null){
        res.status(404).send("Aucun films ne correspond a cet Id");
    }else if(film){
         res.send(`Id du film : ${film.id}, le titre du film est : ${film.titre}  d'une durée de : ${film.duree} minutes et réalisé par : ${film.realisateur} ` );
        //  res.send(film);
         
    }

});



// app.get("/:id/:nom", (req:Request, res: Response)=>{
// res.send(`Je suis l'id :  ${req.params.id} et mon nom est ${req.params.nom}`);
// });

app.listen(port, () => {
    console.log(`Mon serveur est lancé sur le port : ${port}`);
    
});

