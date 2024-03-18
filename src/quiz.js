import React, { useEffect, useState } from "react";

function Questions() {
    const [index, updatedIndex] = useState(0);
    const [finalData, setFinalData] = useState(null); // State variable for finalData
    const [totalScore, updatedTotalScore] = useState(0);

    function skipQuestion() {
        updatedIndex(index + 1);
    }
    function updateQuestion(answer) {
        console.log(answer)
        if (answer == finalData.results[index].correct_answer)
            updatedTotalScore(totalScore + 1);
        updatedIndex(index + 1);
    }

    useEffect(() => {
        console.log("useEffect triggered");
        async function fetchData() {
            try {
                let data = await fetch('https://opentdb.com/api.php?amount=10');
                let fetchedData = await data.json();
                setFinalData(fetchedData); // Update finalData state
                console.log(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        if (finalData === null) {
            fetchData(); // Fetch data only if finalData is null
        }
    }, []); // Dependency array includes finalData

    return (
        <>
            <h1>Quiz App</h1>
            {finalData && finalData.results && index < 10 ? (
                <>
                    <p>{finalData.results[index].question}</p>
                    <li>
                        <button onClick={() => updateQuestion(finalData.results[index].correct_answer)}>{finalData.results[index].correct_answer}</button>
                    </li>
                    <li>
                        <button onClick={() => updateQuestion(finalData.results[index].incorrect_answers[0])}>{finalData.results[index].incorrect_answers[0]
                        }</button>
                    </li>
                    {finalData.results[index].incorrect_answers[1] ? (
                        <li>
                            <button onClick={() => updateQuestion(finalData.results[index].incorrect_answers[1])}>
                                {finalData.results[index].incorrect_answers[1]}
                            </button>
                        </li>
                    ) : null}

                    {finalData.results[index].incorrect_answers[2] ? (
                        <li>
                            <button onClick={() => updateQuestion(finalData.results[index].incorrect_answers[1])}>
                                {finalData.results[index].incorrect_answers[2]}
                            </button>
                        </li>
                    ) : null}

                    <br>
                    </br>
                    <button onClick={skipQuestion}>Skip Questions</button>

                </>
            ) : (
                finalData ? (
                    <p>The Total Score is : {totalScore}/10</p>
                ) : null
            )}

        </>
    );
}

export default Questions;
