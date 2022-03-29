import './style.css';
import back from '../../assets/card-back.png' 
import cards from '../../cards'
import {useState} from 'react'
import end from '../../assets/congrats.png'

function Main() {
  const [dadeCards, setdadeCards] = useState([...cards])

  function flip(key){
    const localcards = [...dadeCards]
    const currentCard = localcards.find((item) => item.id === key.id)
    

    const only = localcards.filter((item) => item.turned)

    if(only.length > 1){
      return
    }
    if(only.length && key.slug === only[0].slug){
      currentCard.turned = !currentCard.turned
      setdadeCards(localcards)

      setTimeout(()=> {
        if(currentCard.id === only[0].id){
        return
        }
        const filtercards = localcards.filter((item) => item.id !== currentCard.id && item.id !== only[0].id)
        setdadeCards(filtercards)

      },500)
      

      return
    }

    currentCard.turned = !currentCard.turned
    setdadeCards(localcards)

    setTimeout(()=>{
      if(only.length){
        localcards.forEach((item) => {
          item.turned = false
        })
        setdadeCards([...localcards])
      }
    },600)
    
  }

  function reset(){
    cards.forEach((item) => {
      item.turned = false
    })
    setdadeCards([...cards])
  }

  return (
    <div className='container'>
      <header>
        <h2>Cubos Puzzle</h2>
        <h2>Cubos Puzzle</h2>
        <button onClick={() => reset()}>Reset</button>
      </header>
      <main>
        {dadeCards.length ? dadeCards.map((element)=> {
            return(
              // eslint-disable-next-line jsx-a11y/alt-text
              <img src={element.turned ? element.image : back} 
                key={element.id}

                onClick={()=> flip(element)}
              />
            )
          })
          :
          // eslint-disable-next-line jsx-a11y/alt-text
          <img src={end}/>
        }
      </main>
    </div>
  );
}

export default Main;
