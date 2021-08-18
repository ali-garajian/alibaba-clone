import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  footer: {
    backgroundColor: "#e1e1e1",
    padding: "4% 6%",
    display: "flex",
    justifyContent: "space",
    fontSize: 13,
    color: "#646464",
  },
  copyright: {
    display: "flex",
    backgroundColor: "#424242",
    padding: "1% 6%",
    color: "#f5f5f5",
    fontSize: 13,
  },
  col: {
    width: "23%",
    margin: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  footer_Item: {
    color: "orange",
    fontSize: 13,
  },
  a: {
    color: "#646464",
    textDecoration: "none",
  },
  desc: {
    textAlign: "justify",
    fontWeight: 300,
  },
  img: {
    width: 125,
    marginBottom: 5,
    marginRight: 5,
  },
  virtualBusinesses: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

function Footer() {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      <Box className={classes.footer}>
        <div className={classes.col}>
          <div className={classes.title}>علی‌بابا</div>
          <div>
            <ul>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  درباره ما
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  تماس با ما
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  چرا علی‌بابا
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  باشگاه مشتریان
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  فروش سازمانی
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  قوانین و مقررات
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  راهنمای خرید
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  پرسش و پاسخ
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  مجله علی‌بابا
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  فرصت‌های شغلی
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.col}>
          <div className={classes.title}>اطلاعات تکمیلی</div>
          <div>
            <ul>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  بلیط چارتر
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  تور کیش
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  تور استانبول
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  اجاره ویلا جاباما
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  راهنمای خرید بلیط اتوبوس
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  راهنمای رزرو هتل خارجی
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  راهنمای استرداد بلیط
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  بلیط قطار
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  خرید بلیط هواپیما خارجی
                </a>
              </li>
              <li className={classes.footer_Item}>
                <a href="" className={classes.a}>
                  اطلاعات فرودگا‌هی
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.col}>
          <div className={classes.title}>اپلیکیشن علی‌بابا</div>
          <p className={classes.desc}>
            با نصب اپلیکیشن علی‌بابا بلیط همه سفرها در جیب شماست. آسان‌ترین،
            کامل‌ترین و مطمئن‌ترین روش تهیه بلیط و هتل را با اپلیکیشن علی‌بابا
            تجربه کنید.
          </p>
          <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
            <img src="/images/cafebazaar.png" className={classes.img} />
            <img src="/images/sibapp.png" className={classes.img} />
            <img src="/images/ios.png" className={classes.img} />
          </Box>
        </div>
        <div className={classes.col}>
          <img src="/images/footer-logo.svg" />
          <Box>
            <span>تلفن پشتیبانی:</span>
            <span>۰۲۱ - ۴۳۹۰۰۰۰۰</span> |<span>۰۲۱ - ۴۹۲۷۵۰۰۰</span>
          </Box>
        </div>
      </Box>
      <Box className={classes.copyright}>
        <p>
          کلیه حقوق این سایت محفوظ و متعلق به آژانس هواپیمایی و جهانگردی علی
          بابا می‌باشد. (ورژن 5.66.1)
        </p>
        <Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
