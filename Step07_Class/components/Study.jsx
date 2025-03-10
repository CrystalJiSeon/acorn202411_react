
/*
    특정 component 에만 적용될 외부 css 파일을 만들때는  xxx.module.css 형태로 만들어야한다
    import 된 myCss 는 object 이다
    - objcect 의 구조
    {클래스명:"변형된 클래스명", ... }
*/
import myCss from './css/study.module.css'

function Study(props) {
    //myCss 는 object 이다
    console.log(myCss);

    return (
        <div>
            <h2 className={myCss["my-color"]}>Study 페이지입니다</h2>
            <p className={myCss["my-color"] + " " + myCss["bg-yellow"]}>p1</p>
            <p className={`${myCss["my-color"]}  ${myCss["bg-yellow"]}`}>p2</p>
        </div>
    );
}

export default Study;
