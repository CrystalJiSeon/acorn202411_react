import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Form, ProgressBar } from 'react-bootstrap';
// gemini 가 응답한 markdown 을 해석하기 위한 페키지 설치 및 import
import MarkDown from 'react-markdown';
// CodeMirror 를 사용하기 위해 3개의 페키지를 설치 하고 import 해야 한다 
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
// MarkDown 에  코드 블럭을 prettify 하기 위해 
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; //github 과 동일한 스타일로 코드 디자인이 된다.
//import "highlight.js/styles/atom-one-dark.css"  // dark 테마 스타일 코드 

function Quiz(){
    const quizs = [
        "1부터 10까지 숫자를 콘솔에 출력하는 JavaScript 코드를 작성하세요.",
        "변수 `name`에 본인의 이름을 저장하는 코드를 작성하세요.",
        "`num1`과 `num2` 두 숫자의 합을 구해서 출력하는 코드를 작성하세요.",
        "`for` 문을 사용하여 1부터 5까지의 합을 계산하는 코드를 작성하세요.",
        "`if`문을 사용하여 어떤 숫자가 짝수인지 홀수인지 출력하는 코드를 작성하세요.",
        "객체 `person`을 만들고, 그 안에 `name`, `age` 속성을 추가해 보세요.",
        "배열 `[1, 2, 3, 4, 5]`의 모든 요소를 순회하며 출력하는 코드를 작성하세요.",
        "`function` 키워드를 사용해서 두 수를 곱하는 함수를 작성하세요.",
        "`setTimeout`을 사용해서 3초 후에 'Hello'를 출력하는 코드를 작성하세요.",
        "현재 날짜와 시간을 콘솔에 출력하는 코드를 작성하세요."
      ];
    
    const handleSubmit = ()=>{
        //질문과 입력한 답을 json 으로 전송한다.
        axios.post("/gemini/quiz", {
            quiz:quizs[state.index],
            answer:state.inputCode //state 에 있는 내용을 전송한다 
        })
        .then(res=>{
            // res.data 는 이런 모양의 object 이다 {isCorrect:true or false, comment:"마크다운"}
            console.log(res.data);
            setState({
                ...state,
                ...res.data,
                isAnswered:true
            })
        })
        .catch(error=>console.log(error));
    }

    const [state, setState] = useState({
        index:0, //문제의 index 값 state 로 관리 
        isAnswered:false,
        isCorrect:false,
        inputCode:"" //입력한 code 를 state 로 관리  
    });
    //다시 풀기 버튼을 눌렀을때 실행되는 함수
    const handleRetry = ()=>{
        setState({
            ...state, 
            isAnswered:false
        });
    }
    const handleNext = ()=>{
       //문제의 index 1 증가, isAnswered : false, inputCode:""
       setState({
            ...state,
            index:state.index+1,
            isAnswered:false,
            inputCode:""
       });
    }
    return (
        <>  
            <h1> javascript 문제</h1>
            <ProgressBar now={50} label={"50%"} animated variant='success'/>
            { state.isAnswered ? 
                <div>
                    <h3>체점 결과</h3>
                    { state.isCorrect ?
                        <Alert variant='success' >축하 합니다 정답 입니다</Alert>
                        :
                        <Alert variant='danger' >오답 입니다</Alert>
                    }
                    <MarkDown rehypePlugins={rehypeHighlight}>{state.comment}</MarkDown>
                    <Button onClick={handleRetry} variant='warning' className="me-3"> &larr; 다시 풀기</Button>
                    <Button onClick={handleNext} variant='success'>다음 문제 &rarr;</Button>
                </div>
            :
                <div>
                    <p>
                        <strong>{`${state.index+1}.`}</strong> 
                        <MarkDown rehypePlugins={rehypeHighlight}>{quizs[state.index]}</MarkDown>
                    </p>
                    <CodeMirror style={{fontSize:"20px"}}
                        extensions={[javascript()]}
                        theme={dracula}
                        height='300px'
                        value={state.inputCode}
                        onChange={value => setState({...state, inputCode:value})}/>
            
                    <Button onClick={handleSubmit}>제출</Button>
                </div>
            }
        </>
    )
}

export default Quiz;