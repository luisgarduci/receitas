import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState, useEffect} from 'react'

library.add(faChevronLeft)
library.add(faChevronRight)

function App() {
  /*
  let permission = Notification.permission;
  if(permission !== "granted") {
    Notification.requestPermission();
    new Notification('Olá', {
      body: 'Teste de notificação',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgQ78U-DTw4r2zOAN60ZTYeNicS30lbM_Jdg&s'
    })
  }
  else {
    new Notification('Olá', {
      body: 'Teste de notificação',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgQ78U-DTw4r2zOAN60ZTYeNicS30lbM_Jdg&s'
    })
  }
    */

   console.log(localStorage)
    
    const [receitas, setReceita] = useState([])
    const [quantidadeReceitas, setQuantidade] = useState();
    let [index, setIndex] = useState(Number(localStorage.getItem("index")));
    const [ingredientes, setIngredientes] = useState([]);
    const [preparo, setPreparo] = useState([]);

    useEffect(() => {
      fetch(`https://receitas-back.vercel.app/receitas?id_receita=${index}`)
      .then(response => response.json())
      .then((data) => {
          setReceita(data)
      })
    }, [index])
    
    useEffect(() => {
       fetch(`https://receitas-back.vercel.app/ingredientes?id_receita=${index}`, {
        method: 'GET'
       })
       .then(response => response.json())
       .then((data) => {
        setIngredientes(data)
       })
    }, [index])

    useEffect(() => {
        fetch('https://receitas-back.vercel.app/quantidadeReceitas', {
          method: 'GET'
        })
        .then(response => response.json())
        .then((data) => {
          setQuantidade(data.length);
        })
    }, [])

    useEffect(() => {
       fetch(`https://receitas-back.vercel.app/preparo?id_receita=${index}`, {
        method: 'GET'
       })
       .then(response => response.json())
       .then((data) => {
        console.log(data);
        setPreparo(data);
       })
    }, [index])
    return (
      
      <div className='body'>
      <FontAwesomeIcon className='arrows leftArrows arrowDesktop' icon={faChevronLeft} onClick={(() => {
            if (index > 1) {
              setIndex(PrevIndex => PrevIndex - 1);
              let indexReceita = Number(localStorage.getItem("index")) - 1
              localStorage.setItem("index", indexReceita);
            }
          })}/>
      <section id="menu">
        {receitas.map((receita, index) => (
          <div key={index}>
        <img src={receita['imagem']} alt="" id="image"></img>
        <h2 id="title">{receita['nome_receita']}</h2>
           
           <p id="description">{receita.descricao}</p>
           <section id="time">
            <h3>Tempo de preparo</h3>
           <ul>
             <li id="preparationtime">Total: Aproximadamente {receita.tempo}</li>
           </ul>
           </section>
       <section id="ingredients">
        <h2>Ingredientes</h2>
         {ingredientes.map(ingrediente => (
          <ul key={ingrediente.id_ingrediente}>
            <li>{ingrediente.nome}</li>
          </ul>
         ))}
         <ul id="ingredientsList">
          
         </ul>
       </section>
      <section id="mode">
      <h2>Modo de Preparo</h2>
      <ol id="preparationmode">
       {preparo.map((element) => (
        <li>{element.modo}</li>
       ))}
      </ol>
      </section>
      </div>
      ))}
      <section class="container-arrows-smartphone">
          <FontAwesomeIcon className="arrows leftArrows" icon={faChevronLeft} /> 
          <FontAwesomeIcon className='arrows rightArrows' icon={faChevronRight}/>
      </section>
  </section>
  <FontAwesomeIcon className='arrows rightArrows arrowDesktop'icon={faChevronRight} onClick={(() => {
    if (index < quantidadeReceitas) {
      setIndex(PrevIndex => PrevIndex + 1)
      let indexReceita = Number(localStorage.getItem("index")) + 1
      localStorage.setItem("index", indexReceita)
  
    }
    
    
  })}/>
  </div>
    );
}


export default App;
