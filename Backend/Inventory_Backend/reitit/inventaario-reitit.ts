import express, { Router, Request, Response } from "express";
import InventaarioTiedostoModel from "../model/tiedosto";
import InventaarioTietokanta from "../model/tietokanta";



export const reititin: Router = express.Router();


const InventaarioModel = new InventaarioTiedostoModel();

const InventaarioTietokantaModel = new InventaarioTietokanta();
//Polku jolla haetaan tuotteet
reititin.get("/",  async (request: Request, response: Response) => {
    try {
        const tuotteet = await InventaarioTietokantaModel.haeTuotteet();

        return response.status(200).json(tuotteet);
    } catch (error: any) {
        return response.json(error);
    }
});

//Polku jolla lisätään tuotteita
reititin.post("/", async (request: Request, response: Response) => {
    try {
        const { Tuotetunnus, Merkki, Malli, Koko, Vari, lkm } = request.body;

        if(!Tuotetunnus || !Merkki || !Malli || !Koko || !Vari) {
            throw {
                statusKoodi: 400,
                virheViesti: "Puuttuu jokin tieto"
            }
        }

        const luotuTuote = await InventaarioTietokantaModel.luoTuote(Tuotetunnus, Merkki, Malli, Koko, Vari, lkm);

        return response.status(201).json(luotuTuote);

    } catch (error: any) {
        return response.json(error);
    }
});

//Polku jolla poistetaan tuotteita
reititin.delete("/:id", async (request: Request, response: Response) => {
    try {

        const { id } = request.params;

        await InventaarioTietokantaModel.poistaTuote(id);

        return response.status(204).json();

    } catch (error: any) {
        return response.json(error);
    }
});

//Polku jolla muokataan tuotteita
reititin.put("/:id", async (request: Request, response: Response) => {
    try {

        const { id } = request.params;
        const { Tuotetunnus, Merkki, Malli, Koko, Vari, lkm } = request.body;

        if(!Tuotetunnus || !Merkki || !Malli || !Koko || !Vari || lkm === undefined) {
            throw {
                statusKoodi: 400,
                virheViesti: "Virheellinen sisältö"
            }
        }
        
        const muokattuTuote = await InventaarioTietokantaModel.muokkaaTuotetta(id, request.body);

        return response.status(200).json(muokattuTuote);

    } catch (error: any) {
        return response.json(error);
    }
});

//Yhden tehtävän palautus

reititin.get("/:id", async (request: Request, response: Response) => {
    try{
        const {id} = request.params;
        const tuote = await InventaarioTietokantaModel.etsiTuote(id);

        return response.status(200).json(tuote);

    }catch (error: any){
        return response.json(error);
    }
})

