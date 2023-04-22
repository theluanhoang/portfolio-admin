import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes'

import 'aos/dist/aos.css';
import Layout from './components/Layouts';

function App() {

  return (
    <Router>
      <div className={``}>
        <Routes>
          {
            publicRoutes.map((route, index) => {
              const Layouts = Layout;
              const Page = route.component
              return <Route key={index} path={route.path} element={
                <Layouts>
                  <Page />
                </Layouts>
              } />
            })
          }
        </Routes>
      </div>
    </Router>
  )
}

export default App
