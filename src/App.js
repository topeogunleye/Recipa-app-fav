import './App.css';
import { Store } from './components/Store';
import { StoreProvider } from './components/useFetchMealDbApi';
import Home from './pages/Home';
import { DarkModeProvider } from './contexts/DarkModeProvider';
import AuthContextProvider from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MealInfo from './components/mealinfo/MealInfo';
import Categories from './pages/Categories';
import CategoryInfo from './pages/CategoryInfo';
import RandomMeal from './pages/RandomMeal';
import NewMealForm from './pages/newmealform/NewMealForm';
import Loginsignup from './pages/loginsignup/Loginsignup';

function App() {
  return (
    <Router>
      <StoreProvider>
        <DarkModeProvider>
          <AuthContextProvider>
            <div className="App">
              <Home />
            </div>
          </AuthContextProvider>
        </DarkModeProvider>
      </StoreProvider>
    </Router>
  );
}

export default App;
