import { Button } from "@mui/material";

import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

interface InventaarioData {
    id: string;
    Tuotetunnus: string;
    Merkki: string;
    Malli: string;
    Koko: string;
    Vari: string;
    lkm: number;
}

type Props = {
    inventaario: InventaarioData[];
    setInventaario: (tuote: InventaarioData[]) => void;
}


const Muokkaus: FC<Props> = ({
    inventaario,
    setInventaario
}) => {
    const navigoi = useNavigate()
    const { id } = useParams();
   
    const [ muokattavaTuote, setMuokattavaTuote ] = useState<InventaarioData>()
    const [ uusiTuoteTunnus, setUusiTuotetunnus ] = useState<string>("")
    const [uusiMerkki, setUusiMerkki] = useState<string>("")
    const [uusiMalli, setUusiMalli] = useState<string>("")
    const [uusiKoko, setUusiKoko] = useState<string>("")
    const [uusiVari, setUusiVari] = useState<string>("")
    const [uusiLkm, setUusiLkm] = useState<number>()


    useEffect(() => {
        haeMuokattavaTuote();
    }, [])

    
    const haeMuokattavaTuote = async () => {
        try {
            const response = await fetch(`/Inventaario/${id}`);
            const data = await response.json();

            setMuokattavaTuote(data);
        } catch (error: any) {
            console.error(error);
        }
    }
    //Otetaan talteen valmiina inventaariossa olevan tuotteeen tiedot
    let tuoteT = muokattavaTuote?.Tuotetunnus;
    let merkki = muokattavaTuote?.Merkki;
    let malli = muokattavaTuote?.Malli;
    let koko = muokattavaTuote?.Koko;
    let vari = muokattavaTuote?.Vari;
    let Lkm = muokattavaTuote?.lkm;
    const kasitteleMuokkaus = async (id: string) => {
        
        //Tähän lisätty osio, jossa määritellään mikä arvo kullakin tiedolla tulisi olla
        //Mikäli ei tehdä muutoksia mihinkään tietoon, arvo pysyy siinä mikä se oli.
        //Aikaisemmin ongelma oli se, että jos halusi muokata tiettyä tietoa, se ei onnistunut, koska piti
        //muokata kaikkia muita tietoja samalla. Tällä saatiin ongelma korjattua ja nyt voidaan
        //muokata vain yhtä tietoa tuotteesta. 
         if(uusiTuoteTunnus.length !== 0){
            tuoteT = uusiTuoteTunnus;
         }
         else{
            tuoteT = muokattavaTuote?.Tuotetunnus;
         }
         //----
         if(uusiMerkki.length !== 0){
            merkki = uusiMerkki;
         }
         else{
            merkki = muokattavaTuote?.Merkki;
         }
         //----
         if(uusiMalli.length !== 0){
            malli = uusiMalli;
         }
         else{
            malli = muokattavaTuote?.Malli;
         }
         //----
         if(uusiKoko.length !== 0){
            koko = uusiKoko;
         }
         else{
            koko = muokattavaTuote?.Koko;
         }
         //----
         if(uusiVari.length !== 0){
            vari = uusiVari;
         }
         else{
            vari = muokattavaTuote?.Vari;
         }
         //----
         if(uusiLkm){
            Lkm = uusiLkm;
         }
         else{
            Lkm = muokattavaTuote?.lkm;
         }
         
         
      
        try {
            await fetch(`/Inventaario/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    //Täällä saadaan tietoon mitkä arvot asetetaan JSON tiedostoon.
                    Tuotetunnus: tuoteT, Merkki: merkki, Malli: malli, Koko: koko, Vari: vari, lkm: Lkm
                    
                })
            });
            navigoi("/");
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <Header>
        <div style={{textAlign: "center",backgroundColor: "black", minHeight: "850px"}}>
            <p style={{textAlign:"center", color:"white", padding:"10px", fontSize: "20px"}}>Muokkaa tuotetta</p>
            <p style={{color: "white", marginRight:"150px"}}>Tuote Tunnus</p>
            <input style={{marginBottom: "5px", marginTop: "5px", backgroundColor: "yellow", marginLeft:"10px", width: "250px", height:"35px", fontSize:"20px"}} defaultValue={ muokattavaTuote?.Tuotetunnus } onChange={ (event) => setUusiTuotetunnus(event.target.value) } />
            
            <p style={{color: "white", marginRight:"190px"}}>Merkki</p>
            <input style={{marginBottom: "5px", marginTop: "5px", backgroundColor: "yellow", marginLeft:"10px", width: "250px", height:"35px", fontSize:"20px"}} defaultValue={ muokattavaTuote?.Merkki } onChange={ (event) => setUusiMerkki(event.target.value) } />
            
            <p style={{color: "white", marginRight:"200px"}}>Malli</p>
            <input style={{marginBottom: "5px", marginTop: "5px", backgroundColor: "yellow", marginLeft:"10px", width: "250px", height:"35px", fontSize:"20px"}} defaultValue={ muokattavaTuote?.Malli } onChange={ (event) => setUusiMalli(event.target.value) } />
            
            <p style={{color: "white", marginRight:"200px"}}>Koko</p>
            <input style={{marginBottom: "5px", marginTop: "5px", backgroundColor: "yellow", marginLeft:"10px", width: "250px", height:"35px", fontSize:"20px"}} defaultValue={ muokattavaTuote?.Koko} onChange={ (event) => setUusiKoko(event.target.value) } />
            
            <p style={{color: "white", marginRight:"205px"}}>Väri</p>
            <input style={{marginBottom: "5px", marginTop: "5px", backgroundColor: "yellow", marginLeft:"10px", width: "250px", height:"35px", fontSize:"20px"}} defaultValue={ muokattavaTuote?.Vari} onChange={ (event) => setUusiVari(event.target.value) } />
            <p style={{color: "white", marginRight:"160px"}}>Lukumäärä</p>
            <input min={1} type={"number"} style={{marginBottom: "5px", marginTop: "5px", backgroundColor: "yellow", marginLeft:"10px", width: "250px", height:"35px", fontSize:"20px"}} defaultValue={ muokattavaTuote?.lkm} onChange={ (event) => setUusiLkm(event.target.valueAsNumber) } />

            <br />
            <Button sx={{ backgroundColor: "dodgerblue","&:hover": {backgroundColor: "yellow", color: "black" }, variant:"outlined", border: "1px solid black", color: "black", fontSize: "15px", fontWeight: "bold", marginBottom: "10px", marginTop: "15px", marginRight:"145px"}} onClick={() => id && kasitteleMuokkaus(id)}>Tallenna</Button>
            <br />
            <Button sx={{ backgroundColor: "red","&:hover": {backgroundColor: "yellow", color: "black" }, variant:"outlined", border: "1px solid black", color: "black", fontSize: "15px", fontWeight: "bold", marginRight: "150px"}} onClick={() => navigoi("/")}>Peruuta</Button>
        </div>
        </Header>
        
    )
}

export default Muokkaus;