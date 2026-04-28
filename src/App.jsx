import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import SubCategory from './pages/SubCategory'
import SignList from './pages/SignList'
import SignDetail from './pages/SignDetail'
import Quiz from './pages/Quiz'
import CarParts from './pages/CarParts'
import CarPartsList from './pages/CarPartsList'
import CarPartDetail from './pages/CarPartDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/category/:categoryId/sub/:subId" element={<SubCategory />} />
        <Route path="/category/:categoryId/signs" element={<SignList />} />
        <Route path="/category/:categoryId/sub/:subId/signs" element={<SignList />} />
        <Route path="/sign/:signId" element={<SignDetail />} />
        <Route path="/quiz/:categoryId" element={<Quiz />} />
        <Route path="/car-parts" element={<CarParts />} />
        <Route path="/car-parts/:sectionId" element={<CarPartsList />} />
        <Route path="/car-parts/:sectionId/:partId" element={<CarPartDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App