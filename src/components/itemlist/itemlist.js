import Item from "../item/item"



export default function ItemList({props}){

    const elements = props.map((el, i)=>{
        return <Item key={i} item={el}/>
    })
    return(
        <>
        <ul>{elements}</ul>
        </>
    )
}