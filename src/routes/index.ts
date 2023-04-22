import CreateBlog from "../pages/CreateBlog"
import EditBlog from "../pages/EditBlog"
import ListBlog from "../pages/ListBlog"


const publicRoutes = [
    {path: '/create-blog', component: CreateBlog},
    {path: '/edit-blog', component: EditBlog},
    {path: '/list-blog', component: ListBlog},
]

export {publicRoutes}