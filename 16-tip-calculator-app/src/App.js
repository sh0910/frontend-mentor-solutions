import React from "react";
import { useState } from "react";
import { ReactComponent as SplitterLogo } from "./logo.svg";

export default function App() {
  return (
    <main>
      <Logo />
      <Calculator />
    </main>
  );
}

function Logo() {
  return (
    <h1>
      <SplitterLogo />
    </h1>
  );
}

function Calculator() {
  const [billAmount, setBillAmount] = useState("");
  const [tipAmount, setTipAmount] = useState("");
  const [numPeople, setNumPeople] = useState("");

  const totalTipPerPerson =
    billAmount > 0 && tipAmount && numPeople > 0
      ? Number((billAmount / numPeople) * (tipAmount / 100)).toFixed(2)
      : "";

  const totalBillPerPerson = totalTipPerPerson
    ? Number(billAmount / numPeople + tipAmount).toFixed(2)
    : "";

  function reset() {
    setBillAmount("");
    setTipAmount("");
    setNumPeople("");
  }

  return (
    <div className="container">
      <ContainerLeft
        billAmount={billAmount}
        setBillAmount={setBillAmount}
        tipAmount={tipAmount}
        setTipAmount={setTipAmount}
        numPeople={numPeople}
        setNumPeople={setNumPeople}
      />
      <ContainerRight
        totalTipPerPerson={totalTipPerPerson}
        totalBillPerPerson={totalBillPerPerson}
        reset={reset}
      />
    </div>
  );
}

function ContainerLeft({
  billAmount,
  setBillAmount,
  tipAmount,
  setTipAmount,
  numPeople,
  setNumPeople,
}) {
  const tipOptions = [5, 10, 15, 20, 25];

  const [billInputError, setBillInputError] = useState(false);
  const [numPeopleInputError, setNumPeopleInputError] = useState(false); // // testing. switch back to false

  function handleBillInput(e) {
    setBillAmount(e.target.value);
    // If negative value, render error message and classList
    if (e.target.value <= 0) return setBillInputError(true);

    setBillInputError(false);
  }

  function handleNumPeopleInput(e) {
    setNumPeople(e.target.value);
    if (e.target.value <= 0) return setNumPeopleInputError(true);

    setNumPeopleInputError(false);
  }

  return (
    <div className="container-left">
      <label>
        Bill
        {billInputError && (
          <span className="error-message">Can't be less than $0</span>
        )}
      </label>
      <div>
        <input
          className={billInputError ? "error" : ""}
          type="number"
          placeholder="0"
          value={billAmount}
          onChange={(e) => handleBillInput(e)}
        />

        <span className="abs">$</span>
      </div>

      <label>Selet Tip % </label>
      <div className="tip-options">
        {tipOptions.map((tip) => (
          <button key={tip} onClick={() => setTipAmount(tip)}>
            {tip}%
          </button>
        ))}
        {/* // todo: if user clicks on tip %, custom amount is still 0.*/}
        <input
          type="number"
          placeholder={tipAmount > 0 ? tipAmount : "Custom"}
          onChange={(e) => {
            (e.target.value === "" || e.target.value > 0) &&
              setTipAmount(e.target.value);
          }}
        />
      </div>

      <label className="label-num-people">
        Number of people
        {numPeopleInputError && (
          <span className="error-message">Minimum 1 person</span>
        )}
      </label>

      <div>
        <input
          className={numPeopleInputError ? "error" : ""}
          type="number"
          name=""
          id=""
          placeholder="0"
          value={numPeople}
          onChange={(e) => handleNumPeopleInput(e)}
        />
        <span className="abs">
          <img src="./images/icon-person.svg" alt="person icon" />
        </span>
      </div>
    </div>
  );
}

function ContainerRight({ totalTipPerPerson, totalBillPerPerson, reset }) {
  return (
    <div className="container-right">
      <div>
        <p className="title">
          Tip Amount<span>/ person</span>
        </p>
        <p className="amount">{`$${totalTipPerPerson}`}</p>
      </div>
      <div>
        <p className="title">
          Total<span>/ person</span>
        </p>
        <p className="amount">{`$${totalBillPerPerson}`}</p>
      </div>
      <button className="btn" onClick={reset}>
        reset
      </button>
    </div>
  );
}
