import { useEffect, useState } from 'react';
import PhoneInfo from './PhoneInfo';
import './PhoneLookup.css';

const PhoneLookup = () => {


const [model,setModels] = useState([]);
const [userInput,setUserInput] = useState([]);
const [suggestions, setSugestions] = useState([]);

const [modelInfo, setModelsInfo] = useState([]);
const [isLoaded, setisLoaded] = useState(false);
const [error, setError] = useState(false);
const [isPending, setisPending] = useState(false);

const fetchData =(e)=>{
        setisPending(true);
        e.preventDefault();
        fetch("https://phonelabo.p.rapidapi.com/getdevice?device="+model+"&version=Global", {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-key": "",
		"x-rapidapi-host": ""
	    }
        })
        .then(response =>{
            if(response.status!==200){
                console.log("Could not find "+model);
                setError(true);
                setisPending(false);

                setTimeout(() => {
                    setError(false);
                    setModels(" ");
                }, 2000);
                return;
            }
    
            response.json().then(result=>{
                setisPending(false);
                setModelsInfo(result);
                setisLoaded(true);
                setError(false);
                console.log(result);
            });
        
        })
        .catch(err => {
            setisPending(false);
            console.error(err);
            setError(true);
            setisLoaded(false);
        });
};

const fetchPhoneNames = (e, input)=>{
    
    e.preventDefault();
    fetch("https://phonelabo.p.rapidapi.com/matchdevices?matchString="+input+"&imageOnly=true&limit=2", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "",
		"x-rapidapi-host": ""
	}
})
.then(response => {
	if(response!==200){
        console.log("Errorrrrjaslkfd");
    }
    response.json().then(result=>{
        setSugestions(result);

        console.log(result);
    });
})
.catch(err => {
	console.error(err);

});

};
const onInput=()=>{
    let val = document.getElementById("phoneInput").value;
    let options = document.getElementById("phoneList").childNodes;

    options.forEach(element => {
        if(element.value==val){
        setModels(val);
        
        }
    });
};



    return (
        <div>
         <h1 className="title">Smatphone Specification Lookup</h1>
        <div className="lookUpFormContainer">
            <form autoComplete="off"  onSubmit={(e)=>fetchData(e)}>
                <label >Enter a phone model:  
                <input type="text" name="phone" list="phoneList" id="phoneInput" onInput={onInput} onChange={(e)=>{if(e.target.value!=""&&e.target.value.length>3&&e.target.value.length<5)fetchPhoneNames(e, e.target.value)}}/>
                <datalist id="phoneList">
                    {suggestions.map((option,index) => <option  key={index} value={option.device}></option>  )}
                    
                    
                    

                </datalist>
                </label>
                <button  >Search</button>
            </form>
        </div>
        <div className="phoneInfo">
            {isLoaded && <PhoneInfo modelInfo={modelInfo} name={model}/>}
            {error && <div className="error-msg">Could not find phone: "{model}"</div> }

            {isPending && <div className="loading-msg">Loading...</div> }
        </div>
        <div className="bg">

        </div>
        </div>
        
    );
}
 
export default PhoneLookup;
