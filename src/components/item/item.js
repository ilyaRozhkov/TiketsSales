import './item.css'
import {useStore} from 'effector-react'
import {$Iata } from '../../services/Services';
import { useEffect, useState } from 'react';


export default function Item({item}){
    const Iata = useStore($Iata);
    const [origin, getOrigin] = useState()
    const [destination, getDestination] = useState()

    useEffect(()=>{
        getSityName(item);
    },[])

    const getSityName=(item)=>{
        const codeOrigin = Iata.filter((items)=>items.code===item.origin);
        const codeDestination = Iata.filter((items)=>items.code===item.destination);
        const or=codeOrigin[0].name;
        const de=codeDestination[0].name;
        getOrigin(or);
        getDestination(de);
    }

    return (
        <div className="block">
        <li>{origin}</li>
        <li>{destination}</li>
        <li>{item.price}</li>
        <li><a>{item.link}</a></li>
        </div>
    )
}