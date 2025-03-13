// src/components/Child.jsx

import React from 'react';
import { useSelector } from 'react-redux';

function Child(props) {

    const isLogin = useSelector(state=>state.isLogin);
    const userName = useSelector(state=>state.userName);

    return (
        <div style={{
            height:"100px",
            "background-color":"yellow"
        }}>
            <h2>Child Component 입니다</h2>
            { isLogin ? <p> <strong>{userName}</strong> 님 방가비~</p> : ""}
            { isLogin && <p> <strong>{userName}</strong> 님 방가비~</p>}
        </div>
    );
}

export default Child;