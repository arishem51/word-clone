import React, { useEffect, useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

const ROWS = new Array(5).fill("_");
const COLUMNS = new Array(5).fill("_");

function Game() {
  const [state, setState] = useState("");
  const [results, setResults] = useState([]);
  const [winner, setWinner] = useState(false);
  const [answer, setAnswer] = useState(() => sample(WORDS));

  function restartGame() {
    setState("");
    setAnswer(sample(WORDS));
    setWinner(false);
    setResults([]);
  }

  return (
    <div>
      <div className="guess-results">
        {ROWS.map((_, rowIndex) => {
          const guessResult = checkGuess(results[rowIndex], answer);
          return (
            <p className="guess" key={rowIndex}>
              {COLUMNS.map((col, colIndex) => {
                return (
                  <span
                    className={`cell ${guessResult?.[colIndex]?.status}`}
                    key={colIndex}
                  >
                    {results?.[rowIndex]?.[colIndex]}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>
      <form
        className="guess-input-wrapper"
        onSubmit={(e) => {
          e.preventDefault();
          if (winner || (!winner && results >= 5)) {
            return;
          }
          if (state.length === 5) {
            if (state === answer) {
              setWinner(true);
            }
            setResults([...results, state]);
            setState("");
          }
        }}
      >
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          value={state}
          onChange={(e) => setState(e.target.value.toUpperCase())}
          id="guess-input"
          type="text"
        />
      </form>
      {winner || (!winner && results.length === 5) ? (
        <button onClick={restartGame}>
          <h1>Restart</h1>
        </button>
      ) : null}
      {winner ? (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{results.length} guesses</strong>.
          </p>
        </div>
      ) : (
        results.length >= 5 && (
          <div className="sad banner">
            <p>
              Sorry, the correct answer is <strong>{answer}</strong>.
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default Game;
