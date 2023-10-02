import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
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


const UusiTuote: FC<Props> = ({
    inventaario,
    setInventaario
}) => {
    const navigoi = useNavigate()
    const [ uusiTuoteTunnus, setUusiTuotetunnus ] = useState<string>("")
    const [uusiMerkki, setUusiMerkki] = useState<string>("")
    const [uusiMalli, setUusiMalli] = useState<string>("")
    const [uusiKoko, setUusiKoko] = useState<string>("")
    const [uusiVari, setUusiVari] = useState<string>("")
    const [uusilkm, setUusilkm] = useState<number | null>(1)

  
    const kasitteleuusiTuote = async () => {
         if (!uusiTuoteTunnus || !uusiMerkki || !uusiMalli || !uusiKoko|| !uusiVari || !uusilkm ) {
             alert("Jotain puuttuu, täytä kaikki kentät")
             return;
         }

        try {
            await fetch("/Inventaario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Tuotetunnus: uusiTuoteTunnus, Merkki: uusiMerkki,Malli: uusiMalli, Koko: uusiKoko, Vari: uusiVari, lkm: uusilkm  })
            });

            navigoi("/");
        } catch (error: any) {
            console.log("Virhe luotaessa uutta asiaa")
        }
    }

    return (
        <Header>
        
        <div style={{textAlign: "center", backgroundColor: "black", height: "880px"}}>
            <FormControl sx={{marginBottom: "20px", width: "380px"}}>
                <FormLabel sx={{marginBottom: "20px", color: "white", marginTop: "20px", fontSize: "20px"}}>Uusi Tuote</FormLabel>
                <TextField type="text" label="Tuote Tunnus" variant="outlined" sx={{marginBottom: "20px", backgroundColor: "yellow" }} onChange={ (event) => setUusiTuotetunnus(event.target.value) } />
                <TextField type="text" label="Merkki" variant="outlined" sx={{marginBottom: "20px", backgroundColor: "yellow"}} onChange={ (event) => setUusiMerkki(event.target.value) }  />
                <TextField type="text" label="Malli" variant="outlined" sx={{marginBottom: "20px", backgroundColor: "yellow"}} onChange={ (event) => setUusiMalli(event.target.value) }  />
                <TextField type="text" label="Koko" variant="outlined" sx={{marginBottom: "20px", backgroundColor: "yellow"}} onChange={ (event) => setUusiKoko(event.target.value) }/>
                <TextField type="text" label="Väri" variant="outlined" sx={{backgroundColor: "yellow"}}  onChange={ (event) => setUusiVari(event.target.value) }/>
                <p style={{color: "white", marginRight: "300px"}}>Lukumäärä:</p>
                <input min={1} defaultValue={1} type="number" style={{marginBottom: "20px", backgroundColor: "yellow", height: "30px", width: "80px", fontSize:"20px"}}  onChange={ (event) => setUusilkm(event.target.valueAsNumber) }/>
            </FormControl>
            <br />
         
            <Button sx={{ backgroundColor: "dodgerblue","&:hover": {backgroundColor: "yellow", color: "black" }, variant:"outlined", border: "1px solid black", color: "black", fontSize: "15px", fontWeight: "bold", marginRight: "85px"}}  onClick={ kasitteleuusiTuote }>Lisää uusi tuote inventaarioon</Button>
            <br />
            <br />
            <Button sx={{ backgroundColor: "red","&:hover": {backgroundColor: "yellow", color: "black" }, variant:"outlined", border: "1px solid black", color: "black", fontSize: "15px", fontWeight: "bold", marginRight: "290px"}} onClick={() => navigoi("/")}>Peruuta</Button>
        </div>
        </Header>
        
    )
}

export default UusiTuote;