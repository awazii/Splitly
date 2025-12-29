import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Dashboard } from './Components/dashboard/Dashboard'
import { Friends } from './Components/friends/Friends'
import { Main } from './Components/Main'
import { Newfriend } from './Components/friends/Newf'
import { Groups } from './Components/Groups/Groups'
import { Friendslist } from './Components/friends/Friendslist.JSX'
import { Grouplist } from './Components/Groups/Grouplist'
import { Newg } from './Components/Groups/Newg'
import { Expense } from './Components/Expenses/Expense'
import { Analytics } from './Components/Analystics/Analytics'
import { Expense_Calculator_main } from './Components/ExpenseCalculator/Expense_Calculator_main'
import { Groupdetail } from './Components/Groups/GroupDetail/Groupdetail'
import Addexpense from "./Components/Groups/GroupDetail/AddExpense/New"
function App() {
  const router = createBrowserRouter([
    {
      element: <Main />,
      children: [
        {
          index: true,
          element: <Dashboard />
        }
        , {
          path: '/Friends',
          element: <Friends />,
          children: [
            {
              index: true,
              element: <Friendslist />
            },

            {
              path: 'Addfriend',
              element: <Newfriend />
            }
          ]
        },
        {
          path: '/Groups',
          element: <Groups />,
          children: [
            {
              index: true,
              element: <Grouplist />
            },
            {
              path: "AddGroup",
              element: <Newg />
            }
          ]
        },
        {
          path: '/Groups/:Groupid',
          element: <Groupdetail />,

        },
         {
          path: "/Groups/:Groupid/AddExpense",
          element: <Addexpense />
        }
        ,
        {
          path: '/Expenses',
          element: <Expense />
        },
        {
          path: '/Analytics',
          element: <Analytics />
        }, {
          path: "/ExpenseCalculator",
          element: <Expense_Calculator_main />
        }
      ]
    }

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
