import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from './pages/Layout';
import { ThemeProvider, CssBaseline } from "@mui/material"
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { themeSettings } from './theme';
import UsersPage from './pages/admin/UsersPage';
import UserProfile from './pages/UserProfile';
import ExamPage from './pages/client/ExamPage';
import StudyPage from './pages/client/StudyPage';
import LoginPage from './pages/client/LoginPage';
import AddUserPage from './pages/admin/AddUserPage';
import HomeProfile from './pages/client/HomeProfile';
import Not from './components/tools/Not';
import NotFound from './components/tools/NotFound';
import ManageYearsPage from './pages/admin/ManageYearsPage';
import StartExam from './components/user/StartExam';
import AddExam from './components/exams/AddExam';
import ManageExamsPage from './pages/admin/ManageExamsPage';
import ManageContentPage from './pages/admin/ManageContentPage';
import ContentPage from './pages/client/ContentPage';
import ShowLessons from './components/content/ShowLessons';
import VidPage from './components/content/vid/VidPage';
import Test from './pages/Test';
import EditName from './components/content/manage/actions/EditName';
import ManageLessons from './components/content/manage/ManageLessons';
import CreateLecture from './components/content/manage/actions/CreateLecture';
import EditLecture from './components/content/manage/actions/EditLecture';
import ManageGetUserPage from './pages/admin/ManageGetUserPage';



function App() {
  const mode = useSelector(state => state.global.mode)
  const theme = createTheme(themeSettings(mode)) // he used useMemo ???
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<HomeProfile />} />
              <Route path='/management/users' element={<UsersPage />} />
              <Route path='/management/user' element={<ManageGetUserPage />} />
              <Route path='/management/user/add-user' element={<AddUserPage />} />
              <Route path='/users/:id' element={<UserProfile />} />
              <Route path='/exams' element={<ExamPage />} />
              <Route path='/content' element={<ContentPage />} />
              <Route path='/content/:unitId' element={<ShowLessons />} />
              <Route path='/exam/:id' element={<StartExam />} />
              <Route path='/study' element={<StudyPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/test' element={<Test />} />
              {/* ++++++ */}
              <Route path='/management/years' element={<ManageYearsPage />} />
              <Route path='/management/exams' element={<ManageExamsPage />} />

              <Route path='/management/content/add-lecture' element={<CreateLecture />} />
              <Route path='/management/content/edit-lecture' element={<EditLecture />} />
              <Route path='/management/content' element={<ManageContentPage />} />
              <Route path='/management/content/edit' element={<EditName />} />
              <Route path='/management/content/unit' element={<ManageLessons />} />
              <Route path='/content/:unitId/:lessonId/:partId' element={<VidPage />} />
              <Route path='/management/exams/add-exam' element={<AddExam />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
