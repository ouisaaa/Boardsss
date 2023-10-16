import '../public/css/Table.model.css'


export default function Boards(){
    return(
        <>
        <table>
            <thead>
                <tr>
                    <th colSpan={7}>게시물</th>
                </tr>
                <tr>
                    <td>글 번호</td>
                    <td>제목</td>
                    <td>작성자</td>
                    <td rowSpan={2}>
                        <div>등록 날짜</div>
                        <div>수정 날짜</div>
                    </td>
                    <td>상세보기</td>
                    <td>삭제</td>
                    <td><input type='button' value={"등록"}/></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>asdf</td>
                    <td>asdf</td>
                    <td>asdf</td>
                    <td>
                        <div>asdf</div>
                        <div>asdf</div>
                    </td>
                    <td>asdf</td>
                    <td>asdf</td>
                    <td>asdf</td>
                </tr>
                <tr>
                    <td>qwer</td>
                    <td>qwer</td>
                    <td>qwer</td>
                    <td>
                        <div>qwer</div>
                        <div>qwer</div>
                    </td>
                    <td>qwer</td>
                    <td>qwer</td>
                    <td>qwer</td>
                </tr>
                <tr>
                    <td>rtyu</td>
                    <td>rtyu</td>
                    <td>rtyu</td>
                    <td>
                        <div>rtyu</div>
                        <div>rtyu</div>
                    </td>
                    <td>rtyu</td>
                    <td>rtyu</td>
                    <td>rtyu</td>
                </tr>
            </tbody>
            </table>
        </>
    );
}