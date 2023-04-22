import Sidebar from "../Sidebar"

function Layout({ children }: any) {
    return (
        <>
            <Sidebar />
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout