import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import firebase from '../firebaseConection'
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, getDocs, getDoc, setDoc, addDoc, doc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';


import { TextField } from '@mui/material';
import { Box } from '@mui/system';

const auth = getAuth(firebase);
const db = getFirestore(firebase);


function Cadastro() {
  const [email, setEmail] = useState('');
  const[senha, setSenha] = useState('');
  const[cargo, setCargo] = useState('');
  const[nome, setNome] = useState('') 
  const[user, setUser] = useState({});
  //const[userLogged, setUserLogged] = useState({})


//   useEffect(()=>{
//     async function checkLogin(){
//       await onAuthStateChanged(auth, (user) => {
//         if(user){
//           setUser(true)
//           setUserLogged({
//             uid: user.uid,
//             email: user.email,
//           })
//         }else{
//           setUser(false)
//           setUserLogged({})
//         }
//       })
//     }

//     checkLogin()

//   },[])

 
  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(async(value)=>{
        await setDoc(doc(db, "users", value.user.uid), {
            nome: nome,
            cargo: cargo,
            status: true,
        })
        .then(()=>{
            setNome('')
            setCargo('')
            setEmail('')
            setSenha('')
        }).catch((error)=>{
            console.log(error)
        })
    })
    .catch((error)=>{
      if(error.code === 'auth/weak-password'){
        alert('Senha muito fraca')
      }else if(error.code === 'auth/email-already-in-use'){
        alert('Esse e-mail já foi cadastrado')
      }
    })
  }

  async function logout(){
    signOut(auth).then(() => {
      console.log('saiu com sucesso')
      setUser({})
    }).catch((error) => {
      console.log('algo de errado aconteceu' + error)
    });
  }

  async function login(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then(async (value)=>{
      await getDoc(doc(db, "users", value.user.uid))
      .then((snapshot)=>{
        setUser({
           nome: snapshot.data().nome,
           cargo: snapshot.data().cargo,
           status: snapshot.data().status,
           email: value.user.email,
        })
      })
      setEmail('')
      setSenha('')
    })
    .catch((error)=>{
        console.log('erro ao fazer login' + error)
    })
}


  return (
    
    <div className="App">
        
      <h1>React + firebase ;)</h1>

    <Box >
      <div className="container">


        <h2>Authentication</h2>
        <TextField sx={{marginTop: '10px'}} label="Nome" variant="outlined"  value={nome} onChange={(e)=> setNome(e.target.value)}/>

        <TextField sx={{marginTop: '10px'}} label="Cargo" variant="outlined"  value={cargo} onChange={(e)=> setCargo(e.target.value)}/>

        <TextField sx={{marginTop: '10px'}} label="Email" variant="outlined"  value={email} onChange={(e)=> setEmail(e.target.value)}/>

        <TextField type="password" sx={{marginTop: '10px'}} label="Senha" variant="outlined"  value={senha} onChange={(e)=> setSenha(e.target.value)}/>
        
        <div className='buttons'
        style={{
            width: "100%", 
            display: "flex", 
            gap: "10px", 
            justifyContent: "center", 
            marginTop:"15px"
        }}>
          <button style={{width: "30%"}} onClick={login}>Login</button>
          <button style={{width: "30%"}} onClick={novoUsuario}>Cadastrar</button>
          <button style={{width: "30%"}} onClick={logout}>Sair</button>
        </div><br /><br />

        

        {Object.keys(user).length > 0 && (
          <div>
            <h3>Seja bem-vindo! {user.nome}</h3>
            <span>Cargo: {user.cargo} <br/>
            Email: {user.email} <br/>
            Status: {user.status ? 'ATIVO' : 'DESATIVADO'}<br/></span><br/>
          </div>
        )}

      </div>
    </Box>
            
      <Link style={{color:"white", backgroundColor:"#1a1a1a", padding: "0.6em 1.2em", borderRadius: "8px"}}  to={`/Banco`}>Acessar o Banco de Dados</Link>
    </div>
    
  )
}

export default Cadastro
