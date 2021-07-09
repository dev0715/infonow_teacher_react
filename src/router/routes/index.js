import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - InfoNow'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/meetings',
    component: lazy(() => import('../../pages/meetings/MeetingHome'))
  },
  {
    path: '/students',
    exact: true,
    component: lazy(() => import('../../pages/students/StudentList'))
  },
  {
    path: '/students/:studentId',
    component: lazy(() => import('../../pages/students/StudentHome')),
    meta: {
      navLink: '/students/:studentId'
    }
  },
  {
    path: '/tests',
    exact: true,
    component: lazy(() => import('../../pages/tests/TeacherTests'))
  },
  {
    path: '/addNewTest',
    exact: true,
    component: lazy(() => import('../../pages/tests/NewTest'))
  },
  {
    path: '/attempts/:testId',
    exact: true,
    component: lazy(() => import('../../pages/attempts/AttemptHome'))
  },

  {
    path: '/attemptDetail/:attemptId',
    exact: true,
    component: lazy(() => import('../../pages/attempts/AttemptDetail'))
  },
  {
    appLayout: true,
    className: 'chat-application',
    path: '/chat',
    component: lazy(() => import('../../pages/chat'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../pages/auth/login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  },
  {
    path: '/unauthorized',
    component: lazy(() => import('../../views/NotAuthorized')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
