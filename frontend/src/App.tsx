import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import ApplicationList from './pages/ApplicationList';
import ApplicationSingle from './pages/ApplicationSingle';

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ApplicationList />} />
      <Route path="application">
        <Route index path="list" element={<ApplicationList />} />
        <Route path=":id" element={<ApplicationSingle />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
