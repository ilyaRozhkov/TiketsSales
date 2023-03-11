import {useState} from "react";

export default function Input(search){
    const [origin, getOriginal]=useState();
    const [destination, getDestination]=useState();
    const [departure, getDeparture]=useState();
    const [returns, getReturns]=useState(0);
    const [passagers, getPassager]=useState();
    const SerchIata = search.search;

    const handleChangeOrigin=(event)=>{
        getOriginal(event.target.value);
    }
    const handleChangeDestination=(event)=>{
        getDestination(event.target.value);
    }
    const handleChangeDepartureDate=(event)=>{
        getDeparture(event.target.value);
    }
    const handleChangReturnDate=(event)=>{
        getReturns(event.target.value);
    }
    const handleChangePassager = (event)=>{
        getPassager(event.target.value);
    }
    const handleSubmit=(event)=> {
        event.preventDefault();
        SerchIata(origin, destination, departure, returns, passagers);
        
 
      }
        return(
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={(e)=>handleChangeOrigin(e)}/>
                <input type='text' onChange={(e)=>handleChangeDestination(e)}/>
                <input type='date' onChange={(e)=>handleChangeDepartureDate(e)}/>
                <input type='date' onChange={(e)=>handleChangReturnDate(e)}/>
                <input type='text' onChange={(e)=>handleChangePassager(e)}/>
                <input type="submit" value="Отправить" />
            </form>
           
        )
};