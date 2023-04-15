import './PageNotFound.css'

const PageNotFound = () => {
    return (
        <main className="pageNotFoundMain">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Trying to reset your password? Emailed links expire after a few minutes.</p>
            <a href="/">Click here to return to the login page, where you can request a new link.</a>
        </main>
    );
}

export default PageNotFound;