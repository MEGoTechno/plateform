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
              <Route path='/users' element={<UsersPage />} />
              <Route path='/users/add-user' element={<AddUserPage />} />
              <Route path='/users/:id' element={<UserProfile />} />
              <Route path='/exams' element={<ExamPage />} />
              <Route path='/study' element={<StudyPage />} />
              <Route path='/login' element={<LoginPage />} />
              {/* ++++++ */}
              <Route path='/management/:id' element={<Not />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
