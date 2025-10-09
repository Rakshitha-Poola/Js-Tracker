import LandingPage from "./components/LandingPage"
import { Route, Routes } from "react-router-dom"
import Questions from "./components/Questions"
import Progress from "./components/Progress"
import TopicDetail from "./components/TopicDetails"
import LoginPage from "./components/Login"
import Bookmarks from "./components/Bookmarks"
import Register from "./components/register"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/" element={
          <ProtectedRoute>
             <LandingPage/>
          </ProtectedRoute>
         }></Route>
        <Route path="/questions" element={
          <ProtectedRoute>
            <Questions/>
          </ProtectedRoute>
          }></Route>
        <Route path="/progress" element={
          <ProtectedRoute>
            <Progress/>
          </ProtectedRoute>
          }></Route>
        <Route path="/get-topic/:topicName" element={
          <ProtectedRoute>
             <TopicDetail/>
          </ProtectedRoute>
         }></Route>
        <Route path="/bookmarks" element={
          <ProtectedRoute>
             <Bookmarks />
          </ProtectedRoute>
         }></Route>
      </Routes> 
    </div>
  )
}

export default App
