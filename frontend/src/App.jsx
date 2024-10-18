import { useState, useEffect } from 'react'
import './App.less'

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

const emojis = shuffle(['👽', '🌸', '🍄', '🍩', '🧋', '🍉', '🌿', '🦥', '🐙', '🦄', '🐸', '🦊', '🐻‍❄️', '👀', '👻', '😼', '🤠', '😎', '🤓', '✨', '🙈', '🙉', '🦕', '🦖', '🦭', '🦡', '🦨', '🦝', '🍄‍🟫', '🌈', '🎸', '🔮', '📚', '💾', '🎮', '👾', '💻', '🍂', '🤘', '💀'])
// Currently 40 emojis
// Build 12 card base game: cards themselves with emojis or images
// (TODO: user should be able to specify number of cards per game at a later point)
// Cards need to have unique IDs, need to have 2 of each randomly chosen emoji
// On click, store card ID (up to a max of 2 cards) in state
// If the strings match, reset cards (IDs) in state and hide those two from view

// Keeping track of turns: every 2 clicks represents a turn.
// Tracking: moves and misses, rounds played, overall accuracy score. See scoreboard here: https://www.helpfulgames.com/subjects/brain-training/memory.html 

// Card comparisons:
// 1. Basic comparison

// 2. Account for double clicks (ex: clicking twice on a card results in a match) -- change to object instead of array so you can compare IDs.
    // Further reading: https://stackoverflow.com/questions/75238932/initializing-state-in-react-js-with-objects-is-it-better-to-initialize-with-an - also came across a reason to explore TS
    // https://forum.freecodecamp.org/t/using-an-object-reference-to-set-initial-state-in-react/236139

// 3. Update scoring

// 4. Refactor for clarity in variable names, verbosity, structure, efficiency (see links)

const cards = []

for (let i = 0; i < 6; i++) {
  cards.push(emojis[i])
  cards.push(emojis[i])
}

const shuffledCards = shuffle(cards)

function App() {
  const [move, setMove] = useState(1)
  const [turns, setTurns] = useState(0)
  const [selections, setSelections] = useState({
    first: { id: null, emoji: null },
    second: { id: null, emoji: null }
  })

  useEffect(() => {
    if (selections.first.emoji && selections.second.emoji) {
      checkMatch(selections.first, selections.second)
    }
    console.log(selections)
  }, [selections])

  const checkMatch = (firstSelection, secondSelection) => {
    if (firstSelection.emoji === secondSelection.emoji) {
      console.log('It\'s a match! 🥳')
    } else {
      console.log('Sorry, no match. 😢')
    }
    setSelections({
      first: { id: null, emoji: null },
      second: { id: null, emoji: null }
    }) // Adjust to use spread operator instead? Rather than repeating here.
  }

  const handleClick = (id, emoji) => {
    if (move === 1) { // Writing it this way makes the code easier to understand: "move 1" is more human-readable
      setSelections({...selections, first: {id, emoji}})
      setMove(2)
    } else if (move === 2) { // Again: modified for human-readability; explicitly saying "move 2"
      setSelections({...selections, second: {id, emoji}})
      setMove(1)
      setTurns(turns + 1)
    }
  }

  return (
    <>
      <h1>matchy matchy 👯‍♀️</h1>
      <div className='cards'>
        {shuffledCards.map((emoji, index) => (
          <div key={index} className='card card-wrapper flip-left' onClick={() => handleClick(index, emoji)}>
            {/* <div className='front'>*</div> */}
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
