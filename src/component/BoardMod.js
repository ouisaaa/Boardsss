import { useEffect,useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 


import { dataDomain } from "./common";

import styles from '../public/css/Register.module.css'


export default function BoardsMod() {
    const [board, modBoard]= useState({
        "board_no": 0,
        "mem_id": "",
        "title": "",
        "text": "",
        "count": "",
        "reg_dtm": "",
        "mod_dtm":""
    })
    
    //수정 할 데이터 받아오기
    const {board_no}=useParams();
    
    useEffect( ()=>  {  
        //  `${dataDomain}/Boards` 로 비동기 요청  
        fetch(`${dataDomain}/board?board_no=${board_no}`)  // JSON-Server 에게 boards data 요청
	        .then( res => { return res.json() } ) 
	        .then( data => { 
                console.log(data);
                modBoard( data[0] ); 
            } 
        ); 
    }, [board_no]) ;  // 처음 한번만 실행 됨    

    


    const navigate = useNavigate();

    const title_Ref= useRef(0);
    const mem_id_Ref = useRef(0);
    const text_Ref = useRef(0);

    function updateBoard(event){
        event.preventDefault();
        board.title = title_Ref.current.value;
        board.mem_id = mem_id_Ref.current.value;
        board.text = text_Ref.current.value;
        board.count = 1;
        console.log(board);
        
        fetch(`${dataDomain}/boards?board_no=${board_no}&mem_id=${board.mem_id}&title=${board.title}&text=${board.text}`,
        { 
                method : "Put" ,   // 갱신을 위해 Put Method 로 요청 
                headers : {
                'Content-Type' : "application/json",
                },
                body : JSON.stringify(board) 

        }).then( res => {
            if (res.ok ){
                alert(   "수정"); 
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
                        <form onSubmit={updateBoard}>
                            <div>
                                <h3>제목</h3>
                                <input type="text" ref={title_Ref} value={board.title} onChange={(e) => modBoard({ ...board, title: e.target.value })} />
                            </div>
                            <div>
                                <h3>작성자</h3>
                                <input type="text" ref={mem_id_Ref} value={board.mem_id} onChange={(e) => modBoard({ ...board, mem_id: e.target.value })}/>
                            </div>
                            <div>
                                <h3>내용</h3>
                                <textarea ref={text_Ref} value={board.text} onChange={(e) => modBoard({ ...board, text: e.target.value })} />
                            </div>
                            <div>
                                <input type="button" value="등록" onClick={updateBoard}/>
                            </div>
                        </form>
                    </div>
                </div>
        </>
     );
}