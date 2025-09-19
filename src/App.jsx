import LandingPage from "./components/LandingPage"
import { Route, Routes } from "react-router-dom"
import Questions from "./components/Questions"
import Progress from "./components/Progress"
import TopicDetail from "./components/TopicDetails"
import Bookmarks from "./components/Bookmarks"
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/questions" element={<Questions/>}></Route>
        <Route path="/progress" element={<Progress/>}></Route>
        <Route path="/topic/:topicName" element={<TopicDetail/>}></Route>
        <Route path="/bookmarks" element={<Bookmarks />}></Route>
      </Routes> 
    </div>
  )
}

export default App
