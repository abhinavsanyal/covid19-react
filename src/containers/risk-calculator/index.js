import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import Question from './question';

const totalMax = 15;
const riskMark = 4;
const mockQuestionData = [
    {
    id:1,question:"1",weight:5,},
    {
    id:2,question:"2",weight:5},
    {
    id:3,question:"3",weight:1},
    {
    id:4,question:"4",weight:1},
    {
    id:5,question:"5",weight:1},
    {
    id:6,question:"6",weight:1},
    {
    id:7,question:"7",weight:1},
    {
    id:8,question:"8",weight:1},
    {
    id:9,question:"9",weight:1},
]

// End the Test if the first twop questions are answered Yes ====> The patient needs to get tested

// answers can be yes no and maybe

export default (props) => {
	const [ questions, setQuestions ] = useState([]);
	const [ questionIndex, setQuestionIndex ] = useState({});
	const [ score, setScore ] = useState(0);
	const [ endTest, setEndTest ] = useState(false);

	const onTestEnd = () => {
		// set endTest
		// call setScore Action to store the user score in redux
	};

	const scoreVerify = () => {
		// Logic to verify whether the score is already above the risk mark
		// return true or false
	};
	const handleAnser = () => {
		// set the score based on the Answer by setScore
	};
	const renderQuestion = () => {
	    return	<Question question={questions[questionIndex]} onAnswer={handleAnser} />;
	};

	const nextQuestion = () => {
		//set
	};
	const prevQuestion = () => {};

	useEffect(
		() => {
			//API call karna bhai yaha pe METHOD: POST , uri:  '/api/test-results?id= <userId>
			// If API succeeds the history.push('/patient/home')
		},
		[ endTest ]
	);
	useEffect(
		() => {
			//API call karna bhai yaha pe METHOD: POST , uri:  '/api/test-results?id= <userId>
			// If API succeeds the history.push('/patient/home')
		},
		[ endTest ]
	);

	useEffect(() => {
        // call scoreVerify to make sure that he hasnt already crossed the risk mark 
    }, [ score ]);

	return (
		<React.Fragment>
			<div>risk calculator</div>
		</React.Fragment>
	);
};
