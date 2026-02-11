import "./App.css";
import { useState } from "react";

type RatingState =
  | { phase: "rating"; selected: number | null }
  | { phase: "thanks"; selected: number };

type RatingAction =
  | { type: "select"; rating: number }
  | { type: "submit" };

const initialState: RatingState = { phase: "rating", selected: null };

function transition(state: RatingState, action: RatingAction): RatingState {
  switch (state.phase) {
    case "rating": {
      switch (action.type) {
        case "select":
          return { ...state, selected: action.rating };
        case "submit":
          return state.selected !== null
            ? { phase: "thanks", selected: state.selected }
            : state;
      }
    }
    case "thanks":
      return state;
  }
}

function App() {
  const [state, setState] = useState<RatingState>(initialState);

  function dispatch(action: RatingAction) {
    setState(prev => transition(prev, action));
  }

  return <div className="App h-screen flex items-center justify-center width-full">
    {state.phase === "rating" ?
      <div className="card p-8 rounded-4xl">
        <img src="/images/icon-star.svg" alt="Star" className="icon-star mb-4 p-4 rounded-full" />
        <h1 className="text-2xl font-bold text-white mb-4">How did we do?</h1>
        <p className="text-sm mb-4">Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
        <div className="ratings">
          <fieldset role="radiogroup">
            <legend className="sr-only">Rating</legend>
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                className={state.selected === rating ? "selected" : ""}
                onClick={() => dispatch({ type: "select", rating })}
                aria-pressed={state.selected === rating}
                type="button"
              >
                {rating}
              </button>
            ))}
          </fieldset>
        </div>
        <button
          className="submit rounded-full bg-orange-500 text-white px-6 py-2 mt-4 disabled:opacity-50"
          onClick={() => dispatch({ type: "submit" })}
          type="button"
          disabled={state.selected === null}
        >
          Submit
        </button>
      </div>
      :
      <div className="card">
        <img src="/images/illustration-thank-you.svg" alt="Thank you" />
        <p>You selected {state.selected} out of 5</p>
        <h1>Thank you!</h1>
        <p>We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!</p>
      </div>}
  </div>;
}

export default App;
