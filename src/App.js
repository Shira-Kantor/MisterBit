import { Route, HashRouter as Router,Routes, Switch } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { HomePage } from './pages/HomePage'
import  {ContactPage}  from './pages/ContactPage'
import { StatisticPage } from './pages/StatisticPage'
import { SignupPage } from './pages/SignupPage'
import { ContactDetailsPage } from './pages/ContactDetailsPage';
import { ContactEdit } from './pages/ContactEdit';
import UserPage from './pages/UserPage';
import { About } from './pages/About';
import './assets/scss/global.scss'
// import './App.css';
const Team = () => {
  return (
    <ul>
      <li>Moshe Girit</li>
      <li>Dan Gonzales</li>
      <li>Shimon Dicaprio</li>
    </ul>
  )
}

const Vision = () => {
  return (
    <ol>
      <li>Save the world with our robots</li>
      <li>Take over the world with our robots</li>
    </ol>
  )
}
function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main className="container app">
          <Routes>
            <Route path="/contact/edit/:id?" element={<ContactEdit/>} />
            <Route path="/contact/:id" element={<ContactDetailsPage/>} />
            <Route path="/about" element={<About />} >
              <Route path="/about/team" element={<Team />} />
              <Route path="/about/vision" element={<Vision />} />
            </Route>
            <Route path="/statistic" element={<StatisticPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/user" element={<UserPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/" element={<HomePage/>} />
          </Routes>
        </main>
        <AppFooter></AppFooter>
      </div>
    </Router>
  );
}

export default App;
