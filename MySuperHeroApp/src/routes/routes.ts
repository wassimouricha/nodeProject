import express , { NextFunction, Request, Response } from "express";
import { superHeros } from "../model/data";

const router = express.Router();

router.get("/", (request: Request,response: Response,) =>{
    console.log("Hey bah alors celui-ci");
    response.send("Bienvenue sur mon site");
});

// route pour tout les superheros
router.get("/heros", (req:Request, res: Response)=>{
    res.status(200).json(superHeros);
res.status(200).send("Beaucoup de super héros ici");
});

// requete pour avoir un superhéros en particulier

router.get("/heros/:id" , (req:Request, res: Response) => {
    const id = parseInt(req.params.id);
    const hero = superHeros.find((hero) => hero.id === id);
    if(hero?.id == null){
        res.status(404).send("Aucun superHeros ne correspond a cet Id");
    }else if (hero){
        res.send(hero);
    }
});

// requete pour poster un hero
router.post("/heros", (req:Request, res: Response) => {
    const hero = {
        id: superHeros.length +1,
        nom: req.body.nom,
        pouvoir: req.body.pouvoir,
        age: req.body.age,
        email: req.body.email,
    }
    superHeros.push(hero);
    console.log(req.body);
    res.send(hero);
});

// requete pour modifier un superheros  existant
router.put("/heros/:id" , (req:Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const hero = superHeros.find((hero) => hero.id === id);
    if(!hero){
        next();
    }else{
        next();
    }
    res.send(hero);
},
(req: Request, res: Response) => {
    const id = parseInt(req.params.id) ;
    const hero = superHeros.find((hero) => hero.id == id);
        if(!hero){
            res.status(404).send("Middleware: Le super hero n'a pas été trouvé")
            console.log("Middleware: le super hero n'existe pas et n'à pas été modifié");
        }else{
            hero.nom = req.body.nom;
            hero.pouvoir = req.body.pouvoir;
            hero.age = req.body.age;
            hero.email = req.body.email;
        console.log("Middleware: le superHero existe et à été modifié");
        }
    });


// supprimer un superhero
router.delete("/heros/:id", (req:Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const hero = superHeros.find((hero) => hero.id == id);
    if(!hero){
        next();
    }else {
        next();
    }
},
(req: Request, res: Response) => {
    const id = parseInt(req.params.id) ;
    const nomhero = req.params.nom;
    const hero = superHeros.find((hero) => hero.id == id);
        if(!hero){
            res.status(404).send(`Middleware : le super hero avec l'id ${id} n'a pas été trouvé`)
        }else{
            const index = superHeros.indexOf(hero);
            superHeros.splice(index , 1);
            res.send(`le super hero au nom de ${hero.nom} avec l'id numéro  ${id} à été supprimé`)
        console.log("Middleware: le super hero existe et à été supprimé");
        }
    });



export default router;