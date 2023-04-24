import { BrowserRouter as Router } from "react-router-dom";
import { TooltipProvider } from "react-tooltip";
import { Provider as AlertProvider } from "react-alert";
import { AlertsConfig } from './config/AlertConfig';
import { registerPlugin } from 'react-filepond'
import IndexRoute from "./routers/IndexRoute";
import AlertTemplate from "./config/AlertStyle";
import AuthContextProvider from "./context/AuthContext";
import LoaderContextProvider from "./context/LoaderContext";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import "react-tooltip/dist/react-tooltip.css";
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

function App() {
  return (
    <TooltipProvider>
      <LoaderContextProvider>
        <AlertProvider template={AlertTemplate} {...AlertsConfig}>
          <AuthContextProvider>
            <Router>
              <IndexRoute />
            </Router>
          </AuthContextProvider>
        </AlertProvider>
      </LoaderContextProvider>
    </TooltipProvider>
  );
}

export default App;
