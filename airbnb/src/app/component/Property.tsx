
    import { usePropertyContext } from "../context/PropertyContext";


export function Property({property, deleteProperty}: any){ // super viktigt att ta bort any sen!
    console.log("In property");
    
    const {setSelectedProperty} = usePropertyContext();
    return (
        <div className="property-card" onClick={()=> setSelectedProperty(property)}>
            <h3 className="property-name">{property.name}</h3>
            <p className="property-price">${property.pricePerNight} / night</p>
            <p className="property-location">{property.place}</p>
            <p className="property-description">{property.description}</p>
        </div>
    )
}
