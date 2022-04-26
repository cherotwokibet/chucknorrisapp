import React,{useState,useEffect} from 'react'

import logo from "./chuck.png";
import { Message, IconButton, InputPicker, Loader } from "rsuite";
import { ArrowRight } from '@rsuite/icons';

import "rsuite/dist/rsuite.min.css";
import "./App.css";


const URL = "https://api.chucknorris.io/jokes/";

function App() {
  const[joke,setJoke] = useState([]);
    const[categories,setCategories] = useState([]);
    const[category,setCategory] = useState("");
    const[loading,setLoading] = useState(true);
    const[loadingJoke,setLoadingJoke] = useState(false);

    
    useEffect (() => {
        setLoading(true);
        fetch(URL + "categories")
            .then(resp => resp.json())
            .then(resp => {
                const ctgs = resp.map(val => {
                return { label: val, value: val };
            });
            setCategories(ctgs);
            setCategory("random");
            })
            .then(x => {
                return fetch(URL + "random");
            })
            .then(resp => resp.json())
            .then(resp => {
                setJoke(resp.value);
                setLoading(false);
            })
            .catch(err =>
                <Message type="error" description="Oops an unexpected error occurred! Try again later!" />
            );
      }
    ,[]);


    const getJoke = () => {
        let url = URL + "random";
        if ( category !== "random") {
            url += "?category=" + category;
        }
    
        setLoadingJoke({ loadingJoke: true });
        
        fetch(url)
            .then(resp => resp.json())
            .then(resp => {
                
                setLoadingJoke(false );
                setJoke( resp.value );
                // console.log(resp);
                // console.log(loadingJoke);
            })
            .catch(err =>
                <Message type="error" description="Oops an unexpected error occurred! Try again later!" />
            );

    }

    

    if (loading) {
        return (
            <div className="wrapper">
                <Loader size="lg" content="" />
            </div>
        );
    }

    return (
        <div className="wrapper">
            <img src={logo} alt="chuck norris logo" width='50%' style={{marginTop:'80px'}} />
            <div>
                {loadingJoke && loadingJoke ? (
                <div className="loadingJoke">
                    <Loader size="md" />
                </div>
                ) : (
                <blockquote>
                    <span className="dropcap">"</span>
                    {" " + joke}
                </blockquote>
                )}
            </div>
            <div className="picker">
                <InputPicker
                    data={categories}
                    style={{ width: 224 }}
                    placeholder="Choose Category"
                    onSelect={val => {
                        setCategory(val);
                    }}
                />
                <IconButton
                    icon={<ArrowRight />}
                    placement="right"
                    className="next"
                    onClick={() => {
                        getJoke();
                    }}
                >
                    Next
                </IconButton>
            </div>
        </div>
    )

}

export default App;
