import { useState } from 'react'
import './App.css'

function App() {
  const [move, setMove] = useState(1)
  const [turns, setTurns] = useState(0)

  const emojis = ['👽', '🌸', '🍄', '🍩', '🧋', '🍉', '🌿', '🦥', '🐙', '🦄', '🐸', '🦊', '🐻‍❄️', '👀', '👻', '😼', '🤠', '😎', '🤓', '✨', '🙈', '🙉', '🦕', '🦖', '🦭', '🦡', '🦨', '🦝', '🍄‍🟫', '🌈', '🎸', '🔮', '📚', '💾', '🎮', '👾', '💻', '🍂', '🤘', '💀']
  // Currently 40 emojis
  // Build 12 card base game: cards themselves with emojis or images
  // Cards need to have unique IDs, need to have 2 of each randomly chosen emoji
  // On click, store card ID (up to a max of 2 cards) in state
  // If the strings match, reset cards (IDs) in state and hide those two from view

  // Keeping track of turns: every 2 clicks represents a turn.
  // Tracking: moves and misses, rounds played, overall accuracy score. See scoreboard here: https://www.helpfulgames.com/subjects/brain-training/memory.html 

  const cards = []

  for (const emoji in emojis) {
    cards.push(emojis[emoji])
  }

  const handleClick = () => {
    if (move < 2) {
      setMove((move) => move + 1)
    } else {
      setTurns(turns + 1)
      setMove(1)
    }
  }

  return (
    <>
      <h1>let&apos;s get matchy matchy</h1>
      <div className='cards'>
        <div className='card' onClick={handleClick}>{cards[0]}</div>
        <div className='card' onClick={handleClick}>{cards[1]}</div>
        <div className='card' onClick={handleClick}>{cards[2]}</div>
        <div className='card' onClick={handleClick}>{cards[3]}</div>
        <div className='card' onClick={handleClick}>{cards[4]}</div>
        <div className='card' onClick={handleClick}>{cards[5]}</div>
        <div className='card' onClick={handleClick}>{cards[6]}</div>
        <div className='card' onClick={handleClick}>{cards[7]}</div>
        <div className='card' onClick={handleClick}>{cards[8]}</div>
        <div className='card' onClick={handleClick}>{cards[9]}</div>
        <div className='card' onClick={handleClick}>{cards[10]}</div>
        <div className='card' onClick={handleClick}>{cards[11]}</div>
      </div>
      <div className='counter'>
        <button>
          {turns} turns taken so far
        </button>
      </div>
    </>
  )
}

export default App
