import AppRoutes from "./routes/AppRoutes";
import { DiscogsProvider } from "./context/DiscogsContext";
import './styles/App.css';

const App: React.FC = () => {
  return (
    <DiscogsProvider>
      <AppRoutes />
    </DiscogsProvider>
  );
};

export default App;

