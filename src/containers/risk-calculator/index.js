import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import Question from './question';

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

	useEffect(() => {}, [ score ]);

	return (
		<React.Fragment>
			<div>risk calculator</div>
		</React.Fragment>
	);
};
