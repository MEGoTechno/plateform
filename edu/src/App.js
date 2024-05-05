import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from './pages/Layout';
import { ThemeProvider, CssBaseline } from "@mui/material"
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { themeSettings } from './styles/theme';

import HomePage from './pages/HomePage';
import NotFound from './components/tools/NotFound';

// lectures
import LecturesPage from './pages/client/LecturesPage';
import LessonLectures from './components/content/LessonLectures';
import VidPage from './components/content/vid/VidPage';

import CreateLecture from './components/content/manage/actions/CreateLecture';
import EditLecture from './components/content/manage/actions/EditLecture';
import ManageLecturesPage from './pages/admin/ManageLecturesPage'
import EditName from './components/content/manage/actions/EditName';
import ManageLessons from './components/content/manage/ManageLessons';

// exams
import ManageExamsPage from './pages/admin/ManageExamsPage';
import ManageLessonsExams from './components/exams/manage/ManageLessonsExams';
import EditLesson from './components/exams/manage/actions/EditLesson';
import CreateExam from './components/exams/manage/actions/CreateExam';
import EditExam from './components/exams/manage/actions/EditExam';

import MessagesPage from './pages/client/MessagesPage';
import ManageMessagesPage from './pages/admin/ManageMessagesPage';
import CreateMessage from './components/messages/actions/CreateMessage';

import UpdateUserProfile from './components/user/actions/UpdateUserProfile';
import ManageGetUserPage from './pages/admin/ManageGetUserPage';
import UsersPage from './pages/admin/UsersPage';
import UserProfile from './pages/client/UserProfilePage';
import LoginPage from './pages/client/LoginPage';

import Test from './test/Test';
import ExamsPage from './pages/client/ExamsPage';
import LessonsExams from './components/exams/LessonExams';
import StartExam from './components/exams/StartExam';

import { useMemo } from 'react';

import ManageGroupsPage from './pages/admin/ManageGroupsPage';
import CreateGroup from './components/groups/actions/CreateGroup';
import CreateGrade from './components/groups/actions/CreateGrade';
import EditGroup from './components/groups/actions/EditGroup';
import AddUserPage from './components/user/actions/AddUserPage';
import PaymentPage from './pages/admin/PaymentPage';
import CreatePayment from './components/payment/actions/CreatePayment';
import EditPayment from './components/payment/actions/EditPayment';
import MessageAnswerPage from './components/messages/actions/AnswerPage';
import UpdateMessage from './components/messages/actions/UpdateMessage';
import ManageStatisticsPage from './pages/admin/ManageStatisticsPage';
import UserStatistics from './components/statistics/UserStatistics';
import UserAttempt from './components/statistics/UserAttempt';
import ExamStatistics from './components/statistics/ExamStatistics';


function App() {
  const mode = useSelector(state => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]) // he used useMemo ???

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/profile' element={<UserProfile />} />
              <Route path='/profile/update' element={<UpdateUserProfile />} />
              <Route path='/users/:id' element={<UserProfile />} />

              <Route path='/messages' element={<MessagesPage />} />
              <Route path='/messages/:id' element={<UpdateMessage />} />
              <Route path='/messages/send' element={<CreateMessage />} />
              <Route path='/management/messages' element={<ManageMessagesPage />} />
              <Route path='/management/messages/:id' element={<MessageAnswerPage />} />


              <Route path='/exams' element={<ExamsPage />} />
              <Route path='/exams/:unitId' element={<LessonsExams />} />
              <Route path='/exams/:unitId/:examId' element={<StartExam />} />

              <Route path='/lectures' element={<LecturesPage />} />
              <Route path='/lectures/:unitId' element={<LessonLectures />} />
              <Route path='/lectures/:unitId/:partId' element={<VidPage />} />


              <Route path='/test' element={<Test />} />
              {/* ++++++ */}
              <Route path='/management/payments' element={<PaymentPage />} />
              <Route path='/management/payments/add' element={<CreatePayment />} />
              {/* <Route path='/management/payments/edit' element={<EditPayment />} /> */}

              <Route path='/management/users' element={<UsersPage />} />
              <Route path='/management/user' element={<ManageGetUserPage />} />
              <Route path='/management/user/add' element={<AddUserPage />} />

              <Route path='/management/years' element={<ManageGroupsPage />} />
              <Route path='/management/years/add' element={<CreateGroup />} />
              <Route path='/management/years/edit' element={<EditGroup />} />
              <Route path='/management/years/add-grade' element={<CreateGrade />} />

              <Route path='/management/exams' element={<ManageExamsPage />} />
              <Route path='/management/exams/add' element={<CreateExam />} />
              <Route path='/management/exams/edit' element={<EditExam />} />
              <Route path='/management/exams/edit-name' element={<EditLesson />} />
              <Route path='/management/exams/:unitId' element={<ManageLessonsExams />} />


              <Route path='/management/lectures' element={<ManageLecturesPage />} />
              <Route path='/management/lectures/add' element={<CreateLecture />} />
              <Route path='/management/lectures/edit' element={<EditLecture />} />
              <Route path='/management/lectures/edit-name' element={<EditName />} />
              <Route path='/management/lectures/:unitId' element={<ManageLessons />} />

              <Route path='/management/statistics' element={<ManageStatisticsPage />} />
              <Route path='/management/statistics/user' element={<UserStatistics />} />
              <Route path='/management/statistics/user/attempt' element={<UserAttempt />} />
              <Route path='/management/statistics/exam' element={<ExamStatistics />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
