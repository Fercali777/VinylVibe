import AppRoutes from "./routes/AppRoutes";
import { DiscogsProvider } from "./context/DiscogsContext";

const App: React.FC = () => {
  return (
    <DiscogsProvider>
      <AppRoutes />
    </DiscogsProvider>
  );
};

export default App;

