import { Route, Routes } from 'react-router-dom'

import BookingTypeScreen from '../screens/Client/BookingTypeScreen'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<BookingTypeScreen/>}/>
    </Routes>
  )
}

export default AllRoutes
