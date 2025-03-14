import { useOutlet } from "react-router-dom";
//bootstrap css 로딩하기 
import 'bootstrap/dist/css/bootstrap.css'
import BsNavBar from "./components/BsNavBar";
import LoginModal from "./components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { decodeToken } from "jsontokens";
import axios from "axios";

function App(){

    const currentOutlet=useOutlet();
    //로그인 모달의 상태값을 redux store 로 부터 얻어낸다.
    const loginModal= useSelector(state=>state.loginModal);
    const dispatch = useDispatch();

    //App component 가 활성화 되는 시점에 token 관련 처리
    useEffect(()=>{
        const token=localStorage.token;
        console.log(token);
        //만일 토큰이 존재한다면
        if(token){
            axios.get("/ping", {
                headers:{Authorization:token}
            })
            .then(res=>{
                //axios 의 요청해더에 자동으로 토큰이 포함되도록한다.
                axios.defaults.headers.common["Authorization"]=token;
                //여기가 실행되면 사용가능한 token 이라는 의미이다 
                //토큰을 디코딩해서 userName 을 얻어온다. 
                const decoded=decodeToken(token.substring(7));
                //발행할 action
                const action={type:"USER_INFO", payload:{
                    userName:decoded.payload.sub,
                    role:decoded.payload.role
                }};
                //액션 발행하기
                dispatch(action);
            })
            .catch(error=>{
                delete localStorage.token;
            })
        }
    }, []);

    return (
        <>
            <BsNavBar/>
            <div className="container" style={{marginTop:"60px"}}>
                <div>{currentOutlet}</div>
            </div>
            <LoginModal show={loginModal.show}/>
        </>
        
    )
}

export default App;