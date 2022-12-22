import express, { NextFunction, Request, Response  } from "express";


const router = express.Router()

   // middleware
   const maDate = (req: Request, res: Response , next: NextFunction) =>{
    const date = Date.now();
    const newDate = new Date(date);
    // jj/MM/aaaa HH:mm:ss
    console.log("je suis un middleware pour la date : " + newDate.toLocaleString());
    
    next();
};

router.use(maDate);

export default router;