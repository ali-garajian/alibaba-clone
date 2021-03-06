import { useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    color: '#646464',
    padding: '0 6%',
    textAlign: 'justify',
    lineHeight: 2,
    fontSize: 14,
  },
  title: {
    textAlign: 'center',
  },
  h2: {
    fontSize: 16,
    color: '#000000',
  },
})

export default function Content() {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>بلیط هواپیما</h1>
      <p>
        <b>علی‌بابا</b>بزرگترین و معتبرترین سایت خرید اینترنتی
        <b> بلیط هواپیما </b> ، قطار و اتوبوس در کشور است که از سال 1393 کار خود
        را شروع کرده و در این مدت توانسته رضایت درصد قابل توجهی از کاربران را به
        دست بیاورد. در ابتدا، فروش بلیط <b>پرواز داخلی</b> در دستور کار علی‌بابا
        قرار داشت؛ اما به مرور امکان خرید سایر محصولات گردشگری نیز به علی‌بابا
        اضافه شد.
      </p>
      <h2 className={classes.h2}>مزایای خرید بلیط هواپیما از علی‌بابا</h2>
      <p>
        شما با خرید بلیط هواپیما از علی‌بابا با سامانه مطمئن و معتبری روبه‌رو
        هستید که تمام نیازهایتان را پاسخ می‌دهد. برای خرید آنلاین بلیط هواپیما
        در علی‌بابا کافیست مبدا، مقصد و تاریخ پرواز خود را انتخاب کنید. پس از
        کلیک روی جستجو، لیست <a href="#">قیمت بلیط هواپیما</a> به مقصد مورد نظر
        شما ظاهر می‌شود. در این لیست، انتخابهای متعددی پیش روی شماست. برای اینکه
        گزینه‌ ها را برای خرید بلیط هواپیما محدودتر کنید، علی‌بابا ابزارهای
        مختلفی در اختیار شما می‌گذارد.
      </p>
      <p>
        یکی از ابزارهای بسیار مفید و کاربردی برای خرید اینترنتی بلیط هواپیما،
        تقویم قیمتی است. با استفاده از تقویم قیمتی شما می‌توانید کمترین و
        بیشترین قیمت بلیط پرواز را در روزهای قبل و بعد از آن تاریخ مشاهده کنید.
        در صورتی که اصرار به خرید بلیط هواپیما در یک روز خاص نداشته باشید، این
        امکان به شما کمک می‌کند تا مبلغ بلیط هواپیما برایتان با مبلغ به صرفه تری
        تمام شود.
      </p>
      <p>
        علاوه بر این، با استفاده از فیلترهای کنار صفحه می‌توانید ایرلاین مورد
        نظرتان را انتخاب کنید. ضمنا می‌توانید،{' '}
        <a href="#"> بلیط چارتر هواپیما</a> یا سیستمی را فعال کنید تا فقط یکی از
        این دو نوع بلیط را مشاهده کنید. <a href="#">بلیط هواپیما خارجی</a> ،کلاس
        پروازی و زمان پرواز هم از دیگر گزینه‌هایی است که با انتخاب آنها، تعداد
        بلیط ها محدودتر و رزرو بلیط هواپیما برای شما آسانتر می‌شود.
      </p>
      <p>
        برای پرداخت هزینه می‌توانید از کارت شتاب استفاده کنید. پس از پرداخت،
        خرید اینترنتی بلیط هواپیما با موفقیت انجام میشود و بلیط به ایمیل شما
        ارسال میشود. همچنین در همه این مراحل، پشتیبانی علی‌بابا در کنار شماست تا
        هر زمانی که سوال یا مشکلی داشتید، 24 ساعته پاسخگوی شما باشد.
      </p>
      <h2 className={classes.h2}>امکان استرداد بلیط هواپیما</h2>
      <p>
        یکی دیگر از امکانات علی‌بابا استرداد آنلاین بلیط هواپیما (کنسلی بلیط)
        است. در صورتی که پس از رزرو بلیط هواپیما برنامه سفرتان تغییر کرده، به
        راحتی می‌توانید طبق قوانین کنسلی پرواز داخلی، بلیط هواپیمای خود را کنسل
        کنید. پس از استرداد، پول شما در کمترین زمان ممکن به حسابتان برگردانده
        می‌شود. شما برای خرید اینترنتی بلیط هواپیما از علی‌بابا می‌توانید از
        تلفن همراه، رایانه شخصی یا تبلت استفاده کنید. علی‌بابا در همه این
        ابزارها کاربرپسند است و شما خریدی آسان را تجربه خواهید کرد. همچنین امکان
        نصب و استفاده از اپلیکیشن علی‌بابا برای گوشی های اندروید و آیفون وجود
        دارد.
      </p>
      <h2 className={classes.h2}>رزرو بلیط هواپیما از معتبرترین ایرلاین‌ها</h2>
      <p>
        شما برای خرید بلیط هواپیما از بین ایرلاینهای مختلف حق انتخاب دارید و
        می‌توانید از ایرلاینهای ماهان، زاگرس، کیش ایر، قشم ایر، آسمان، کاسپین،
        تابان، وارش یا معراج، بلیط پرواز داخلی خود را خریداری کنید.
      </p>
      <p>
        هر یک از این ایرلاین ها ویژگیها و مشخصات خود را دارند. برخی امکانات و
        خدمات رفاهی بیشتر دارند و برخی دیگر بلیط هواپیما را با قیمت به صرفه تری
        ارائه می‌دهند. زمانی که در علی‌بابا لیست بلیط تمام این ایرلاین ها را
        مشاهده می‌کنید، می‌توانید از بین آنها انتخاب کنید.
      </p>
      <h2 className={classes.h2}>علی‌بابا: رتبه یک خرید اینترنتی بلیط سفر</h2>
      <p>
        علی‌بابا طی این سالها، اعتبار زیادی نزد مشتریان خود کسب کرده است. طبق
        نظرسنجی، 97.2 درصد از مشتریان علی‌بابا از خدمات این سامانه راضی بوده‌اند
        و استفاده از آن را به دوستان و آشنایان خود پیشنهاد داده‌اند. سرعت سادگی
        خرید اینترنتی بلیط هواپیما، اعتبار و خوشنامی، امکان استرداد آنلاین بلیط
        هواپیما و پشتیبانی 24 ساعته در تمام روزهای هفته، رتبه یک فروش بلیط را از
        آنِ علی‌بابا کرده است.
      </p>
      <p>شما با رزرو بلیط هواپیما در علی‌بابا، از سفری راحت و بی‌دردسر مطمئن خواهید بود.</p>
    </div>
  )
}
