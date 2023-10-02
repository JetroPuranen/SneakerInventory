import { Tuote } from "../data";
import path from "path"
import { v4 as uuid } from "uuid";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite"
export default class InventaarioTietokanta {

    private tietokanta?: Database;


    constructor() {
        this.yhdistaTietokantaan();
    }
   //Haetaan tuotteet tietokannasta
    public haeTuotteet = async () => {
        const tuotteet = await this.tietokanta?.all("SELECT * FROM Inventaario");
        console.log(tuotteet);
        return tuotteet;
    }
    public async luoTuote(Tuotetunnus: string, Merkki: string, Malli: string, Koko: string, Vari: string, lkm: number) {

        const id = uuid();
        await this.tietokanta?.exec(`
        INSERT INTO Inventaario (
            id, Tuotetunnus, Merkki, Malli, Koko, Vari, lkm
        ) VALUES (
            '${id}', '${Tuotetunnus}', '${Merkki}', '${Malli}', '${Koko}', '${Vari}', '${lkm}'
        )
        `)
        const luoTuote = await this.etsiTuote(id)

        return luoTuote;
    }
    public etsiTuote = async (id: string) => {
        const loydettyTuote = await this.tietokanta?.get(`SELECT * FROM Inventaario WHERE id = '${id}'`)
        if (!loydettyTuote) {
            throw {
                statusKoodi: 400,
                virheViesti: `Tehtävää id:llä ${id} ei löytynyt`
            }
        }

        return loydettyTuote;
    }
    
    //Poista tuote
    public async poistaTuote(id: string) {
        await this.etsiTuote(id);
        await this.tietokanta?.exec(`
        DELETE FROM Inventaario WHERE id = '${id}'
        `)


    }


    
     // Muokkaa tuotetta
     
    public async muokkaaTuotetta(id: string, tuote: Tuote) {

        await this.tietokanta?.exec(`
        UPDATE Inventaario
        SET Tuotetunnus = '${tuote.Tuotetunnus}', Merkki = '${tuote.Merkki}', Malli = '${tuote.Malli}', Koko = '${tuote.Koko}', Vari = '${tuote.Vari}', lkm = '${tuote.lkm}'
        WHERE id = '${id}'
        `)

        const muokattuTuote = this.etsiTuote(id);
        return muokattuTuote;

    }

   
    //Yhteyden avaaminen tietokantaan
    private yhdistaTietokantaan = async () => {
        this.tietokanta = await open({
            filename: path.resolve(__dirname, "inventaario.db"),
            driver: sqlite3.Database
        })

        await this.tietokanta.run(`
        CREATE TABLE IF NOT EXISTS Inventaario (
            id TEXT PRIMARY KEY NOT NULL,
            Tuotetunnus TEXT NOT NULL,
            Merkki TEXT NOT NULL,
            Malli TEXT NOT NULL,
            Koko TEXT NOT NULL,
            Vari TEXT NOT NULL,
            lkm INTEGER NOT NULL
        )
        `)
        this.haeTuotteet();

    }
}