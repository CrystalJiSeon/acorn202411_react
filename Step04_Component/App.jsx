import { useState } from "react";
import Child from "./components/Child";
import Fortune from "./components/Fortune";
import List from "./components/List";

function App(){
    console.log("오잉?");
    //오늘의 운세를 상태값으로 관리 
    const [fortuneToday, setFortune] = useState("로또에 당첨될꺼에요!");
    //이름 목록을 상태값으로 관리
    const [names, setNames] = useState(["김구라", "해골", "원숭이"]);
    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            <Child/>
            <Child/>
            <Child/>
            {/* data 라는 property 명으로 string type 전달하기 */}
            <Fortune data={"동쪽으로 가면 귀인을 만나요"}/>
            <Fortune data={"서쪽으로 가면 조장님을 만나요"}/>
            <button onClick={()=>{
                setFortune("남쪽으로 가면 누군가를 만나요");
            }}>운세 변경</button>
            <Fortune data={fortuneToday}/>
            <List names={names} onDelete={(idx)=>{
                //alert("함수가 호출되네?");
                // idx 는 삭제할 item 의 인덱스가 들어 있다
                // names 배열에서 idx 인덱스를 삭제한 새로운 배열을 얻어내서 
                const newArr = names.filter((item,index) => index !== idx); 
                //새로운 배열로 상태값을 변경한다 
                setNames(newArr);
            }}/>
        </div>
    )
}

export default App;