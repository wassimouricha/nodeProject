import express , { NextFunction, Request, Response } from "express";
import  CSuperHero  from "../model/data";
import superHeroooos from "../model/data.json";


const router = express.Router();
const superHerosup = superHeroooos.superHeroooos;

router.get("/", (request: Request,response: Response,) =>{
    console.log("Hey bah alors celui-ci");
    response.send("Bienvenue sur mon site");
});

// route pour tout les superheros
router.get("/heros", (req:Request, res: Response)=>{
    res.status(200).json(superHerosup);
res.status(200).send("Beaucoup de super héros ici");
});

// requete pour avoir un superhéros en particulier

router.get("/heros/:id" , (req:Request, res: Response) => {
    const id = parseInt(req.params.id);
    const hero = superHerosup.find((hero) => hero.id === id);
    if(hero?.id == null){
        res.status(404).send("Aucun superHeros ne correspond a cet Id");
    }else if (hero){
        res.send(hero);
    }
});

// requete pour poster un hero
router.post("/heros", (req:Request, res: Response) => {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const result: boolean = expression.test(req.body.email); // true
    const regexName = new RegExp(/^[a-zA-Z0-9 ]*$/) ;
    const resultName: boolean = regexName.test(req.body.nom);
    const regexPower: RegExp = /^[a-zA-Z- ]*$/;
    const resultPower: boolean = regexPower.test(req.body.pouvoir);

    const hero = {
        id: superHerosup.length +1,
        nom: req.body.nom,
        pouvoir: req.body.pouvoir,
        age: req.body.age,
        email: req.body.email,
    }
    if(result && resultName && resultPower){
        superHerosup.push(hero);
        console.log(req.body);
    }else{
        res.status(404).send("Les informations envoyé sont incorrect");
    }
  
    console.log('l\'e-mail est ' + (result ? 'correct' : 'incorrect'));
    console.log('Le nom est ' + (resultName ? 'correct' : 'incorrect'));
    console.log('Le pouvoir est ' + (resultPower ? 'correct' : 'incorrect'));
    res.send(hero);
});

// requete pour modifier un superheros  existant
router.put("/heros/:id" , (req:Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const hero = superHerosup.find((hero) => hero.id === id);
    if(!hero){
        next();
    }else{
        next();
    }
    res.send(hero);
},
(req: Request, res: Response) => {
    const id = parseInt(req.params.id) ;
    const hero = superHerosup.find((hero) => hero.id == id);
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
    const hero = superHerosup.find((hero) => hero.id == id);
    if(!hero){
        next();
    }else {
        next();
    }
},
(req: Request, res: Response) => {
    const id = parseInt(req.params.id) ;
    const nomhero = req.params.nom;
    const hero = superHerosup.find((hero) => hero.id == id);
        if(!hero){
            res.status(404).send(`Middleware : le super hero avec l'id ${id} n'a pas été trouvé`)
        }else{
            const index = superHerosup.indexOf(hero);
            superHerosup.splice(index , 1);
            res.send(`le super hero au nom de ${hero.nom} avec l'id numéro  ${id} à été supprimé`)
        console.log("Middleware: le super hero existe et à été supprimé");
        }
    });



export default router;