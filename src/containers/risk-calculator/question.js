import React , { useState, useEffect} from 'react';
import './index.scss';


export default props => {
    
     const {questn,onAnswer} = props;
     const [isSelected, setSelected] = useState()
      return (
        <React.Fragment>
        {questn && <div className="question-label">{questn.question}</div> }
         <div className="answer-options">
							<div className={"answer"} onClick={()=>{onAnswer(1)}}>YES</div>
							<div className={"answer"} onClick={()=>{onAnswer(2)}}>No</div>
							<div className={"answer"} onClick={()=>{onAnswer(3)}}>Maybe</div>
						</div>
        </React.Fragment>
      );

}
