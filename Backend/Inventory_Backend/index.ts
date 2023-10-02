import express, { Express } from "express"
import { haeSovelluksenPortti } from "./config";
import path from "path";
import { reititin as tehtavalistaReitit } from "./reitit/inventaario-reitit";

//alustus
const palvelin: Express = express();



palvelin.use("/", express.static(path.join(__dirname,"static")));


palvelin.use(express.json());




//Polun alustus
palvelin.use("/Inventaario", tehtavalistaReitit);

//Koodi jolla määritellään, mitä porttia palvelin kuuntelee.
palvelin.listen(haeSovelluksenPortti(), () => {
    console.log(`Palvelin kuuntelee porttia: ${haeSovelluksenPortti()}`)
});