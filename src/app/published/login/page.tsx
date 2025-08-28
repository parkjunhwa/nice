import { LoginForm } from './components/login-form'
import styles from './login.module.scss'

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      {/* 메인 콘텐츠 */}
      <div className={styles.loginContent}>
        {/* 중앙 로그인 카드 */}
        <div className={styles.loginCard}>
          <div className={styles.loginForm}>
            <LoginForm />
          </div>
        </div>
        
        {/* 하단 저작권 */}
        <div className={styles.copyright}>
          <p>© 2024 Published Pages Dashboard. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
