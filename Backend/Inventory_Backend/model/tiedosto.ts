import {  Tuote } from "../data";
import path from "path"
import { readFile, writeFile } from "fs/promises";
import { v4 as uuid } from "uuid";

export default class InventaarioTiedostoModel {
    

    //Alustetaan tuotteet
    private tuotteet: Tuote[] = [];

    private tiedostoPolku: string = path.join(path.resolve(__dirname, ".."), "Inventaario.json");

    constructor() {
        this.lataaTiedosto();
    }

    //Hakee tuotteet
    public haeInventaario() {
        return this.tuotteet;
    }

    //Uuden tuotteeen lisäys
    public async luoTuote(Tuotetunnus: string, Merkki: string, Malli: string, Koko: string, Vari: string, lkm: number) {
      

        const uusiTuote: Tuote = {
            id: uuid(),
            Tuotetunnus: Tuotetunnus,
            Merkki: Merkki,
            Malli: Malli,
            Koko: Koko,
            Vari: Vari,
            lkm: 1
            
        }

        this.tuotteet.push(uusiTuote);
        this.tallennaTiedosto();

        return uusiTuote;
    }

    //tuotteen poisto
    public async poistaTuote(id: string) {
        this.tuotteet = this.tuotteet.filter(tehtava => tehtava.id !== id)

        await this.tallennaTiedosto();
    }

    //Tuotteen muokkaus
    public async muokkaaTuotetta(id: string, tuote: Tuote) {

        const loydettyTuote = this.etsiTuote(id);

        const muokattuTuote: Tuote = {
            ...loydettyTuote,
            ...tuote
        }

        const indeksi = this.tuotteet.indexOf(loydettyTuote);

        this.tuotteet.splice(indeksi, 1, muokattuTuote);

        await this.tallennaTiedosto();

        return muokattuTuote;

    }

    //Tuotteen etsiminen Id:llä
    public etsiTuote(id: string) {
        const loydettyTuote = this.tuotteet.find(tuote => tuote.id === id);

        if(!loydettyTuote) {
            throw {
                statusKoodi: 400,
                virheViesti: `Tehtävää id:llä ${id} ei löytynyt`
            }
        }

        return loydettyTuote;
    }

    
    
    //Tuotteiden tallennuns
    private async tallennaTiedosto() {
        await writeFile(this.tiedostoPolku, JSON.stringify(this.tuotteet, null, 2))
    }

    //tiedoston lataaminen json tiedostoon
    private async lataaTiedosto() {
        const tiedostoBuffer = await readFile(this.tiedostoPolku, { flag: "a+" });

        if(!tiedostoBuffer.toJSON().data.length) {
            this.tuotteet = [];
        } else {
            this.tuotteet = JSON.parse(tiedostoBuffer.toString());
        }
    }
}