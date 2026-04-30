import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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
import { SplitlyOnboarding } from "./Components/NewUser";
import { selectIsNewUser } from "./store/UserSlice";
import { useSelector } from "react-redux";
function App() {
  const [Loading, setLoading] = useState(true);
  const isNewUser = useSelector(selectIsNewUser);
  const ProtectedRoute = ({ children, redirectIf }) => {
    if (redirectIf === "noFriends" && isNewUser ) {
      return <Navigate to="/NewUser" replace />;
    }
    if (redirectIf === "hasFriends" && !isNewUser) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
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
            <ProtectedRoute redirectIf="noFriends">
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Friends",
          element: (
            <ProtectedRoute redirectIf="noFriends">
              <Friends />
            </ProtectedRoute>
          ),
          children: [
            { path: '', element: <Friendslist /> },
            { path: "Addfriend", element: <Newfriend /> },
          ],
        },
        {
          path: "/Friends/:Friend",
          element: (
            <ProtectedRoute redirectIf="noFriends">
              <Frienddetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Groups",
          element: (
            <ProtectedRoute redirectIf="noFriends">
              <Groups />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <Grouplist /> },
            { path: "AddGroup", element: <Newg /> },
          ],
        },
        {
          path: "/Groups/:Groupid",
          element: (
            <ProtectedRoute redirectIf="noFriends">
              <Groupdetail />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Groups/:Groupid/AddExpense",
          element: (
            <ProtectedRoute redirectIf="noFriends">
              <Addexpense />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Groups/:Groupid/Expenses",
          element: (
            <ProtectedRoute redirectIf="noFriends">
              <Expenses />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Expenses",
          element: (
            <ProtectedRoute redirectIf="noFriends">
              <Expense />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Analytics",
          element: (
            <ProtectedRoute redirectIf="noFriends">
              <Analytics />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Spliter",
          element: (
            <ProtectedRoute redirectIf="noFriends">
              <Spliter_main />
            </ProtectedRoute>
          ),
        },
        {
          path: "/NewUser",
          element: (
            <ProtectedRoute redirectIf="hasFriends">
              <SplitlyOnboarding />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
