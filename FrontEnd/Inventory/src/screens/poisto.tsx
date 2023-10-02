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


const Poisto: FC<Props> = ({
    inventaario,
    setInventaario
}) => {
    const navigoi = useNavigate();
    const { id } = useParams();
    const [ poistettavaTuote, setPoistettavaTuote ] = useState<InventaarioData>();


    useEffect(() => {
        haePoistettavaTuote();
    }, [])

    const haePoistettavaTuote = async () => {
        try {
            const response = await fetch(`/Inventaario/${id}`);
            const data = await response.json();

            setPoistettavaTuote(data);
        } catch (error: any) {
            console.error(error);
        }
    }



    const kasittelePoisto = async (id: string) => {
        try {
            await fetch(`/Inventaario/${id}`, {
                method: "DELETE"
            })
            navigoi("/");
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }

    return (
        <Header>
        <div style={{backgroundColor: "black", textAlign: "center", minHeight: "800px"}}>
            <p style={{textAlign: "center", color: "white", fontSize:"20px"}}>Haluatko <b>poistaa</b> tämän tuotteen?</p>
            <p style={{textAlign: "center", color: "white", fontSize: 16}}>Tuotetunnus: {poistettavaTuote && poistettavaTuote.Tuotetunnus}</p>
            <p style={{textAlign: "center", color: "white", fontSize: 18}}>Merkki: {poistettavaTuote && poistettavaTuote.Merkki}</p>
            <p style={{textAlign: "center", color: "white", fontSize: 18}}>Malli: {poistettavaTuote && poistettavaTuote.Malli}</p>
            <p style={{textAlign: "center", color: "white", fontSize: 18}}>Koko: {poistettavaTuote && poistettavaTuote.Koko}</p>
            <p style={{textAlign: "center", color: "white", fontSize: 18}}>Väri:  {poistettavaTuote && poistettavaTuote.Vari}</p>
            <p style={{textAlign: "center", color: "white", fontSize: 18}}>Lukumäärä:  {poistettavaTuote && poistettavaTuote.lkm}</p>
            <Button sx={{ backgroundColor: "red","&:hover": {backgroundColor: "yellow", color: "black" }, variant:"outlined", border: "1px solid black", color: "black", fontSize: "15px", fontWeight: "bold",marginRight: "6px"}} onClick={() => id && kasittelePoisto(id)}>Poista</Button>
            <br />
            <Button sx={{ backgroundColor: "dodgerblue","&:hover": {backgroundColor: "yellow", color: "black" }, variant:"outlined", border: "1px solid black", color: "black", marginTop:"5px", fontWeight: "bold"}} onClick={() => navigoi("/")}>Peruuta</Button>
        </div>
        </Header>
    )
}

export default Poisto;