import express, {Response, Request, NextFunction }  from "express";
// ne pas oublier dans le package.json d'indiquer quel fichier on doit lancer avec npm start
const app = express();
app.use(express.json());
const port = 8080;

   const utilisateurs = [
    {
        id: 1,
        nom: "Pauleta",
        prenom: "Pedro Miguel",
        age: 45,
        email: "pauleta@gmail.com",
        mdp: "muchacho",
        },
    {
        id: 2,
        nom: "Gignac",
        prenom: "Andre-pierre",
        age: 45,
        email: "gitan@gmail.com",
        mdp: "valbuena",
        },
    {
        id: 3,
        nom: "Henry",
        prenom: "Thierry",
        age: 45,
        email: "arsenalgoat@gmail.com",
        mdp: "wenger",
        },
   ];
   
   // middleware
const monMiddleware = (req: Request, res: Response , next: NextFunction) =>{
    const date = Date.now();
    const newDate = new Date(date);
    // jj/MM/aaaa HH:mm:ss
    console.log("je suis un middleware pour la date : " + newDate.toLocaleString());
    
    next();
};

app.use(monMiddleware);

const verifUser = (req: Request, res: Response , next: NextFunction) => {

    next();
}

app.use(verifUser);

app.get("/", (request: Request,response: Response, next: NextFunction) =>{
    console.log("Hey bah alors celui-ci");
    response.send("Bienvenue sur mon site");
    next();
},
(req: Request, res: Response) => {
    console.log('Mon middleware dans une route');
    
}
);

// route pour tout les utilisateurs
app.get("/users", (req:Request, res: Response) => {
    res.status(200).json(utilisateurs);
    res.status(200).send("Beaucoup de personnages ici");
});


// requete pour avoir un utilisateur en particulier

app.get("/users/:id" , (req:Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = utilisateurs.find((user) => user.id === id);
    if(user?.id == null){
        res.status(404).send("Aucun utilisateurs ne correspond a cet Id");
    }else if (user){
        res.send(user);
    }
});



// requete pour poster un utilisateur
app.post("/users", (req:Request, res: Response) => {
    const user = {
        id: utilisateurs.length +1,
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        email: req.body.email,
        mdp: req.body.mdp
    }
    utilisateurs.push(user);
    console.log(req.body);
    res.send(user);
});

// requete pour modifier un utilisateur existant
app.put("/users/:id" , (req:Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const user = utilisateurs.find((user) => user.id === id);
    if(!user){
        next();
    }else{
        next();
    }
    res.send(user);
},
(req: Request, res: Response) => {
    const id = parseInt(req.params.id) ;
    const user = utilisateurs.find((user) => user.id == id);
        if(!user){
            res.status(404).send("L'utilisateur n'a pas été trouvé")
            console.log("Middleware: l'utilisateur n'existe pas et n'à pas été modifié");
        }else{
            user.nom = req.body.nom;
            user.prenom = req.body.prenom;
            user.age = req.body.age;
            user.email = req.body.email;
            user.mdp = req.body.mdp;
        console.log("Middleware: l'utilisateur existe et à été modifié");
        }
    });



// supprimer un utilisateur
app.delete("/users/:id", (req:Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const user = utilisateurs.find((user) => user.id == id);
    if(!user){
        next();
    }else {
        next();
    }
},
(req: Request, res: Response) => {
    const id = parseInt(req.params.id) ;
    const user = utilisateurs.find((user) => user.id == id);
        if(!user){
            res.status(404).send(`Middleware : l'utilisateur avec l'id ${id} n'a pas été trouvé`)
        }else{
            const index = utilisateurs.indexOf(user);
            utilisateurs.splice(index , 1);
            res.send(`Utilisateur avec l'id numéro  ${id} à été supprimé`)
        console.log("Middleware: l'utilisateur existe et à été supprimé");
        }
    });


app.listen(port, () => {
    console.log(`Mon serveur est lancé sur le port : ${port}`);
    
});

