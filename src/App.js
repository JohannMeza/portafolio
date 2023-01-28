import { BrowserRouter as Router } from 'react-router-dom'
import IndexRoute from './routers/IndexRoute';
import AuthContextProvider from './context/AuthContext';
import LoaderContextProvider from './context/LoaderContext';
import { TooltipProvider } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function App() {
  return (
    <TooltipProvider>
      <LoaderContextProvider>
        <AuthContextProvider>
          <Router>
            <IndexRoute />
          </Router>
        </AuthContextProvider>
      </LoaderContextProvider>
    </TooltipProvider>
  );
}

export default App;
