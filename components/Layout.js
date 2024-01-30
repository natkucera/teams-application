import Sidebar from "./Sidebar";


const RootLayout = ({children}) => {
    return (
        <div className="container">
            <Sidebar />
            <main className="content">{children}</main>
        </div>
    )
}

export default RootLayout;