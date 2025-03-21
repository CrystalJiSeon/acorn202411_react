import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App2'; // App.js 를 import 해서 App 라는 이름으로 사용하기 
import reportWebVitals from './reportWebVitals';
// legacy_createStore 를 createStore 라는 이름으로 사용하기 (store 를 만들 함수)
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

// redux store 에서 관리될 state 의 초기값
const initState={
  userName:"",
  isLogin:false
};

//reducer 함수
const reducer = (state=initState, action)=>{
  let newState;
  if(action.type === "USER_NAME"){
    newState={
      ...state,
      userName:action.payload //로그인된 userName 이 payload 에 실려올 예정 
    }
  }else if(action.type === "LOGIN_STATUS"){
    newState={
      ...state,
      isLogin:action.payload //로그인 여부가 payload 에 실려올 예정
    }
  }else{
    newState=state;
  }
  return newState;
};

// reducer 함수를 전달하면서 store(저장소) 를 만든다.
const store = createStore(reducer);


// id 가 root 인 div 안을  App.js 에서 리턴해준 component 로 체우기 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
