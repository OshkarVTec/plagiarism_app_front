import {useRoutes} from 'react-router-dom';
import { routes } from './router/routes';
import MainLayout from './layouts/MainLayout';
import './App.css'

function App() {
const content = useRoutes(routes)
  return (
    <MainLayout>
      {content}
    </MainLayout>
  );
}

export default App;
