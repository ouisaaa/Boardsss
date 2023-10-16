
import './App.css';
import BoardsList from './component/BoardList';

import {HashRouter,Route,Routes} from 'react-router-dom';
import BoardsRegister from './component/BoardRegister';
import BoardsDetail from './component/BoardDetail';
import BoardsMod from './component/BoardMod';
function App() {
  return (
    <HashRouter>
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<BoardsList/>}>
          </Route> 
         <Route path="/reg/:maxBoard_no" element={<BoardsRegister/>}>
          </Route> 
          <Route path="/board/:board_no" element={<BoardsDetail/>}>
          </Route>
          <Route path="/modBoards/:board_no" element={<BoardsMod/>}>
          </Route>
        </Routes>
      </div>
    </div>
    </HashRouter>
  );
}

export default App;
