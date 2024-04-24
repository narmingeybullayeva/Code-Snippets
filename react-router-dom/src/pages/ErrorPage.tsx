import { isRouteErrorResponse, useRouteError } from 'react-router-dom'


const ErrorPage = () => {
    const error = useRouteError()

  return (
    <div>Error page
        <p>{isRouteErrorResponse(error) ? 'Sehife ile bağli sehv var' : 'Kodla bagli sehv var'}</p>
    </div>
  )
}

export default ErrorPage