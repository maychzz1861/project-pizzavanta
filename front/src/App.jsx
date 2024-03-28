
import { OrderContextProvider } from "./contexts/OrderContext";
import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

function App() {
  const {loading} = useAuth()

  if(loading) {
    return (
      <span className="loading loading-bars loading-lg"></span>
    )
  }

  return (
    <div className="min-h-screen">
      <OrderContextProvider>
      <AppRouter />
      </OrderContextProvider>
    </div>
  );
}

export default App;
