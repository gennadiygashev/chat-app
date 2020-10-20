import Link from 'next/link'
import classes from '../styles/404.module.scss'

const ErrorPage = () => (
  <div className={classes.container}>
    <h1>Ошибка 404</h1>
    <p>
      Произошла непредвиденная ошибка. Пожалуйста вернитесь на{' '}
      <Link href="/">
        <a className={classes.linkSpan}>главную страницу</a>
      </Link>
      .
    </p>
  </div>
)

export default ErrorPage
