import React from 'react'
import {
  Box,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles({
  textFeature: {
      width: '69%',
  },
  image: {
    width:70,
    height: 70,
    marginTop: 16,
    marginRight: 20,
  },
  description: {
    color: '#9e9e9e',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    color: '#424242',
  }
})

function FeatureBox() {
  const classes = useStyles()

  return (
    <Box display="flex" justifyContent="space-evenly" padding="37px" >
      <Box display="flex" width="30%">
        <img src="/images/3.png" className={classes.image} />
        <div className={classes.textFeature}>
          <h3 className={classes.title}>پوشش ۱۰۰ درصدی پروازها و قطارها و اتوبوس‌ها</h3>
          <div className={classes.description}>
            کامل‌ترین سایت خرید بلیط پروازهای داخلی، پروازهای خارجی، بلیط قطار و
            بلیط اتوبوس
          </div>
        </div>
      </Box>
      <Box display="flex" width="30%">
        <img src="/images/2.png" className={classes.image} />
        <div className={classes.textFeature}>
          <h3 className={classes.title}>دسترسی آسان از طریق وبسایت، موبایل و اپلیکیشن</h3>
          <div className={classes.description}>ساده‌ترین و سریع‌ترین راه برای جستجو، خرید و استرداد بلیط</div>
        </div>
      </Box>
      <Box display="flex" width="30%">
        <img src="/images/1.png" className={classes.image} />
        <div className={classes.textFeature}>
          <h3 className={classes.title}>قیمت رقابتی همراه با تضمین بلیط‌های چارتر</h3>
          <div className={classes.description}>
            معتبرترین و به‌صرفه‌ترین سامانه فروش بلیط و چارتر با پشتیبانی ۲۴
            ساعته
          </div>
        </div>
      </Box>
    </Box>
  )
}

export default FeatureBox
