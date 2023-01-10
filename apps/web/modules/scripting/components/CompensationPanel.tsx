import { styled } from '@mui/system'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { GetScriptQuery } from 'modules/admin/scripts/queries'
import { useEffect, useState } from 'react'

const prefix = `SLIDE_COMPENSATION`
const classes = {
  footer: `${prefix}-footer-div`,
  pricing: `${prefix}-pricing-div`,
}

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid #D9D9D9`,
  borderRadius: `4px`,
  flex: 1,
  height: '100%',
  padding: 0,
  '> strong': {
    fontSize: 16,
    fontWeight: 900,
    margin: theme.spacing(2),
  },

  [`& div.${classes.pricing}`]: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    marginTop: 0,
    gap: 8,
    '> div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      strong: {
        fontSize: 24,
      },
    },
  },
  [`& div.${classes.footer}`]: {
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#137CBD',
    padding: theme.spacing(2),
    color: 'white',
    gap: 4,
    borderRadius: `4px`,
  },
}))

const CompensationPanel = ({ script }: { script: GetScriptQuery }) => {
  const { bonusPrice, basePrice, bonusDeadline } = script.request
  const calculateBonusTimeLeft = () => {
    return Math.floor(
      (new Date(bonusDeadline).getTime() - new Date().getTime()) / 60000,
    )
  }
  const [bonusTimeLeft, setBonusTimeLeft] = useState<number>(
    calculateBonusTimeLeft(),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setBonusTimeLeft(calculateBonusTimeLeft())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Root>
      <strong>Compensation</strong>
      <div className={classes.pricing}>
        <div>
          <span>Base</span>
          <strong>${basePrice || 0}</strong>
        </div>
        <div>
          <span>Bonus</span>
          <strong>${bonusPrice || 0}</strong>
        </div>
        {/* <div>
          <span>Today's Earnings</span>
          <strong>$234</strong>
        </div> */}
      </div>
      {bonusTimeLeft && bonusTimeLeft > 0 && (
        <div className={classes.footer}>
          <AccessTimeIcon />
          <span>Publish within {bonusTimeLeft} minutes to receive bonus</span>
        </div>
      )}
    </Root>
  )
}

export default CompensationPanel
