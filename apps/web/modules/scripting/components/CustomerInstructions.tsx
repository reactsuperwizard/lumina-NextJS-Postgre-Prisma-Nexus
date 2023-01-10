import { styled } from '@mui/system'
import { GetScriptQuery } from 'modules/admin/scripts/queries'

const Root = styled('div')(({ theme }) => ({
  backgroundColor: '#FDFBCD',
  borderRadius: `4px`,
  padding: theme.spacing(2),
  strong: {
    fontSize: 12,
    fontWeight: 900,
  },
}))

const CustomerInstructions = ({ script }: { script: GetScriptQuery }) => {
  return (
    <Root>
      <strong>CUSTOMER'S SPECIAL INSTRUCTIONS</strong>
      <p>{script?.request?.message || 'none'}</p>
    </Root>
  )
}

export default CustomerInstructions
