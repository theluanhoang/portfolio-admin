import Sidebar from '../../Sidebar'

function DefaultLayout({ children }: any) {
    return (
        <>
            <Sidebar />
            <div>
                {children}
            </div>
        </>
    )
}

export default DefaultLayout