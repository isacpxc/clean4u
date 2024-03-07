import React from 'react';
import './css/app.css';
import logo from './img/logo.png'
import { useState,useEffect, useRef } from 'react';
import axios from 'axios';
import './css/modal.css'

function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [codx, setCodx] = useState('');
  const [cody, setCody] = useState('');
  const [Data, SetData] = useState([]);
  const [updateDel, setUpdateDel] = useState();
  const [routeFind, setRouteFind] = useState();
  const mounted = useRef(0)
  const mountedR = useRef(0)
  const mountedM = useRef(0)
  const [modal, setModal] = useState('none')

  const [nameF, setNameF] = useState('');
  const [emailF, setEmailF] = useState('');
  const [telF, setTelF] = useState('');

  const [busca, setBusca] = useState([])
  

  const handleInputChangeName = (event) => {
    setName(event.target.value);
  };

  const handleInputChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleInputChangeTel = (event) => {
    setTel(event.target.value);
  };

  const handleInputChangeCodx = (event) => {
    setCodx(event.target.value);
  };

  const handleInputChangeNameF = async (event) => {
    setNameF(event.target.value);
  };

  const handleInputChangeTelF = (event) => {
    setTelF(event.target.value);
  };

  const handleInputChangeEmailF = (event) => {
    setEmailF(event.target.value);
  };
  
  const handleInputChangeCody = (event) => {
    setCody(event.target.value);
  };

  const handleUpdateDel = (id) =>{
    setUpdateDel(id)
  }

  const handleRoute = (num) => {
    setModal('flex')
    setRouteFind(num)
  }

  useEffect(()=>{
    fetchDataRun()
  },[])


  useEffect(()=>{
    fetchData(1)
  },[nameF])
  
  useEffect(()=>{
    fetchData(2)
  },[emailF])

  useEffect(()=>{
    fetchData(3)
  },[telF])

  useEffect(() =>{
    // console.log(mounted.current)
    if (mounted.current < 2){
      mounted.current = mounted.current + 1
      return
    } else {
      try{
        axios.post(`http://localhost:7788/del/${updateDel}`).then(res => {
          // console.log('deleted')
          fetchData(0)
        })
      } catch(err) {
        console.log('ERRO FOI:'+err)
      }
    }

  },[updateDel])

  useEffect(()=>{
    if (mountedR.current < 2){
      mountedR.current = mountedR.current + 1
    } else {
      try{
        axios.post(`http://localhost:7788/route/${routeFind}`).then(res => {
          const modalDiv = document.getElementById('modal')
          const spans = modalDiv.getElementsByTagName('span')
          // console.log(res.data)
          spans[0].textContent = `distância: ${Number(res.data.minDistance).toFixed(2)}`
          // console.log(res.data)
          spans[1].textContent = `Caminho realizado: ${res.data.path.join(" -> ")}` 
        })
      } catch(err) {
        console.log('ERRO FOI:'+err)
      }
    } 
  },[routeFind])


  
  const fetchDataRun = async () =>{
    try{
      axios.get('http://localhost:7788/info').then(res => {
        //iram retornar jsons do tipo {"email":"test@gmail.com","name":"caliu","tel":"888","codx":3,"cody":3} por exemplo, quero
        SetData(res.data)
        setBusca(res.data)
      })
    } catch(err) {
      console.log('ERRO FOI:'+err)
    }

  }

  const fetchData = async (num) =>{

    // register
    if (num === 0) {
      try{
        axios.get('http://localhost:7788/info').then(res => {
          //iram retornar jsons do tipo {"email":"test@gmail.com","name":"caliu","tel":"888","codx":3,"cody":3} por exemplo, quero
          SetData(res.data)
          setBusca(res.data)

          setEmailF('')
          setNameF('')
          setTelF('')
        })
      } catch(err) {
        console.log('ERRO FOI:'+err)
      }
    }

    // name
    if (num === 1){

      try{
        axios.get('http://localhost:7788/info').then(res => {
          //iram retornar jsons do tipo {"email":"test@gmail.com","name":"caliu","tel":"888","codx":3,"cody":3} por exemplo, quero
          
          const names = []
          SetData(res.data)
          setEmailF('')
          setTelF('')


          for (const item of res.data){
            if (item.name.includes(nameF)){
              names.push(item)
            }
          }
          
          setBusca(names)


        })
      } catch(err) {
        console.log('ERRO FOI:'+err)
      }

      
    }

    // email
    if (num === 2){
      try{
        axios.get('http://localhost:7788/info').then(res => {
          //iram retornar jsons do tipo {"email":"test@gmail.com","name":"caliu","tel":"888","codx":3,"cody":3} por exemplo, quero
          
          const emails = []
          SetData(res.data)

          setNameF('')
          setTelF('')

          for (const item of res.data){
            if (item.email.includes(emailF)){
              emails.push(item)
            }
          }
          
          setBusca(emails)

        })
      } catch(err) {
        console.log('ERRO FOI:'+err)
      }
    }

    // tel
    if (num ===3) {
      try{
        axios.get('http://localhost:7788/info').then(res => {
          //iram retornar jsons do tipo {"email":"test@gmail.com","name":"caliu","tel":"888","codx":3,"cody":3} por exemplo, quero
          
          const tels = []
          SetData(res.data)

          setNameF('')
          setEmailF('')


          for (const item of res.data){
            if (item.tel.includes(telF)){
              tels.push(item)
            }
          }
          
          setBusca(tels)

        })
      } catch(err) {
        console.log('ERRO FOI:'+err)
      }
    }

    
  }

  const modalSwitch = (e) => {
    if (modal == 'none'){
      setModal('flex')
    } else {
      setModal('none')
    }
  }

  // useEffect(()=>{
  //   console.log(modal)
  //   if (mountedM.current < 2){
  //     mountedM.current = mountedM.current+1
  //     console.log('alter1')
  //   } else {
  //     const modalDiv = document.getElementById('modal')
  //     if (modal == 'none'){
  //       modalDiv.style.display = "flex";
  //     } else {
  //       modalDiv.style.display = "none";
  //     }
  //     console.log('alter')
  //   }
  // },[modal])


  return (
    <>

        

        <div id="modal" className="modal" style={{display:`${modal}`}}>
            <span className="modal-content">Distância: 100 km</span>
            <span className="modal-content">Caminho: Rota A</span>
            <button id="closeModal" onClick={modalSwitch}>Fechar</button>
        </div>


      <img src={logo} height='100px'alt='logo' style={{marginTop: '20px'}}/>
      <div className='centerAll' style={{marginTop: '30px'}}>
        <form action="" className='placeHolderRegister'>
          <label>CADASTRAR</label>
          <div className='inputsHold'>
            <input type="text" placeholder='Nome' id='name' value={name} onChange={handleInputChangeName}/>
            <input type="text" placeholder='email' id='email' value={email} onChange={handleInputChangeEmail}/>
            <input type="text" placeholder='telefone' id='tel' value={tel} onChange={handleInputChangeTel}/>
            <input type="number" placeholder='coordenada x' id='codx' value={codx} onChange={handleInputChangeCodx}/>
            <input type="number" placeholder='coordenada y' id='cody' value={cody} onChange={handleInputChangeCody}/>
          </div>
          <button className="margin-top margin-bottom" onClick={(e) => {
            e.preventDefault()
            const dataName = {"email":email,"name":name,"tel":tel,"codx":codx,"cody":cody}

            const registerData = async () =>{
              try{
                await axios.post('http://localhost:7788/register', dataName).then(res => {
                  // console.log('ok')
                })
              } catch(err) {
                console.log('ERRO FOI:'+err)
              }
            }
        
            registerData().then(()=>{
              fetchData(0)
            })

            


            
          }}>Cadastrar</button>
        </form>

        <form action="" className='placeHolderRegister'>
          <label>FILTRAR</label>
          <div className='inputsHold'>
            <input type="text" placeholder='Nome' value={nameF} onChange={handleInputChangeNameF}/>
            <input type="text" placeholder='email' value={emailF} onChange={handleInputChangeEmailF}/>
            <input type="text" placeholder='telefone' value={telF} onChange={handleInputChangeTelF}/>
          </div>
        </form>

        <div action="" className='placeHolderRegister'>
          <label>LISTAGEM</label>
          {busca.map((user, index) => (
            <div className="holdInfo" key={index}>
            <ul>
              <div className='item'>{user.name}</div>
              <div className='item'>{user.email}</div>
              <div className='item'>{user.tel}</div>
              <div className='item'>x: {user.codx}</div>
              <div className='item lastDiv'>
                <div className='holdy'>y: {user.cody}</div>
                <div className='holdBtn'>
                  <button onClick={e => {
                    e.preventDefault()
                    handleUpdateDel(e.target.id)
                  }} id={user.id}>del</button>
                  <button  className={user.id} onClick={e => {
                    e.preventDefault()
                    handleRoute(e.target.className)
                  }}>route</button>
                </div>
              </div>
            </ul>
          </div>
          ))}
          {/* <div className="holdInfo">
            <ul>
              <div className='item'>nome:</div>
              <div className='item'>emai:l</div>
              <div className='item'>telefone:</div>
              <div className='item'>x:</div>
              <div className='item'>y:</div>
            </ul>
          </div> */}

        






        </div>
        
      
      </div>
    </>
  );
}

export default App;
