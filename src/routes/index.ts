import CreateBlog from "../pages/CreateBlog"
import EditBlog from "../pages/EditBlog"
import ListBlog from "../pages/ListBlog"
import Login from "../pages/Login"


const publicRoutes = [
    {path: '/create-blog', component: CreateBlog},
    {path: '/edit-blog', component: EditBlog},
    {path: '/list-blog', component: ListBlog},
    {path: '/', component: Login},
]

export {publicRoutes}