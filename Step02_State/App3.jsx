// App3.jsx

import { useState } from "react";

function App(){
    //이 함수는 언제 호출될까?
    console.log("App() 함수 호출됨")
    const [state, setState] = useState({
        name:"김구라",
        addr:"노량진"
    })

    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            <p> 이름은 <strong>{state.name}</strong></p>
            <p> 주소는 <strong>{state.addr}</strong></p>
            이름 입력 <input type="text" onChange={(e)=>{
                setState({
                    ...state, 
                    name:e.target.value
                })
            }} value={state.name}/>
            <br/>
            주소 입력 <input type="text" onChange={(e)=>{
                setState({
                    ...state,
                    addr:e.target.value
                })
            }} value={state.addr}/>
        </div>
    )
}
// 이 파일을 import 하면 App 함수를 사용할수 있다.
export default App;
