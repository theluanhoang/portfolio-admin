import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes'
import { DefaultLayout } from './components/Layout'

import 'aos/dist/aos.css';

function App() {

  return (
    <Router>
      <div className={``}>
        <Routes>
          {
            publicRoutes.map((route, index) => {
              const Layout = DefaultLayout;
              const Page = route.component
              return <Route key={index} path={route.path} element={
                // <Layout>
                <Page />
                // </Layout>
              } />
            })
          }
        </Routes>
      </div>
    </Router>
  )
}

export default App
