import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import AllPost from './pages/AllPost.jsx'
import Home from './pages/Home.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'



import { SignUp , Login  } from './components/index.js'
import Post from './pages/Post.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element: (
          <AuthLayout>
            <Login authetication={false}/>
          </AuthLayout>
        )
      },
      {
        path:'/signup',
        element:(
          <AuthLayout authetication={false}> 
            <SignUp/>
          </AuthLayout>
        )
      },
      {
        path:'/all-post',
        element:(
          <AuthLayout authetication> 
          {" "}
            <AllPost/>
          </AuthLayout>
        )
        
      },
      {
        path:'/add-post',
        element:(
          <AuthLayout authetication> 
          {" "}
            <AddPost/>
          </AuthLayout>
        )
        
      },
      {
        path:'/edit-post/:slug',
        element:(
          <AuthLayout authetication> 
          {" "}
            <EditPost/>
          </AuthLayout>
        )
        
      },
      {
        path:'/post/:slug',
        element:<Post/>
        
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
