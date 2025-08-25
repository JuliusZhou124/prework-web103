import './App.css'
import { useRoutes, BrowserRouter } from "react-router-dom";
import Layout from './pages/Layout.jsx';
import Feed from './pages/ShowCreators.jsx';
import AddCreator from './pages/AddCreator.jsx';
import EditCreator from './pages/EditCreator.jsx';
import ViewCreator from './pages/ViewCreator.jsx';

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Feed /> },
        { path: "create", element: <AddCreator /> },
        { path: "update/:id", element: <EditCreator /> },
        { path: "detail/:id", element: <ViewCreator /> },
      ],
    },
  ]);

  return routes;
}

function App() {

  return (
    <BrowserRouter> 
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
