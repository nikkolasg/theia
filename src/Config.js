import React, { useState, useEffect } from 'react';
import { sources } from './Source.js';


// a source entry is { type: <type>, key: <key> }
const isEntryEqual = (e1,e2) => e1.type === e2.type && e1.key === e2.key;
const newEntry = (t,k) => { return { type: t, key: k }; };
const emptyEntry = newEntry("","");

const SelectType = ({entry,onChange}) => {
    const changeType = (t) => {
        entry.type = t;
        onChange({...entry});
    };
    return (
    <>
        <label  className="col-md-1">Source</label>
        <select className="form-control col-md-3" 
            value={entry.type} 
            defaultValue={sources[0].label}
            onChange={e => changeType(e.target.value)}>
            { sources.map(s => 
            <option value={s.label}> 
                {s.label.toUpperCase()} 
            </option>) }
        </select>
    </>
    );
};

const KeyInput = ({entry,onChange,txt}) => {
     const changeKey = (k) => {
        entry.key = k;
        onChange({...entry});
    };
    return (
        <input
            value={entry.key}
            onChange={e => changeKey(e.target.value)}
            type='text'
            size="50"
            className='form-control col-md-5 col-md-offset-4'
            placeholder={txt}
        />
    );
};

const entrySetDefaultType = (e) => {
    var entry = {...e};
    if (entry === undefined || entry.type === "") {
        entry.type = sources[0].label;
    } 
    return entry;
};

function Source({entry,onSubmit,onDelete}) {
    const [local,setLocal] = useState(entrySetDefaultType(entry));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("OLD ENTRY ",entry," => NEW ENTRY (type",entry.type,") : ",local);
        onSubmit(entry,local);
        setLocal(entrySetDefaultType(newEntry("","")));
    };

    console.log("NEW RENDER : type",local.type, " (while entry is ",entry);
    const buttonText = isEntryEqual(entry,emptyEntry) ? "Add Source" : "Update";
    const inputText = "API / Public Key";
    //const optionsDict = sources.map(e => {e.type: e.type.toUpperCase() });

    return (
        <div className='row'>
            <form className= "form-inline well" onSubmit={handleSubmit}>
                <div className="form-group">
                    <SelectType entry={local} onChange={setLocal} />
                    <KeyInput entry={local} onChange={setLocal} txt={inputText} />
                    <button className='btn btn-primary col-md-2'>
                        {buttonText}
                    </button>
                    <button type="button" 
                        // we pass the entry we've been given as this how the
                        // config  looks up for the index to remove in the list
                        // TODO : maybe give an ID to each entry ?
                        onClick={() => onDelete(entry)}    
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
        if (entries.length == 0) {
            return;
        }
        const json = JSON.stringify(entries);
        localStorage.setItem(entriesKey,json);
        console.log("SAVED entries to storage", entries);
        newConfigCallback(entries); 
    },[entries])

    const updateAndSend = () => {
        const newEntries = [...entries];
        console.log("Updating entries to -->",newEntries);
        setEntries(newEntries);
    };
        
    const submitEntry = (old,newEntry) => {
        let idx = entries.findIndex(e => isEntryEqual(old,e));
        if (idx !== -1) { // entry is being updated
            entries[idx] = newEntry;
            console.log("UPDATING entry at index ",idx);
        } else { // entry is being created for the first time
            entries.push(newEntry);
            console.log("INSERTING new entry at ",idx," => ",entries);
        }
        updateAndSend();
    };

    const deleteEntry = (entry) => {
        console.log("DELETE ENTRY ",entry," ON ",entries);
        let idx = entries.findIndex(e => isEntryEqual(entry,e));
        if (idx === -1) {
            // silent return because the entry is the empty one
            return; 
        }
        entries.splice(idx,1);
        console.log("DELETE ENTRY NEW STATE",entries);
        updateAndSend();
    }

    const deleteConfig = () => {
        localStorage.removeItem(entriesKey);
        setEntries([]);
    };
    //deleteConfig();

    console.log("ENTRIES SIZE: ",entries.length, " ==> ",entries);
    return (
        <div className="Config"> 
        <div className="row">
            <button className="btc btn-danger" onClick={deleteConfig}> Delete Config </button>
        </div>
        <div className="row">
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
        </div>
    );
}

export {
    Config,
}
