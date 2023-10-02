import React, { useState, FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventaarioNakyma from "./screens/InventaarioNakyma";
import UusiTuote from "./screens/uusiTuote";
import Muokkaus from "./screens/muokkaus";
import Poisto from "./screens/poisto";





interface InventaarioData {
  id: string;
  Tuotetunnus: string;
  Merkki: string;
  Malli: string;
  Koko: string;
  Vari : string;
  lkm: number;
}


const App: FC = () => {
  const [ inventaario, setInventaario ] = useState<InventaarioData[]>([]);


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/"
            element={ <InventaarioNakyma inventaario={ inventaario } /> }
          />
          <Route 
            path="/uusi"
            element={ <UusiTuote inventaario={ inventaario } setInventaario={ setInventaario }/> }
          />
          <Route 
            path="/muokkaa/:id"
            element={ <Muokkaus inventaario={ inventaario } setInventaario={ setInventaario }/> }
          />
          <Route 
            path="/poista/:id"
            element={ <Poisto inventaario ={ inventaario } setInventaario={ setInventaario }/> }
          />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;