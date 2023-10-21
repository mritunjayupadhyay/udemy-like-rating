import './App.css'
import ReviewForm from './components/review-form/review-form'
import Review from './components/review/review'

function App() {

  return (
    <div className='p-5'>
      <Review />
      <ReviewForm />
    </div>
  )
}

export default App
