import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import firebase from '../firebaseConection'
import { getFirestore, collection, getDocs, addDoc, doc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';


const db = getFirestore(firebase);

function Banco() {
  const [idPost, setIdPost] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect (()=>{
    async function loadPosts(){

      onSnapshot(collection(db, "posts"), (doc) => {
        
        let meusPosts = []

        doc.forEach((item) => {
          meusPosts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor,
          })
        });

        setPosts(meusPosts)

      })
    }

    loadPosts();

  }, []) 


  async function handleAdd(){

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor
    })  
    .then(()=>{
      console.log('Dados salvos no Banco')
      setTitulo('')
      setAutor('')
    })
    .catch((error)=>{
      console.log('Gerou algum erro' + error)
    })

  }
  
  async function buscarPost(){
      // const ref = doc(db, "posts", "123")
      // await getDoc(ref)
      // .then ((snapshot)=>{
      //   setTitulo(snapshot.data().titulo)
      //   setAutor(snapshot.data().autor)
      // })
      // .catch((error)=>{
      //   console.log('Gerou um erro' + error)
      // })
      const col = collection(db, "posts")
      await getDocs(col)
      .then ((snapshot)=>{
        let lista = [];

        snapshot.forEach((doc) =>{
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })

        console.log(lista)

        setPosts(lista)
      })
      .catch((error)=>{
        console.log('Gerou um erro' + error)
      })
  }

  async function editarPost(){
    await updateDoc(doc(db, "posts", idPost), {
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      console.log('Dados atualizados com sucesso')
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch(()=>{
      console.log('Erro ao atualizar')
    })
  }

  async function excluirPost(id){
    await deleteDoc(doc(db, "posts", id))
    .then(()=>{
      console.log('Dados deletados com sucesso')
    })
  }

 


  return (
    <div className="App">

      <Link style={{color:"white", backgroundColor:"#1a1a1a", padding: "0.6em 1.2em", borderRadius: "8px"}}  to={`/`}>Voltar</Link>


      <div className="container">
        <h2>Banco de Dados:</h2>
        <label>ID: </label>
        <input type="text" value={idPost} onChange={(e)=> setIdPost(e.target.value)}></input>
        
        <label>Titulo: </label>
        <textarea type="text" value={titulo} onChange={(e)=> setTitulo(e.target.value)}></textarea>
        
        <label>Autor: </label>
        <input type="text" value={autor} onChange={(e)=> setAutor(e.target.value)}></input>
        <div className='buttons' style={{width: "100%", display: "flex", gap: "10px", justifyContent: "center", marginTop:"15px"}}>
          <button style={{width: "30%"}} onClick={handleAdd}>Cadastrar</button>
          <button style={{width: "30%"}} onClick={buscarPost}>Buscar posts</button>
          <button style={{width: "30%"}} onClick={editarPost}>Editar</button><br />
        </div><br /><br />

        <div>
          {posts.map((post)=>{
            return(
              <div key={post.id}>
                <span>Id: {post.id}</span> <br />
                <span>Titulo: {post.titulo}</span> <br />
                <span>Autor: {post.autor}</span> <br />
                <button onClick={() => excluirPost(post.id)}>Excluir</button><br /><br />
              </div>
            )
          })}
        </div>
      </div>


    </div>
  )
}

export default Banco
