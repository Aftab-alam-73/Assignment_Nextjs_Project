import styles from './navbar.module.css'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href={'/'} className={styles.link}>Home Page</Link>
      <h1 className={styles.heading}>School Details</h1>
      <Link href={'/addSchool'} className={styles.btn}>Add Details</Link>
    </div>
  )
}

export default Navbar
