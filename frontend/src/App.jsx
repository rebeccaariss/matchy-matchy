import { useState, useEffect } from 'react'
import './App.less'
import confetti from 'canvas-confetti'

// TODO: clicking the edge of a card results in a number of undesirable behaviours (card doesn't flip completely, sometimes one will stay flipped)

// TODO: Track accuracy. Accuracy = (matches / turns) * 100
// TODO: High score across sessions with localStorage
// TODO: Total time to finish (use a timer with useEffect)

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

const matchaMojis = shuffle(['🍵', '🌿', '🫖', '🧋', '🇯🇵', '🗾', '🎍', '💚', '🪴', '🍃', '🌱', '🏯', '🍡', '🌾', '🌸', '✨', '🌊', '🗻', '🚛', '♨️'])

const emojis = shuffle(['👽', '🌸', '🍄', '🍩', '🧋', '🍉', '🌿', '🦥', '🐙', '🦄', '🐸', '🦊', '🐻‍❄️', '👀', '👻', '😼', '🤠', '😎', '🤓', '✨', '🙈', '🙉', '🦕', '🦖', '🦭', '🦡', '🦨', '🦝', '🍄‍🟫', '🌈', '🎸', '🔮', '📚', '💾', '🎮', '👾', '💻', '🍂', '🤘', '💀'])
// Currently 40 emojis
// Build 12 card base game: cards themselves with emojis or images
// (TODO: user should be able to specify number of cards per game at a later point)
// Cards need to have unique IDs, need to have 2 of each randomly chosen emoji
// On click, store card ID (up to a max of 2 cards) in state
// If the strings match, reset cards (IDs) in state and hide those two from view
// Display turns conditionally: "1 turn taken so far" instead of "1 turns taken so far"

// Keeping track of turns: every 2 clicks represents a turn.
// Tracking: moves and misses, rounds played, overall accuracy score. See scoreboard here: https://www.helpfulgames.com/subjects/brain-training/memory.html 

// Card comparisons:
// 1. Basic comparison

// 2. Account for double clicks (ex: clicking twice on a card results in a match) -- change to object instead of array so you can compare IDs.
    // Further reading: https://stackoverflow.com/questions/75238932/initializing-state-in-react-js-with-objects-is-it-better-to-initialize-with-an - also came across a reason to explore TS
    // https://forum.freecodecamp.org/t/using-an-object-reference-to-set-initial-state-in-react/236139

// 3. Update scoring

// 4. Refactor for clarity in variable names, verbosity, structure, efficiency (see links)
// Could add theme selection! Like click leaves for fall, crystal ball for witchy, controller for gaming, etc.

// 5. What happens at the end of the game? New game? Overall score updated? What's the animation? Etc.

function App() {
  const [cardEmojis, setCardEmojis] = useState([])
  const [move, setMove] = useState(1)
  const [turns, setTurns] = useState(0)
  const [matches, setMatches] = useState(0)
  const [selections, setSelections] = useState({
    first: { id: null, emoji: null },
    second: { id: null, emoji: null }
  })
  const [isMatchaMatcha, setIsMatchaMatcha] = useState(false)

  const shuffleCards = () => {
    const newCardEmojis = []

    for (let i = 0; i < 6; i++) { // Generates 12 card game (6 pairs)
      if (isMatchaMatcha) {
        newCardEmojis.push(matchaMojis[i])
        newCardEmojis.push(matchaMojis[i])
      } else if (!isMatchaMatcha) {
        newCardEmojis.push(emojis[i])
        newCardEmojis.push(emojis[i])
      }
    }

    const shuffledEmojis = shuffle(newCardEmojis)

    // Previously, this was done at the state declaration for cards:
    return shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji: emoji,
      matched: false,
      isFlipped: false
    }))
  }

  const [cards, setCards] = useState(shuffleCards())
  // We need useEffect here because otherwise the cards/emojis would only render at initial app rendering:
  useEffect(() => {
    setCards(shuffleCards())
    setMove(1)
    setTurns(0)
    setMatches(0)
    setSelections({
      first: { id: null, emoji: null },
      second: { id: null, emoji: null }
    })
  }, [isMatchaMatcha])


  // matcha matcha confetti for later:
  const scalar = 3
  const leaves = confetti.shapeFromText({ text: '🍃', scalar })

  const handleCelebrate = () => {
    triggerModal(`Woohoo! 🥳 \n Turns: ${turns} \n Matches: ${matches}`);

    isMatchaMatcha ?
      confetti({
        shapes: [leaves],
        scalar,
        particleCount: 125,
        spread: 160
      })
    :
      confetti({
        particleCount: 125,
        spread: 160
      })
  }

  const triggerModal = (msgText) => {
    Swal.fire({
      title: msgText,
      text: 'Do you want to begin a new game?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start a new game',
      cancelButtonText: 'Take me back',
    }).then((result) => {
      if (result.isConfirmed) {
        resetGame()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  }

  const resetGame = () => {
    setMove(1)
    setTurns(0)
    setMatches(0)
    setSelections({
      first: { id: null, emoji: null },
      second: { id: null, emoji: null },
    })
    setCards(shuffleCards())
    // alert("Game has been reset")
  }

  useEffect(() => {
    if ((matches * 2) === cards.length) {
      handleCelebrate()
    }
  }, [matches, cards])

  useEffect(() => {
    if (selections.first.emoji && selections.second.emoji) {
      checkMatch(selections.first, selections.second)
    }
  }, [selections])

  const checkMatch = (firstSelection, secondSelection) => {
    if (firstSelection.id === secondSelection.id) {
      console.log('Oops, you clicked the same card twice!') // TODO: work with this
      setSelections({
        first: { id: null, emoji: null },
        second: { id: null, emoji: null }
      }) // Adjust to use spread operator instead? Rather than repeating here.
      return
    }
    if (firstSelection.emoji === secondSelection.emoji) {
      setMatches(matches + 1)
      setCards((prevCards) =>
        prevCards.map((card) =>
          // During mapping, if the card is one of the matching pair, then copy all values using
          // the spread operator and change 'matched' value of that card to 'true':
          card.id === firstSelection.id || card.id === secondSelection.id
            ? { ...card, matched: true }
            : card
        )
      )
    } else {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstSelection.id || card.id === secondSelection.id
              ? { ...card, isFlipped: false }
              : card
          )
        )
      }, 1000)
    }
    setSelections({
      first: { id: null, emoji: null },
      second: { id: null, emoji: null }
    }) // Adjust to use spread operator instead? Rather than repeating here.
  }

  const handleClick = (id, emoji) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    )

    if (move === 1) { // Writing it this way makes the code easier to understand: "move 1" is more human-readable
      setSelections({...selections, first: {id, emoji}})
      setMove(2)
    } else if (move === 2) { // Again: modified for human-readability; explicitly saying "move 2"
      setSelections({...selections, second: {id, emoji}})
      setMove(1)
      setTurns(turns + 1)
    }
  }

  const handleFlip = () => {
    setIsFlipped((prevState) => !prevState) // this essentially functions like an on/off switch: as opposed to setIsFlipped(true), where we can only flip the card once, this allows toggling so that every time the card is clicked it flips (regardless of which side is facing forward). what you call it doesn't matter as long as it contains keyword "prev".
  }

  return (
    <>
      <div className={`main ${isMatchaMatcha ? 'matcha-mode' : 'matchy-mode'}`}>
        <nav>
          <h1>{isMatchaMatcha ? 'matcha matcha 🍵' : 'matchy matchy 👯‍♀️'}</h1>
          <input 
            type="checkbox"
            id="toggle"
            checked={isMatchaMatcha}
            onChange={() => setIsMatchaMatcha(!isMatchaMatcha)}
            title={isMatchaMatcha ? 'Play matchy matchy 👯‍♀️' : 'Play matcha matcha 🍵'}
          />
          <label htmlFor="toggle">
            {isMatchaMatcha ? 'matcha matcha 🍵' : 'matchy matchy 👯‍♀️'}
          </label>
          {/* TODO: confirm correct logic for label here. */}
          {/* TODO: smoother animation for transition between titles */}
        </nav>
        <div className='cards'>
          {cards.map((card) => (
            <div key={card.id} className='cardcontainer'>
              <div 
                className={`thecard ${card.isFlipped ? 'isflipped' : ''}`}
                onClick={() => handleClick(card.id, card.emoji)}
              >
                <div className='cardback'></div>
                <div className='cardface'>
                  <h1>{card.emoji}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='counters'>
          {/* TODO: Consider what is appropriate semantic HTML for counters: */}
          <button id='turns'>
            {turns} turns
          </button>
          <button id='matches'>
            {matches} matches
          </button>
          <button id='reset-game' onClick={() => triggerModal(`Turns: ${turns} \n Matches: ${matches}`)}>
            Start over
          </button>
        </div>
      </div>
    </>
  )
}

export default App
