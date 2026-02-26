import { useState } from "react";
import StepDestination from "./components/StepDestination";
import StepDates from "./components/StepDates";
import StepBudget from "./components/StepBudget";
import StepInterests from "./components/StepInterests";
import StepReview from "./components/StepReview";
import StepAI from "./components/StepAI";




function App() {

  const [step, setStep] = useState(1);


const [tripData, setTripData] = useState({
  destination: "",
  country: "",
  startDate: "",
  endDate: "",
  duration: 0,
  currency: "INR",
  budget: "",
  style: "",
  interests: []
});





  return (
    <>
      {step === 1 && (
        <StepDestination
          tripData={tripData}
          setTripData={setTripData}
          next={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <StepDates
          tripData={tripData}
          setTripData={setTripData}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}

      {step === 3 && (
  <StepBudget
    tripData={tripData}
    setTripData={setTripData}
    next={() => setStep(4)}
    back={() => setStep(2)}
  />
     )}
     {step === 4 && (
  <StepInterests
    tripData={tripData}
    setTripData={setTripData}
    next={() => setStep(5)}
    back={() => setStep(3)}
  />
     )}
     {step === 5 && (
  <StepReview
    tripData={tripData}
    next={() => setStep(6)}
    back={() => setStep(4)}
  />
     )}
     {step === 6 && (
  <StepAI
    tripData={tripData}
    back={() => setStep(5)}
  />
)}




    </>
  );
}

export default App;
