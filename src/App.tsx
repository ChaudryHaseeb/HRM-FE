import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/Protection/ProtectedRoute'; // Import the new component
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Department from './pages/Features/Department/Department';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <>
            <PageTitle title="Signin | HRM" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Signup | HRM" />
            <SignUp />
          </>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DefaultLayout>
              <PageTitle title="Dashboard | HRM" />
              <ECommerce />
            </DefaultLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/department"
        element={
          <ProtectedRoute>
            <DefaultLayout>
              <PageTitle title="Department | HRM" />
              <Department />
            </DefaultLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DefaultLayout>
              <PageTitle title="Profile | HRM" />
              <Profile />
            </DefaultLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/forms/form-elements"
        element={
          <ProtectedRoute>
            <DefaultLayout>
              <PageTitle title="Form Elements | HRM" />
              <FormElements />
            </DefaultLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/forms/form-layout"
        element={
          <ProtectedRoute>
            <DefaultLayout>
              <PageTitle title="Form Layout | HRM" />
              <FormLayout />
            </DefaultLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tables"
        element={
          <ProtectedRoute>
            <DefaultLayout>
              <PageTitle title="Tables | HRM" />
              <Tables />
            </DefaultLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DefaultLayout>
              <PageTitle title="Settings | HRM" />
              <Settings />
            </DefaultLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/chart"
        element={
          <ProtectedRoute>
            <DefaultLayout>
              <PageTitle title="Basic Chart | HRM" />
              <Chart />
            </DefaultLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <ProtectedRoute>
            <DefaultLayout>
              <PageTitle title="Alerts | HRM" />
              <Alerts />
            </DefaultLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ui/buttons"
        element={
          <ProtectedRoute>
            <DefaultLayout>
              <PageTitle title="Buttons | HRM" />
              <Buttons />
            </DefaultLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
