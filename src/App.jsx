import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Loader } from "./Components/loader";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Friends } from "./pages/friends/Friends";
import { Main } from "./Components/Main";
import { Newfriend } from "./Components/friends/Addfriend/Newf";
import { Groups } from "./pages/Group/Groups";
import { Friendslist } from "./pages/friends/Friendslist";
import { Grouplist } from "./pages/Group/Grouplist";
import { Newg } from "./Components/Groups/AddGroup/Newg";
import { Expense } from "./pages/Expenses/Expenses";
import { Analytics } from "./pages/Analystics/Analytics";
import { Spliter_main } from "./pages/Spliter/Spliter_main";
import { Groupdetail } from "./Components/Groups/GroupDetail/Groupdetail";
import Addexpense from "./Components/Expenses/Common/New";
import { Expenses } from "./Components/Expenses/GroupExpenses";
import { Frienddetails } from "./Components/friends/Frienddetails/Frienddetails";
import { SplitlyOnboarding } from "./Components/info"
import { selectAllFriends } from "./store/FriendsSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function App() {
  const [Loading, setLoading] = useState(true);
  const friends = useSelector(selectAllFriends)
  const ProtectedRoute = ({ children }) => {
    if (friends.length === 0) {
      return <Navigate to="/NewUser" replace />;
    }
    return children;
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  if (Loading) return <Loader />;
  const router = createBrowserRouter([
    {
      element: <Main />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Friends",
          element: (
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <Friendslist /> },
            { path: "Addfriend", element: <Newfriend /> },
          ],
        },
        { path: "/Friends/:Friend", element: <ProtectedRoute><Frienddetails /></ProtectedRoute> },
        {
          path: "/Groups",
          element: <ProtectedRoute><Groups /></ProtectedRoute>,
          children: [
            { index: true, element: <Grouplist /> },
            { path: "AddGroup", element: <Newg /> },
          ],
        },
        { path: "/Groups/:Groupid", element: <ProtectedRoute><Groupdetail /></ProtectedRoute> },
        { path: "/Groups/:Groupid/AddExpense", element: <ProtectedRoute><Addexpense /></ProtectedRoute> },
        { path: "/Groups/:Groupid/Expenses", element: <ProtectedRoute><Expenses /></ProtectedRoute> },
        { path: "/Expenses", element: <ProtectedRoute><Expense /></ProtectedRoute> },
        { path: "/Analytics", element: <ProtectedRoute><Analytics /></ProtectedRoute> },
        { path: "/Spliter", element: <ProtectedRoute><Spliter_main /></ProtectedRoute> },
        { path: "/NewUser", element: <SplitlyOnboarding /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
