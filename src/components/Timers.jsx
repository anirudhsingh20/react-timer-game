import { useRef, useState } from "react";
import Timer from "./Timer";
import Modal from "./Modal";

function Timers() {
    const modalRef = useRef();
    const [result, setResult] = useState({
        result: '',
        score: 0
    });

    function handleTimerEnd(score) {
        setResult((prevScore) => {
            return {
                ...prevScore,
                score,
                result: getScoreMessage(score),
            }
        });
        modalRef.current.open();
    }

    function getScoreMessage(score) {
        if (score > 90) {
            return 'Excellent'
        } else if (score > 70) {
            return 'Well Played'
        } else if (score > 50) {
            return 'Nice Try'
        } else if (score > 30) {
            return 'You can score better'
        } else {
            return 'You Lost'
        }
    }

    const modalContent = (
        <>
            <h1>{result.result}</h1>
            <h2 className="score-text">Your Score: {result.score}</h2>
        </>
    )



    return (
        <>
            <div className="timers-div">
                <Timer time={1} onTimerEnd={handleTimerEnd}>Beginner</Timer>
                <Timer time={3} onTimerEnd={handleTimerEnd}>Amateur</Timer>
                <Timer time={5} onTimerEnd={handleTimerEnd}>Pro</Timer>
                <Timer time={10} onTimerEnd={handleTimerEnd}>Master</Timer>
            </div>
            <Modal ref={modalRef} buttonText={'Close'}>{modalContent}</Modal>
        </>
    );
}

export default Timers;
