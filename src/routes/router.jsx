import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Login from "../pages/user/Login";
import Classes from "../pages/Classes/Classes";
import Register from "../pages/user/Register";
import SingleClass from "../pages/Classes/SingleClass";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCP from "../pages/Dashboard/Students/StudentCP";
import EnrolledClasses from "../pages/Dashboard/Students/Enroll/EnrolledClasses";
import SelectedClass from "../pages/Dashboard/Students/SelectedClass";
import PaymentHistory from "../pages/Dashboard/Students/Payment/History/PaymentHistory";
import AsInstructor from "../pages/Dashboard/Students/Apply/AsInstructor";
import Payment from "../pages/Dashboard/Students/Payment/Payment";
import CourseDetails from "../pages/Dashboard/Students/Enroll/CourseDetails";
import InstructorCP from "../pages/Dashboard/Instructor/InstructorCP";
import AddClass from "../pages/Dashboard/Instructor/AddClass"
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import PendingCourse from "../pages/Dashboard/Instructor/PendingCourse";
import ApprovedClass from "../pages/Dashboard/Instructor/ApprovedClass";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import UpdateUser from "../pages/Dashboard/Admin/UpdateUser";
import ManageApplications from "../pages/Dashboard/Admin/ManageApplications";
import Trending from "../pages/Dashboard/Trending";
import Following from "../pages/Dashboard/Following";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/instructors', // Full path from the root
        element: <Instructors />
      },
      {
        path: '/classes', // Full path from the root
        element: <Classes />
      },
      {
        path: '/login', // Full path from the root
        element: <Login />
      },
      {
        path: '/register', // Full path from the root
        element: <Register />
      },
      {
        path: '/class/:id',
        element: <SingleClass />,
        loader: ({ params }) => fetch(`https://yoga-master-server-991u.onrender.com/class/${params.id}`).then((res) => res.json()) // Added .then((res) => res.json()) to parse the response
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true, // Corrected the syntax
        element: <Dashboard />
      },
      
      

      {
        path: "student-cp",
        element: <StudentCP/>
      },
      {
        path: "enrolled-class",
        element:<EnrolledClasses/>
      },
      {
        path:"my-selected",
        element:<SelectedClass/>
      },
      {
        path:"my-payments",
        element:<PaymentHistory/>
      },
      {
        path:"apply-instructor",
        element:<AsInstructor/>
      },
      {
        path: "user/payment",
        element:<Payment/>
      },
      {
        path:"course-details",
        element:<CourseDetails/>
      },

      //instructor path
      {
        path:"instructor-cp",
        element:<InstructorCP/>
      },
      {
        path:"add-class",
        element:<AddClass/>
      },{
        path:"my-classes",
        element:<MyClasses/>
      },{
        path:"my-pending",
        element:<PendingCourse/>
      },{
        path:"my-approved",
        element:<ApprovedClass/>
      },
      //Admin routes
      {
        path:"admin-home",
        element:<AdminHome/>
      },{
        path:"manage-classes",
        element:<ManageClasses/>
      },{
        path:"manage-users",
        element:<ManageUsers/>
      },
      {
        path:"manage-applications",
        element:<ManageApplications/>
      },
      {
        path:"update-user/:id",
        element:<UpdateUser/>,
        loader:({params}) => fetch(`https://yoga-master-server-991u.onrender.com/users/${params.id}`)
      }
    ]
    
  },
  {
        path:"/trending",
        element:<Trending/>
      },
      {
        path: '/browse',
        element: <Following/>
      },
]);
