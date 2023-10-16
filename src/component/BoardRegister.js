
import { useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 


import { dataDomain } from "./common";

import styles from '../public/css/Register.module.css'


export default function BoardsRegister() {
    const [board, newBoard]= useState({
        "board_no": 0,
        "mem_id": "",
        "title": "",
        "text": "",
        "count": "",
        "reg_dtm": "",
        "mod_dtm":""
    })

    const navigate = useNavigate();

    const {maxBoard_no}=useParams();
    const title_Ref= useRef(0);
    const mem_id_Ref = useRef(0);
    const text_Ref = useRef(0);

    
    function updateBoard(event){
        event.preventDefault();
        board.title = title_Ref.current.value;
        board.mem_id = mem_id_Ref.current.value;
        board.text = text_Ref.current.value;
        console.log(board);
        
        fetch(`${dataDomain}/boards?mem_id=${board.mem_id}&title=${board.title}&text=${board.text}`,
        { 
                method : "Post" ,   
                headers : {
                'Content-Type' : "application/json",
                },
                body : JSON.stringify(board) 

        }).then( res => {
            if (res.ok ){
                alert(   "등록"); 
                navigate('/');
            }
        }
        )
    }

    return (
        <>
                <div className={styles.header}>                    
                    <h1>게시물 등록</h1>
                    <hr></hr>
                </div>
                <div className={styles.container}>
                    <div className={styles.box}>
                            <div>
                                <h3>제목</h3>
                                <input type="text" ref={title_Ref} />
                            </div>
                            <div>
                                <h3>작성자</h3>
                                <input type="text" ref={mem_id_Ref}/>
                            </div>
                            <div>
                                <h3>내용</h3>
                                <textarea ref={text_Ref} />
                            </div>
                            <div>
                                <input type="button" value="등록" onClick={updateBoard}/>
                            </div>
                    </div>
                </div>
        </>
     );
}