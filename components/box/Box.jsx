import styles from './box.module.css'
import Image from 'next/image'
const Box = ({data}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>

      <Image src={data?.image} width={280} height={200} alt='Student photo' />
      </div>
      <div className={styles.text}>
       {data?.name} | {data?.address} |{data?.city} 
      </div>
    </div>
  )
}

export default Box
