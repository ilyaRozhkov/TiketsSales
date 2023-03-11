import './App.css';
import {useStore,useEvent} from 'effector-react'
import { useEffect, useState } from 'react';
import {$Iata, $Tickets, fetchIATAFx, fetchTicketsFx } from '../../services/Services';
import Input from '../input/input';
import Itemlist from '../itemlist/itemlist';

export default function App(){

const Iata = useStore($Iata);
const Tickets = useStore($Tickets);
const fetchEventIata = useEvent(fetchIATAFx);
const fetchEventTickets = useEvent(fetchTicketsFx);
const [iataOrigin, getIataOrigin] = useState("MOW");
const [iataDestination, getIataDestination] = useState("BZK");

useEffect(()=>{
  fetchEventIata();
},[])

  const SerchIata=(origin, destination, departure, returns, passagers)=>{
      const codeOrigin = Iata.filter((items)=>items.name===origin);
      const codeDestination = Iata.filter((items)=>items.name===destination);
      getIataOrigin(codeOrigin[0].code);
      getIataDestination(codeDestination[0].code);
      const msg=[];
      msg.push(iataOrigin, iataDestination, departure, returns, passagers);
      fetchEventTickets(msg);
  }
  const items = Tickets ? Tickets : [];

    return (
      <>
      <header>
        <h1>Спланируй свой идеальный отпуск</h1>
        <Input 
          search={SerchIata}
        />
      </header>
      <div>
        <Itemlist props={items} />
      </div>
      </>
    );
}

