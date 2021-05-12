import './PhoneInfo.css';
const PhoneInfo = ({modelInfo, name}) => {
    return ( 
        
        <div>
        <h2 className="title">{name}</h2>
        <div className="informationContainer">
            <div className="phoneImg">
            <img src={modelInfo.image} alt=""/>
            </div>
            
            <div className="info">
            <p><strong >Announced:</strong> {modelInfo.announced}</p>
            <p><strong >Dimensions:</strong> {modelInfo.dimensions}</p>
            <p><strong >Models:</strong> {modelInfo.Models}</p>
            <p><strong >Resolution:</strong> {modelInfo.resolution}</p>
            <p><strong >Chipset:</strong> {modelInfo.chipset}</p>
            <p><strong >Price:</strong> {modelInfo.price}</p>
            </div>
            
           
        </div>
        </div>
        
    
     );
}
 
export default PhoneInfo;