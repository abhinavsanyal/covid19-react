import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import Question from './question';
import './index.scss';


const totalMax = 15;
const riskMark = 4;
const mockQuestionData = [
    {
    id:1,question:"1. Do you have fever ?",weight:5},
    {
    id:2,question:"2. Did you visited other countries recently?",weight:5},
    {
    id:3,question:"3. Did you visited other countries recently?",weight:1},
    {
    id:4,question:"4. Do you feel any kind of pain in your body?",weight:1},
    {
    id:5,question:"5. Do you feel headache ?",weight:1},
    {
    id:6,question:"6. Do you have fever ?",weight:1},
    {
    id:7,question:"7. Do you have fever ?",weight:1},
    {
    id:8,question:"8. Do you have fever ?",weight:1},
    {
	id:9,question:"9. Do you have fever ?",weight:1},
	{
	id:10,question:"10.Last question  ?",weight:1},
]

// End the Test if the first twop questions are answered Yes ====> The patient needs to get tested

// answers can be yes no and maybe

export default (props) => {
	const [ questions, setQuestions ] = useState(mockQuestionData);
	const [ questionIndex, setQuestionIndex ] = useState(0);
	const [ score, setScore ] = useState(0);
	const [ endTest, setEndTest ] = useState(false);
	const [answerList, setAnswerList] = useState([]);
	const [noOfQuestToAsk, setNoOfQuestAsked] = useState(questions.length);

	const onTestEnd = () => {
		// set endTest
		// call setScore Action to store the user score in redux
	};

	const scoreVerify = () => {
		// Logic to verify whether the score is already above the risk mark
		// return true or false
	};
	const handleAnser = (answer) => {
		const newItems = [...answerList];
		newItems[questionIndex] = answer;
		setAnswerList(newItems);
	};

	const answeredFirstTwoQuest = () => {
		if (answerList[0] === 1 && answerList[1] === 1) {
			return  true;
		} else {
			return false;
		}
	}
	const renderQuestion = () => {
	    return	<Question questn={questions[questionIndex]} onAnswer={handleAnser} />;
	};

	const nextQuestion = () => {
		//set
		var newIndex = questionIndex + 1;
		newIndex < noOfQuestToAsk ? setQuestionIndex(newIndex) : submit();
	};
	const prevQuestion = () => {
		var newIndex = questionIndex - 1;
		newIndex >= 0 ? setQuestionIndex(newIndex) : setQuestionIndex(0);
	};

	const submit = () => {
		var i = 0;
		var totScore = 0;
		if(answeredFirstTwoQuest()) {
			for (i = 0; i< noOfQuestToAsk; i++) {
				if (answerList[i] === 1) {
					totScore = totScore +  questions[questionIndex].weight;
				}
			}
		} else {
			answerList.forEach(answer => {
				if (answer === 1) {
					totScore = totScore + questions[questionIndex].weight;
				}
			});
		}
		setScore(totScore);
		alert("Total Score:-> " + totScore);
	}

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
		[ questionIndex ]
	);

	useEffect(
		() => {
			//API call karna bhai yaha pe METHOD: POST , uri:  '/api/test-results?id= <userId>
			// If API succeeds the history.push('/patient/home')
			answeredFirstTwoQuest()? (setNoOfQuestAsked(7)) : (setNoOfQuestAsked(questions.length));
			console.log("updated",noOfQuestToAsk, answerList);
		},
		[ answerList ]
	);

	useEffect(() => {
        // call scoreVerify to make sure that he hasnt already crossed the risk mark 
    }, [ score ]);

	return (
		<React.Fragment>
			<div className="flex-container">
				<div className="question-numbers"> 
					{questions.map((quest, index)=>{
						return <div className={questionIndex === index ? 'current-quest-number':'quest-number'}>{index+1}</div>
					})}
				</div> 
				<div className="question-container">
						{renderQuestion()}
				</div>
				<div className="prev-next">
					<div onClick={()=>{prevQuestion()}}>Prev</div>
					<div onClick={()=>{nextQuestion()}}>{questionIndex === (noOfQuestToAsk-1) ? "Submit" : "Next"  }</div>
				</div>
			</div>
		</React.Fragment>
	);
};
