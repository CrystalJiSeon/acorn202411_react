// src/components/LoginModal.jsx

import axios from 'axios';
import { decodeToken } from 'jsontokens';
import React, { useState } from 'react';
import { Alert, Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function LoginModal(props) {
    //store 로 부터 loginModal 의 상태값을 읽어온다.
    const loginModal = useSelector(state=>state.loginModal);
    //입력한 내용을 상태값으로 관리
    const [state, setState] = useState({});
    // userName 과 password 를 입력했을때 실행할 함수 
    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    //에러 메세지를 상태값으로 관리
    const [errorMsg, setErrorMsg]=useState(null);
    const dispatch=useDispatch();

    //로그인 버튼을 눌렀을때 실행할 함수
    const handleLogin = ()=>{
        axios.post("/auth", state)
        .then(res=>{
            //axios 의 요청의 헤더에 자동 포함 되도록한다 
            axios.defaults.headers.common["Authorization"]=res.data;
            //토큰을 localStorage 에 저장
            localStorage.token=res.data;
            //토큰을 디코딩해서 userName 을 얻어온다. 
            const decoded=decodeToken(res.data.substring(7));
            console.log(decoded);
            //발행할 action
            const action={type:"USER_INFO", payload:{
                userName:decoded.payload.sub,
                role:decoded.payload.role
            }};
            //액션 발행하기
            dispatch(action);
            //로그인 모달 숨기기
            dispatch({type:"LOGIN_MODAL", payload:{show:false}});
            //에러 메세지 없애기
            setErrorMsg(null);
        })
        .catch(error=>{
            console.log(error);
            //에러 메세지를 상태값으로 넣어준다.
            setErrorMsg(error.response.data);
        });
    }

    return (
        <Modal show={props.show} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{loginModal.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel controlId='userName' label="User Name" className='mb-3'>
                    <Form.Control onChange={handleChange} name="userName" type="text" />
                </FloatingLabel>
                <FloatingLabel controlId='password' label="Password" className='mb-3'>
                    <Form.Control onChange={handleChange} name="password" type="password" />
                </FloatingLabel>
                {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleLogin}>로그인</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;