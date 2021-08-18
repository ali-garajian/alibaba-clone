// import { Box, makeStyles, Theme } from '@material-ui/core'

// import CustomAccordion from 'components/CustomAccordion'
import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: '7%',
      color: '#646464',
    },
    heading: {
      fontSize: 13,
      flexBasis: '69.33%',
      flexShrink: 0,
      alignSelf: 'center',
    },
    content: {
      fontSize: 13,
      paddingRight: 20,
    },
    imgQuestion: {
      margin: 10,
    },
  }),
)

function QuestionFrequently() {
  //const classes = useStyles()
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      <h2>سوالات متداول شما درباره خرید بلیط هواپیما</h2>
      <Accordion
        // expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.imgQuestion}>
            <img src="/images/question.png" width="30px" />
          </Typography>
          <Typography className={classes.heading}>
            چند روز قبل از پرواز، بلیط هواپیما را بخریم؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.content}>
            امکان رزرو بلیط هواپیما از ماه‌ها قبل وجود دارد. اما گاهی اوقات قیمت
            بلیط هواپیما در روزهای نزدیک به پرواز ارزان‌تر می‌شود. بنابراین در
            صورتی که شرایطتان اجازه می‌دهد، رزرو آنلاین بلیط هواپیما را به
            روزهای نزدیک پرواز موکول کنید. البته اگر قصد سفر در ایام پرسفر نظیر
            تعطیلات را دارید، باید هر چه زودتر رزرو بلیط هواپیما را انجام دهید.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.imgQuestion}>
            <img src="/images/question.png" width="30px" />
          </Typography>
          <Typography className={classes.heading}>
            در هر پرواز، میزان بار مجاز چقدر است؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.content}>
            میزان مجاز بار به کلاس پرواز و کلاس نرخی بلیط بستگی دارد. هنگام خرید
            آنلاین بلیط هواپیما می‌توانید میزان بار مجاز را در اطلاعات بلیط
            ببینید. طبیعی است که اگر میزان بارتان بیش از حد مجاز باشد، باید
            جریمه پرداخت کنید.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.imgQuestion}>
            <img src="/images/question.png" width="30px" />
          </Typography>
          <Typography className={classes.heading}>
            نرخ بلیط هواپیما برای نوزادان و کودکان زیر 12 سال چگونه است؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.content}>
            این نرخ به کلاس پرواز و کلاس نرخی بستگی دارد. اما عموما 50 تا 75
            درصد قیمت بلیط بزرگسالان است. قیمت بلیط هواپیما برای نوزادان (تا 2
            سال) در بیشتر موارد 10 درصد بلیط بزرگسالان است. هنگام تهیه بلیط
            هواپیما به این نکته توجه داشته باشید.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.imgQuestion}>
            <img src="/images/question.png" width="30px" />
          </Typography>
          <Typography className={classes.heading}>
            رزرو آنلاین بلیط هواپیما هزینه بیشتری از خرید حضوری دارد؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.content}>
            خیر؛ زمانی که از یک سایت معتبر خرید بلیط هواپیما، اقدام به خرید
            می‌کنید، نه تنها هزینه بیشتری پرداخت نمی‌کنید، حتی ممکن است تخفیف هم
            بگیرید. ضمنا با خرید آنلاین بلیط هواپیما از پشتیبانی نیز برخودار
            هستید.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.imgQuestion}>
            <img src="/images/question.png" width="30px" />
          </Typography>
          <Typography className={classes.heading}>
            آیا پس از خرید اینترنتی بلیط هواپیما امکان استرداد آن وجود دارد؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.content}>
            وقتی از علی‌بابا یعنی بهترین سایت خرید بلیط هواپیما ، بلیطتان را
            رزرو می‌کنید، خیالتان آسوده است که امکان استرداد وجه در صورت کنسل
            کردن بلیط وجود دارد. میزان جریمه را هم هنگام رزرو آنلاین بلیط
            هواپیما در قسمت قوانین استرداد بخوانید. میزان جریمه به نوع بلیط،
            کلاس پروازی، کلاس نرخی و... بستگی دارد.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleChange('panel6')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.imgQuestion}>
            <img src="/images/question.png" width="30px" />
          </Typography>
          <Typography className={classes.heading}>
            آیا پس از خرید بلیط هواپیما امکان تغییر نام یا نام خانوادگی وجود
            دارد؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.content}>
            در پرواز داخلی یا خارجی، امکان تغییر نام و نام خانوادگی در بلیط
            سیستمی وجود ندارد. اما در بلیط چارتر، برخی از چارترکننده‌ها این
            تغییر را می‌پذیرند.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleChange('panel7')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.imgQuestion}>
            <img src="/images/question.png" width="30px" />
          </Typography>
          <Typography className={classes.heading}>
            هنگامی که از سایت خرید بلیط هواپیما رزرو بلیط را انجام می دهیم،
            امکان انتخاب صندلی موردنظرمان وجود دارد؟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.content}>
            خیر؛ هنگام رزرو بلیط هواپیما داخلی یا خارجی امکان انتخاب صندلی وجود
            ندارد. البته در زمان چک‌این انتخاب محدوده صندلی امکان‌پذیر است.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default QuestionFrequently
