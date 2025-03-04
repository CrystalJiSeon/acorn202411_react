
//이미지를 import 해서 logo 라는 변수에 담기 
import logo from './logo.svg'
//css import 하기
import './custom.css'
import './App.css'

function App() {
  //react 에서는 inline css 를 object 로 작성한다. 
  const logoStyle={
    width:"100px",
    height:"100px"
  }

  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
      <img src={logo} alt="" style={logoStyle}/>
    </div>
  );
}

export default App;
