import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { sources, fetch_from } from './Source.js';

// a source entry is { type: <type>, key: <key> }
const isEntryEqual = (e1,e2) => e1.type == e2.type && e1.key == e2.key;
const newEntry = (t,k) => { return { type: t, key: k }; };
const emptyEntry = newEntry("","");

function Source({entry,onSubmit,onDelete}) {
    const defaultType = () => {
        if (entry == undefined || entry.type == "") {
            console.log("DEFAULT VALUE EMPTY ",entry," => replace by ",sources[0].label);
            return sources[0].label;
        } else {
            return entry.type;
        }
    }
    const [type,setType] = useState(defaultType());
    const [key,setKey] = useState(entry.key);

    const getEntry = () => newEntry(type,key);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = getEntry();
        console.log("OLD ENTRY ",entry," => NEW ENTRY (type",type,") : ",newEntry);
        onSubmit(entry,newEntry);
        setType("");
        setKey("");
    };

    console.log("NEW RENDER : type",type, defaultType(), entry);
    const buttonText = isEntryEqual(entry,emptyEntry) ? "Add Source" : "Update";
    //const optionsDict = sources.map(e => {e.type: e.type.toUpperCase() });

    return (
        <div className='row'>
            <form className= "form-inline well" role="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label  className="col-md-1">Source</label>
                    <select className="form-control col-md-3" 
                            value={type} 
                            defaultValue={sources[0].label}
                            onChange={e => setType(e.target.value)}>
                        { sources.map(s => 
                            <option value={s.label}> 
                                {s.label.toUpperCase()} 
                            </option>) }
                    </select>
                    <input
                      value={key}
                      onChange={e => setKey(e.target.value)}
                      type='text'
                      size="50"
                      className='form-control col-md-5 col-md-offset-4'
                      placeholder='Enter API / Public key'
                    />

                    <button className='btn btn-primary col-md-2'>
                        {buttonText}
                    </button>
                    <button type="button" 
                        onClick={() => onDelete(getEntry())}    
                        className="close col-md-1" 
                        aria-label="Delete">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </form> 
        </div>
    );
}

const entriesKey = "sources";

function Config({newConfigCallback}) {
    // contains the list of entries with always an empty entry
    const [entries,setEntries] = useState([]);

    useEffect(() => {
        // load entries only at the beginning
        const json = localStorage.getItem(entriesKey);
        const savedEntries = JSON.parse(json);
        if (savedEntries) {
            console.log("LOADED entries from storage ",savedEntries);
            setEntries(savedEntries);
        }
    },[]);

    useEffect(() => {
        const json = JSON.stringify(entries);
        localStorage.setItem(entriesKey,json);
        newConfigCallback(entries); 
        console.log("SAVED entries to storage", entries);
    },[entries])

    const updateAndSend = () => {
        const newEntries = [...entries];
        setEntries(newEntries);
    };
        
    const submitEntry = (old,newEntry) => {
        let idx = entries.findIndex(e => isEntryEqual(old,e));
        if (idx != -1) { // entry is being updated
            entries[idx] = newEntry;
        } else { // entry is being created for the first time
            entries.push(newEntry);
            console.log("INSERTING new entry at ",idx," => ",entries);
        }
        updateAndSend();
    };

    const deleteEntry = (entry) => {
        console.log("DELETE ENTRY ",entry," ON ",entries);
        let idx = entries.findIndex(e => isEntryEqual(entry,e));
        if (idx == -1) {
            // silent return because the entry is the empty one
            return; 
        }
        entries.splice(idx,1);
        console.log("DELETE ENTRY NEW STATE",entries);
        updateAndSend();
    }
    console.log("ENTRIES SIZE: ",entries.length, " ==> ",entries);
    return (
        <div className="Config"> 
        {
            entries.map(e => 
                <Source 
                    key={JSON.stringify(e)}
                    entry={e}
                    onSubmit={submitEntry} 
                    onDelete={deleteEntry}
                />
            )
        }
        {
            <Source 
                key={JSON.stringify(emptyEntry)}
                entry={emptyEntry}
                onSubmit={submitEntry} 
                onDelete={deleteEntry}
            />
        }
        </div>
    );
}

const resultsKey = "results";

function Stats({results}) {
    const total = results.reduce((acc,row) => acc + row.usd,0);

        return (
       <div>
            You got {total.toFixed(2)} dollars in there !
        </div>
    );
}

function asyncMap(arr, fn) {
  return Promise.all(arr.map(fn));
}

function App() {
    const [results,setResults] = useState([]);

    useEffect(() => {
        const json = localStorage.getItem(resultsKey);
        const savedResults = JSON.parse(json);
        if (savedResults) {
            setResults(savedResults)
        }
    },[]);

    useEffect(() => {
        const json = JSON.stringify(results);
        localStorage.setItem(resultsKey,json);
    },[results]);


    const newConfig = (entries) => {
        console.log("NEW ENTRIES SETUP: ",entries);
        const fetchAndProcess = async (all) => {
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
