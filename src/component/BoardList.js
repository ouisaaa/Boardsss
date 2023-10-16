import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import { dataDomain } from "./common";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import '../public/css/Table.model.css'

export default function BoardsList() {
    const [boards, setBoards] = useState([]); 
    const [maxboard_no, setMax]= useState(0);
    const [delboard_no,setDel] = useState([]);
    
    var maxBoard_no=0;
     useEffect( ()=>  {  
        //  `${dataDomain}/Boards` 로 비동기 요청  
        console.log(`${dataDomain}/boards`);
        fetch(`${dataDomain}/boards`)  // JSON-Server 에게 students data 요청
	        .then( res => { return res.json() } ) 
	        .then( data => {  
                const countBoard=[];
                for(let i=0;i<data.length;i++){
                    countBoard.push(false);
                    setDel(countBoard);

                    if(data[i].board_no>maxBoard_no){
                       maxBoard_no=data[i].board_no;
                       setMax(data[i].board_no);
                    }
                }
                console.log(maxBoard_no);//board_no를 자동으로 저장하기 위해서
            //가장 큰 값을 찾는 코드
                setBoards( data ) 
            } 
        ); 
    }, []) ;  // 처음 한번만 실행 됨    
       
    console.log(delboard_no);
    const navigate = useNavigate();
    const {id} = useParams(); 

    const handleCB = (index) => {
        const updatedStates = [...delboard_no];
        updatedStates[index] = !updatedStates[index];
       // console.log(index);
        setDel(updatedStates);
      };

    function deleteBoard(){
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            delboard_no.forEach((isChecked, index) => {
                if (isChecked) {
                    console.log(`${dataDomain}/boards?board_no=${boards[index].board_no}`);
                  fetch(`${dataDomain}/boards?board_no=${boards[index].board_no}`, 
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
              });
      }
    }
    return (
        <>
        <h1>게시물</h1>
        <table>
            <thead>
                <tr>
                    </tr>
                <tr>
                    <th>글 번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>
                        <div>등록 날짜</div>
                        <div>수정 날짜</div>
                    </th>
                    <th>
                        <div>
                            <Link to={"/reg/"+maxboard_no}><input type='button' className="listButton" value={"등록"}/></Link>
                        </div>
                        <div>
                            <input type="button" onClick={deleteBoard} className="listButton" value={"삭제"}/>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    boards.map((boards, index)=>(
                        <tr key={boards.board_no}>
                            <td>{boards.board_no}</td>
                            <td><Link to={"/board/"+(boards.board_no)} style={{ color: '#73685d' }}>{boards.title}</Link></td>
                            <td>{boards.mem_id}</td>
                            <td>
                                <div>{boards.reg_dtm}</div>
                                <div>{boards.mod_dtm}</div>
                            </td>
                            <td>
                                    {/* <input type="checkbox" onClick={deleteBoard} value={"삭제"}/> */} 
                                    <input type="checkbox" onChange={()=>handleCB(index)}/>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            </table>
        </>
     );
}