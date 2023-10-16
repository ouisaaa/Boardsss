import { useEffect, useRef, useState } from "react"; 
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { dataDomain } from "./common";
import { useNavigate } from "react-router-dom";

import styles from '../public/css/Register.module.css'


export default function BoardsDetail() {
    const [detail, setDetail] = useState({
        "board_no": 0,
        "mem_id": "",
        "title": "",
        "text": "",
        "count": "",
        "reg_dtm": "",
        "mod_dtm":""
    }); 
    const [reply, setReply] = useState([]);
    const [newReply, setNewReply] = useState({
        "board_no":0,
        "seq" : 0,
        "mem_id":"",
        "reply":"",
        "reg_dtm":""
    });
    const [maxreply_no, setMax]= useState(0);

    const navigate = useNavigate();
    const {board_no}=useParams();

    //글 상세보기, 댓글 상세보기
    var maxReply_no=0;
     useEffect( ()=>  {  
        //  `${dataDomain}/Boards` 로 비동기 요청  
        fetch(`${dataDomain}/board?board_no=${board_no}`)  // JSON-Server 에게 boards data 요청
	        .then( res => { return res.json() } ) 
	        .then( data => { 
                console.log(data);
                //setDetail( data[0] ); //nodeJs
                setDetail( data ); //springboot
            } 
        ); 
        fetch(`${dataDomain}/replies?board_no=${board_no}`)  // JSON-Server 에게 replies data 요청
	        .then( res => { return res.json() } ) 
	        .then( data => { 
                for(let i=0;i<data.length;i++){
                    if(data[i].seq>maxReply_no){
                       maxReply_no=data[i].seq;
                       setMax(data[i].seq);
                    }
                }
                
                console.log(data);
                setReply( data ); 
            } 
        ); 
        
    }, [board_no]) ;  // 처음 한번만 실행 됨    

    const mem_id_Ref = useRef(0);
    const reply_Ref = useRef(0);

    //댓글 등록
    function registerReply(event){
        event.preventDefault();
        newReply.board_no=board_no;
        newReply.seq=maxreply_no+1;
        newReply.mem_id = mem_id_Ref.current.value;
        newReply.reply = reply_Ref.current.value;
        console.log(newReply);
       
        fetch(`${dataDomain}/replies?board_no=${board_no}&mem_id=${newReply.mem_id}&reply=${newReply.reply}`,
        { 
                method : "Post" ,  
                headers : {
                    'Content-Type' : "application/json",
                },
                body : JSON.stringify(newReply) 

        }).then( res => {
            if (res.ok ){
                alert("등록"); 
                window.location.reload();
            }
        }
        );
    }
    //게시물삭제
    function deleteBoard(bn){
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            fetch(`${dataDomain}/boards?board_no=${bn}`, 
            { 
                method : "Delete" ,    //DELETE Method로 삭제 요청 
                headers : {
                'Content-Type' : "application/json",
                },   
            }
        ).then( () =>   // 삭제 완료 후, 
            {  navigate('/');  }  //홈으로 가기 
        )
      }
    }

    //댓글 삭제
    function deleteReply(seq){
        console.log(board_no)
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            fetch(`${dataDomain}/replies?seq=${seq}`, 
                { 
                    method : "Delete" ,    //DELETE Method로 삭제 요청 
                    headers : {
                    'Content-Type' : "application/json",
                    },   
                }
            ).then( () =>   // 삭제 완료 후, 
                {  
                    window.location.reload();  
                }  
            )
      }
    }

    // 뒤로 가기 함수
    const goBack = () => {
        navigate(-1); // 뒤로 가기 기능은 navigate 함수를 사용하여 처리합니다.
    };
    return (
        <>
        <div className={styles.header}>                    
            <h1>게시물</h1>
            <hr></hr>
        </div>
        {/* 게시물 상세 */}
        <div className={styles.container} key={detail.board_no}>
            <div className={styles.box}>
            <div>
                <h3>{detail.title}</h3>
            </div>
            <span>
                <ul>
                    <li>글번호: {detail.board_no}</li>
                    <li>작성자: {detail.mem_id}</li>
                    <li>등록 날짜: {detail.reg_dtm}</li>
                    <li>수정 날짜: {detail.mod_dtm}</li>
                    <li>count: {detail.count}</li>
                </ul>
            </span>
            <div>
                <p>{detail.text}</p>
            </div>
            <div className={styles.option}>
                <Link to={"/modBoards/"+detail.board_no}><input type="button"className={styles.btn} value="수정" /></Link>
                <input type="button" className={styles.btn} onClick={()=>deleteBoard(detail.board_no)} value="삭제" /> 
                <input type="button" value="뒤로가기" className={styles.btn} onClick={goBack} />
            </div>
            </div>
        </div>
        <hr></hr>
        {/* 댓글 */}
        {
            reply.map((reply,index)=>(
            <div className={styles.container} key={reply.seq}>
                <div className={styles.box}>
                    <h4>댓글</h4>
                <span>
                    <ul>
                        <li>작성자: {reply.mem_id}</li>
                        <li>등록 날짜: {reply.reg_dtm}</li>
                        <li>댓글 번호: {reply.seq}</li>
                    </ul>
                </span>
                <div>
                    <p>{reply.reply}</p>
                </div>
                <div className={styles.option}>
                    <input type="button" className={styles.btn} onClick={()=>deleteReply(reply.seq)} value="삭제" />
                </div>
                </div>
            </div>
            ))
        }
        <div>
            <hr></hr>
            <div className={styles.container}>
                <form onSubmit={registerReply} className={styles.box}>
                        <div>
                            <h3>작성자</h3>
                            <input type="text"className={styles.text} ref={mem_id_Ref}/>
                        </div>
                        <div>
                            <h3>댓글 내용</h3>
                            <textarea ref={reply_Ref} className={styles.reply}></textarea>
                        </div>
                        <div className={styles.option}>
                            <input type="button"  className={styles.btn } onClick={registerReply} value={"댓글 등록"}/>
                        </div>
                </form>
            </div>
        </div>
</>
     );
}