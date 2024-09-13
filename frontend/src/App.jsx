import { useState } from 'react'
import './App.less'

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

  for (let i = 0; i < 12; i++) {
    cards.push(emojis[i])
  }

  // for (const emoji in emojis) {
  //   cards.push(emojis[emoji])
  // }

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
      <h1>let&apos;s get matchy matchy 👯‍♀️</h1>
      <div className='cards'>
        {cards.map((emoji, index) => (
          <div key={index} className='card card-wrapper flip-left' onClick={handleClick}>
            <div className='front'>*</div>
            <div className='back'>{emoji}</div>
          </div>
        ))}
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
