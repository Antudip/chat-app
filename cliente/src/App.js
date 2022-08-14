import React, {useState} from 'react';
import Chat from './components/Chat';
// import socket from './socket/Socket';]
import './App.css';

function App() {
  // socket.emit('onLine','creo qeu esto ni sale');
  let [name, setName] = useState('');
  let [registered,setRegistered] = useState(false);

  function handleOnSetNameSubmit(e){
      e.preventDefault();
      if(name !== ''){
        setRegistered(true);
      }  
  }
  return <>
      {!registered && <form onSubmit={e=>handleOnSetNameSubmit(e)}>
        <label>Escriba su nombre aca</label>
        <input name = "name" value ={name} onChange={e=>setName(e.target.value)} ></input>
        <button type="submit">submit</button>
      </form>}
      {registered && <Chat name={name}/>}
  </>;
}

export default App;
