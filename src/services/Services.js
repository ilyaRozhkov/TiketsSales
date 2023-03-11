
    import { createStore, createEffect} from "effector";
    import md5 from "md5";

const apiKey = '19c3f1aaab8d52cdfc3113691c6a7436';
const marker ='417715';
const url='http://api.travelpayouts.com/v1/flight_search';
export default class Services{
//e9d09b976dda58e65e5b9a9d9b781e1d apiKey `${apiKey}:beta.ticketSerch.ru:ru:${marker}:${passagers}:0:0:${departure}:${origin}:${destination}:Y:192.168.0.101`
    async getIATA (){
        const result = await fetch('https://api.travelpayouts.com/data/ru/cities.json?_gl=1*6klwqq*_ga*MjEyNzU2NTM1OS4xNjc4MTI3Nzg4*_ga_1WLL0NEBEH*MTY3ODI2MzUzNi4yLjEuMTY3ODI2NjEyOC4xOC4wLjA.') 
        const res = await result.json();
        return await res;
    }
    async getTickets(msg){
        const [origin, destination, departure, returns, passagers] = msg;

        const request =`${apiKey}:beta.ticketSerch.ru:ru:${marker}:${passagers}:0:0:${departure}:${destination}:${origin}:Y:192.168.0.101`;

        const signatyre = md5(request);
        console.log(signatyre);
        const postRequest ={
            "signature":signatyre,
            "marker":marker,
            "host":"beta.ticketSerch.ru",
            "user_ip":"192.168.0.101",
            "locale":"ru",
            "trip_class":"Y",
            "passengers":{
              "adults":passagers,
              "children":0,
              "infants":0
            },
            "segments":[
            {
              "origin":origin,
              "destination":destination,
              "date":departure
            }
            ]
          }

        const result = await fetch(url,{method:"POST", body:JSON.stringify(postRequest),   headers: {
            'Content-Type': 'application/json'
          },})
        const res = await result.json();
        console.log('res', res);
        return await res;
    }
}
const service = new Services();

export const fetchIATAFx = createEffect(()=>service.getIATA())
export const fetchTicketsFx = createEffect(async(msg)=>await service.getTickets(msg))
export const $Iata = createStore([]).on(fetchIATAFx.doneData, (state, msg)=>msg)
export const $Tickets = createStore([]).on(fetchTicketsFx.doneData, (state, msg)=>msg.data)