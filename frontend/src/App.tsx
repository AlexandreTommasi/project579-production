import AppProviders from '@/core/providers/AppProviders';
import AppRoutes from '@/core/routing/AppRoutes';

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
