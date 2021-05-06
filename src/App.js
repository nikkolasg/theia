import './App.css';
import React, { useState, useEffect } from 'react';
import { Config } from "./Config.js";
import { fetch_from } from './Source.js';
import { CSVLink } from "react-csv";


const resultsKey = "results";

function Stats({results}) {
    const total = results.reduce((acc,row) => acc + row.usd,0);

    return (
       <div>
            <div className="row">
                You got {total.toFixed(2)} dollars in there !
            </div>
            <div className="row">
                <CSVLink data={results}>Download CSV results</CSVLink>;   
            </div>
        </div>

    );
}

function asyncMap(arr, fn) {
  return Promise.all(arr.map(fn));
}

function App() {
    const [results,setResults] = useState([]);

    /*useEffect(() => {*/
        //const json = localStorage.getItem(resultsKey);
        //const savedResults = JSON.parse(json);
        //if (savedResults) {
            //setResults(savedResults)
        //}
    //},[]);

    //useEffect(() => {
        //const json = JSON.stringify(results);
        //localStorage.setItem(resultsKey,json);
    //},[results]);

    const newConfig = (entries) => {
        const fetchAndProcess = async (all) => {
            console.log("FETCHIBG FOR: ",entries);
            const res = (await asyncMap(entries,fetch_from)).flat();
            console.log("NEW RESULTS",res);
            setResults(res);
        };
        fetchAndProcess(entries);
    };


  return (
    <div className="row">
        <div className="col-md-8 mx-auto">
            <header className="App-header">
            <p>
                Crypto Summary
            </p>
            </header>
            <Config newConfigCallback={newConfig} />
            <Stats results={results} />
        </div>
    </div>
  );
}

export default App;
