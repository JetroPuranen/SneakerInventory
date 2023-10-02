import { Button, TableContainer, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import React, { FC, useEffect, useState } from "react";
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
}


const InventaarioNakyma: FC<Props> = ({
    inventaario
}) => {
    const navigoi = useNavigate();
    const [ inventaarioTuotteet, setinventaarioTuotteet ] = useState<InventaarioData[]>([]);
    

    useEffect(() => {
        haeTuotteet();
       
    }, [])

    //Haetaan inventaario palvelimelta
    const haeTuotteet = async () => {
        try {
            const response = await fetch("/Inventaario");
            const data = await response.json();
            console.log(data);
            //Haetaan kaikki merkit 
            const nike = document.getElementById("Nike") as HTMLInputElement;
            const adidas = document.getElementById("Adidas") as HTMLInputElement;
            const umbro = document.getElementById("Umbro") as HTMLInputElement;
            const puma = document.getElementById("Puma") as HTMLInputElement;
            const newbalance = document.getElementById("NewBalance") as HTMLInputElement;
            const vans = document.getElementById("Vans") as HTMLInputElement;

            setinventaarioTuotteet(data);
            //Nike merkin filtteröinti
            nike.addEventListener('change', function() {
                if (this.checked) {
                const filterNike = data.filter(function(tuote: { Merkki: string; }){
                    return tuote.Merkki === 'Nike'
                });
                //Asetetaan inventaariotuoteet filtteröinnin mukaan
                setinventaarioTuotteet(filterNike);
                //Mikäli ollaan napattu Niken merkit mukaan, 
                //Laitetaan muut checkboxit kiinni.
                adidas.checked = false;
                umbro.checked = false;
                puma.checked = false;
                newbalance.checked = false;
                vans.checked = false;
                } else {
                //Muuten näytetään kaikki tuotteet
                setinventaarioTuotteet(data);
                }
              });
              //Adidas merkin filtteröinti
              adidas.addEventListener('change', function() {
                if (this.checked) {
                const filterAdidas = data.filter(function(tuote: { Merkki: string; }){
                    return tuote.Merkki === 'Adidas'
                });
                nike.checked = false;
                umbro.checked = false;
                puma.checked = false;
                newbalance.checked = false;
                vans.checked = false;
                setinventaarioTuotteet(filterAdidas);
                
                } else {
                setinventaarioTuotteet(data);
                }
              });
              //Umbro merkin filtteröinti
              umbro.addEventListener('change', function() {
                if (this.checked) {
                const filterUmbro = data.filter(function(tuote: { Merkki: string; }){
                    return tuote.Merkki === 'Umbro'
                });
                nike.checked = false;
                adidas.checked = false;
                puma.checked = false;
                newbalance.checked = false;
                vans.checked = false;
                setinventaarioTuotteet(filterUmbro);
                
                } else {
                setinventaarioTuotteet(data);
                }
              });
              //Puma merkin filtteröinti
              puma.addEventListener('change', function() {
                if (this.checked) {
                const filterPuma = data.filter(function(tuote: { Merkki: string; }){
                    return tuote.Merkki === 'Puma'
                });
                nike.checked = false;
                adidas.checked = false;
                umbro.checked = false;
                newbalance.checked = false;
                vans.checked = false;
                setinventaarioTuotteet(filterPuma);
                
                } else {
                setinventaarioTuotteet(data);
                }
              });
                //Vans merkin filtteröinti
                vans.addEventListener('change', function() {
                    if (this.checked) {
                    const filterVans = data.filter(function(tuote: { Merkki: string; }){
                        return tuote.Merkki === 'Vans'
                    });
                    nike.checked = false;
                    adidas.checked = false;
                    umbro.checked = false;
                    puma.checked = false;
                    newbalance.checked = false;
                    setinventaarioTuotteet(filterVans);
                    
                    } else {
                    setinventaarioTuotteet(data);
                    }
                  });
                  //New Balance merkin filtteröinti
                  newbalance.addEventListener('change', function() {
                    if (this.checked) {
                    const filterNewBalance = data.filter(function(tuote: { Merkki: string; }){
                        return tuote.Merkki === 'New Balance'
                    });
                    nike.checked = false;
                    adidas.checked = false;
                    umbro.checked = false;
                    puma.checked = false;
                    vans.checked = false;
                    setinventaarioTuotteet(filterNewBalance);
                    
                    } else {
                    setinventaarioTuotteet(data);
                    }
                  });
              
          
            
             
            
           
        } catch (error: any) {
            console.error(error);
        }
    }

 
    const PoistoNappi = (id: string) => {
        navigoi(`/poista/${id}`)
    }

    
    const MuokkaaNappi = (id: string) => {
        navigoi(`/muokkaa/${id}`)
    }


   
    return (
        <Header>
            
        
        
        <div style={{backgroundColor: "black", minHeight: "950px"}}>
            <Button onClick={ () => navigoi("/uusi") } sx={{variant:"outlined", border: "1px solid black", backgroundColor:"black", color: "white", marginBottom: "20px", float: "center", marginTop: "20px", marginLeft: "25px"}}>Lisää uusi tuote</Button>
            
            <input style={{marginLeft: "30px"}} type={"checkbox"} name="Nike" id="Nike" value={"Nike"}></input>
            <label style={{color:"white"}} htmlFor="Nike">Nike</label>
            
            <input style={{marginLeft: "30px"}} type={"checkbox"} name="Adidas" id="Adidas" value={"Adidas"}></input>
            <label style={{color:"white"}} htmlFor="Adidas">Adidas</label>
            
            <input style={{marginLeft: "30px"}} type={"checkbox"} name="Umbro" id="Umbro" value={"Umbro"}></input>
            <label style={{color:"white"}} htmlFor="Umbro">Umbro</label>
            
            <input style={{marginLeft: "30px"}} type={"checkbox"} name="Puma" id="Puma" value={"Puma"}></input>
            <label style={{color:"white"}} htmlFor="Puma">Puma</label>
            
            <input style={{marginLeft: "30px"}} type={"checkbox"} name="Vans" id="Vans" value={"Vans"}></input>
            <label style={{color:"white"}} htmlFor="Vans">Vans</label>
            
            <input style={{marginLeft: "30px"}} type={"checkbox"} name="NewBalance" id="NewBalance" value={"New Balance"}></input>
            <label style={{color:"white"}} htmlFor="NewBalance">New Balance</label>
            
            <Button sx={{variant:"outlined", border: "1px solid black", backgroundColor:"black", color: "white", marginBottom: "20px", float: "right", marginTop: "20px", marginRight: "5px"}}>Hae Tuotetta</Button>
            <input id="hae" style={{marginBottom: "5px", marginTop: "20px", backgroundColor: "yellow", width: "250px", height:"35px", fontSize:"20px", float:"right"}}></input>
            
             {/*Yläpalkki */}
             <TableContainer sx={{marginLeft: "25px"}}>
                <TableRow>
                    <TableCell sx={{fontSize: 22, border: "1px solid yellow", textAlign: "center", width: "350px", backgroundColor: "black", color: "yellow"}}>Tuote Tunnus</TableCell>
                    <TableCell sx={{fontSize: 22,border: "1px solid yellow", textAlign: "center",width: "350px", backgroundColor: "black", color: "yellow"}}>Merkki</TableCell>
                    <TableCell sx={{fontSize: 22, border: "1px solid yellow", textAlign: "center", width: "350px", backgroundColor: "black", color: "yellow"}}>Malli</TableCell>
                    <TableCell sx={{fontSize: 22,border: "1px solid yellow", textAlign: "center", width: "75px", backgroundColor: "black", color: "yellow"}}>Koko</TableCell>
                    <TableCell sx={{fontSize: 22,border: "1px solid yellow", textAlign: "center", width: "350px", backgroundColor: "black", color: "yellow"}}>Väri</TableCell>
                    <TableCell sx={{fontSize: 22,border: "1px solid yellow", textAlign: "center", width: "75px", backgroundColor: "black", color: "yellow"}}>Lkm</TableCell>

                    
                    </TableRow>
                </TableContainer>
                {/*Alapalkki */}
                { inventaarioTuotteet.map(tuote => {
                    return (
                    <TableContainer sx={{marginLeft: "25px"}}>
                        <TableRow
                            key={ tuote.id }
                            style={{backgroundColor: "yellow", textAlign: "center"}}
                        >
                            <TableCell style={{fontSize: 22, width: "350px", textAlign: "center", border: "1px solid black", height: "80px"}}>{ tuote.Tuotetunnus }</TableCell>
                            <TableCell style={{fontSize: 22, width: "350px", textAlign: "center", border: "1px solid black", height: "80px"}}>{ tuote.Merkki }</TableCell>
                            <TableCell style={{fontSize: 22,width: "350px", textAlign: "center", border: "1px solid black", height: "80px"}}>{ tuote.Malli }</TableCell>
                            <TableCell style={{fontSize: 22,width: "75px", textAlign: "center", border: "1px solid black", height: "80px"}}>{ tuote.Koko }</TableCell>
                            <TableCell style={{fontSize: 22,width: "350px", textAlign: "center", border: "1px solid black", height: "80px"}}>{ tuote.Vari }</TableCell>
                            <TableCell style={{fontSize: 22,width: "75px", textAlign: "center", border: "1px solid black", height: "80px"}}>{ tuote.lkm }</TableCell>

                            <TableCell style={{fontSize: 22,width: "75px", textAlign: "center", border: "1px solid black", backgroundColor: "black", height: "80px"}}>
                            <Button sx={{ backgroundColor: "red","&:hover": {backgroundColor: "yellow", color: "black" }, variant:"outlined", border: "1px solid black", color: "black", fontSize: "15px", fontWeight: "bold", marginRight: "15px"}} onClick={ () => PoistoNappi(tuote.id) }>Poista</Button>                            
                            <Button sx={{ backgroundColor: "dodgerblue","&:hover": {backgroundColor: "yellow", color: "black" }, variant:"outlined", border: "1px solid black", color: "black", marginTop:"5px", fontWeight: "bold"}} onClick={ () => MuokkaaNappi(tuote.id) }>Muokkaa</Button>
                            </TableCell>

                            
                        
                        </TableRow>
                        </TableContainer>
                    
                    )
                }) }
          </div>  
        
        </Header>
    )
}

export default InventaarioNakyma;