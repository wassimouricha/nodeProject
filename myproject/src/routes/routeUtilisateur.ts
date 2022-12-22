import express , { NextFunction, Request, Response } from "express";
// entre crochet ça veut dire qu'on recupere un objet spécifique d'une bibliothèque
// sans crochet celà signifie que nous importons le fichier en entiers
import { utilisateurs } from "../models/utilisateurs";

const router = express.Router()

   // middleware
   const monMiddleware = (req: Request, res: Response , next: NextFunction) =>{
    const date = Date.now();
    const newDate = new Date(date);
    // jj/MM/aaaa HH:mm:ss
    console.log("je suis un middleware pour la date : " + newDate.toLocaleString());
    
    next();
};

router.use(monMiddleware);

// const verifUser = (req: Request, res: Response , next: NextFunction) => {
//     const id = parseInt(req.params.id);
//     const user = utilisateurs.find((user) => user.id === id);
//     if(user){
//         req.body = user;
//     }else{
//         res.status(404).json({message: "Utilisateur introuvable"});
//     }
//     next();
// }

// router.use(verifUser);

router.get("/", (request: Request,response: Response, next: NextFunction) =>{
    console.log("Hey bah alors celui-ci");
    response.send("Bienvenue sur mon site");
    next();
},
(req: Request, res: Response) => {
    console.log('Mon middleware dans une route');
    
}
);

// route pour tout les utilisateurs
router.get("/users", (req:Request, res: Response) => {
    res.status(200).json(utilisateurs);
    res.status(200).send("Beaucoup de personnages ici");
});


// requete pour avoir un utilisateur en particulier

router.get("/users/:id" , (req:Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = utilisateurs.find((user) => user.id === id);
    if(user?.id == null){
        res.status(404).send("Aucun utilisateurs ne correspond a cet Id");
    }else if (user){
        res.send(user);
    }
});



// requete pour poster un utilisateur
router.post("/users", (req:Request, res: Response) => {
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
router.put("/users/:id" , (req:Request, res: Response, next: NextFunction) => {
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
            res.status(404).send("Middleware: L'utilisateur n'a pas été trouvé")
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
router.delete("/users/:id", (req:Request, res: Response, next: NextFunction) => {
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


    
export default router;