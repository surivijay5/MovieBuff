import SignUp from './components/User/SignUp'
import Profile from './components/User/Profile'
import Home from './components/Home'

export default [
    { 
        path: '/',
        name : 'home',
        component: Home 
    },
    { 
        path: '/SignUp',
        name : 'signUp',
        component: SignUp 
    },
    { 
        path: '/Profile',
        name : 'profile',
        component: Profile 
    }
]