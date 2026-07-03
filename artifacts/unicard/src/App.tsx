import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AuthProvider } from '@/context/AuthContext';

// Pages
import Home from '@/pages/Home';
import Cards from '@/pages/Cards';
import GiftCards from '@/pages/GiftCards';
import Games from '@/pages/Games';
import Recharge from '@/pages/Recharge';
import Transfers from '@/pages/Transfers';
import Esim from '@/pages/Esim';
import Vpn from '@/pages/Vpn';
import Proxy from '@/pages/Proxy';
import Contacts from '@/pages/Contacts';

// Cabinet Pages
import Login from '@/pages/cabinet/Login';
import Dashboard from '@/pages/cabinet/Dashboard';
import CabinetCards from '@/pages/cabinet/Cards';
import Orders from '@/pages/cabinet/Orders';
import Transactions from '@/pages/cabinet/Transactions';
import Subscriptions from '@/pages/cabinet/Subscriptions';
import Topup from '@/pages/cabinet/Topup';
import Settings from '@/pages/cabinet/Settings';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/cards" component={Cards} />
      <Route path="/gift-cards" component={GiftCards} />
      <Route path="/games" component={Games} />
      <Route path="/recharge" component={Recharge} />
      <Route path="/transfers" component={Transfers} />
      <Route path="/esim" component={Esim} />
      <Route path="/vpn" component={Vpn} />
      <Route path="/proxy" component={Proxy} />
      <Route path="/contacts" component={Contacts} />

      {/* Cabinet Auth Route */}
      <Route path="/cabinet/login" component={Login} />

      {/* Cabinet Protected Routes */}
      <Route path="/cabinet" component={Dashboard} />
      <Route path="/cabinet/cards" component={CabinetCards} />
      <Route path="/cabinet/orders" component={Orders} />
      <Route path="/cabinet/transactions" component={Transactions} />
      <Route path="/cabinet/subscriptions" component={Subscriptions} />
      <Route path="/cabinet/topup" component={Topup} />
      <Route path="/cabinet/settings" component={Settings} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
