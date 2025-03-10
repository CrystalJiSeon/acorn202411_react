// pages/PostUpdateForm.jsx

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


function PostUpdateForm(props) {

    // 경로 파라미터 /posts/:id/edit 값을 가지고 있는 object 얻어내기 
    // {id:'수정할글번호'} 형식의 object 가 리턴된다. 따라서 수정할 글번호는 params.id 이다
    const params = useParams();

    //수정할 글을 상태값으로 관리한다.
    const [post, setPost] = useState({});

    //참조할 값을 저장해주는 hook   
    let savedPost = useRef(null);  // savedPost 는 object 이고 current 라는 방에 저장된 값이 들어 있다.

    useEffect(()=>{
        //컴포넌트가 활성화 되는 시점에 수정할 회원의 번호를 이용해서 수정할 회원의 정보를 로딩한다
        axios.get(`/v3/posts/${params.id}`)
        .then(res=>{
            setPost(res.data);
            // useRef() 가 리턴한 object 의 current 에 초기 post 를 저장해 둔다.
            savedPost.current = res.data;
        })
        .catch(err=>console.log(err));
    }, [])

    // title or author 입력란에 change 이벤트가 발생했을때 상태값을 변경하도록 한다.
    const handleChange = (e)=>{
        setPost({
            ...post,
            [e.target.name]:e.target.value
        })
    };

    const navigate=useNavigate();

    return (
        <>
            <h1>Post 수정 폼 입니다</h1>
            <Form>
                <Form.Group className="mb-3" controlId="id">
                    <Form.Label>글번호</Form.Label>
                    <Form.Control type="text" value={post.id} readOnly/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" name="title" onChange={handleChange}  value={post.title}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="author">
                    <Form.Label>작성자</Form.Label>
                    <Form.Control type="text" name="author" onChange={handleChange} value={post.author}/>
                </Form.Group>
            </Form>
            <Button variant="success" onClick={()=>{
                axios.put(`/v3/posts/${post.id}`, post)
                .then(res=>{
                    alert(res.data.id+" 번 글을 수정했습니다.");
                    navigate("/posts");
                })
                .catch(err=>console.log(err));
            }}>수정확인</Button>
            <Button variant="warning" onClick={()=>{
                // useRef() 를 이용해서 저장해 두었던 초기 post 로 되돌린다.
                setPost(savedPost.current);
            }}>취소</Button>
            
        </>
    );
}

export default PostUpdateForm;