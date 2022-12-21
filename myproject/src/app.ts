import express  from "express";

const app = express();
const port = 8080;

app.get("/", (req,res) =>{
    console.log("bonjour");
    
});


app.listen(port, () => {
    console.log(`Mon serveur est lancé sur le port : ${port}`);
    
});

