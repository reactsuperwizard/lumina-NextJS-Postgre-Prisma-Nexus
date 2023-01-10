import { Link, TextField } from '@mui/material'
import { styled } from '@mui/system'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { GetScriptQuery } from 'modules/admin/scripts/queries'
import { toDateTimeString } from 'modules/admin/utils'
import { LiveField } from 'modules/utils'
import { useRouter } from 'next/router'

const Root = styled('div')(({ theme }) => ({
  border: `1px solid #D9D9D9`,
  borderRadius: `4px`,
  width: '100%',
  padding: theme.spacing(2),
  '> div': {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderStyle: 'solid',
    borderWidth: '0 0 1px 0',
    borderColor: '#D9D9D9',
    color: '#0A0A0A',
    gap: theme.spacing(2),
    strong: {
      width: 200,
    },
    '> div': {
      flex: 1,
    },
  },
  '> div:last-child': {
    borderWidth: 0,
  },
  input: {
    fontSize: 14,
  },
  svg: {
    color: theme.palette.primary.main,
  },
}))

const DetailPanel = ({ script }: { script: GetScriptQuery }) => {
  const router = useRouter()
  return (
    <Root>
      <div>
        <strong>Script Name:</strong>
        <LiveField
          resource="Script"
          where={{ id: +script.id }}
          defaultValue={script?.name || ''}
          field="name"
          debounceTime={300}
          dense
        />
      </div>
      <div>
        <strong>Customer:</strong>
        <Link
          onClick={() =>
            router.push(`/admin/customers/${script?.customer?.id}`)
          }
        >
          {script?.customer?.name}
        </Link>
      </div>
      <div>
        <strong>Job Title:</strong>
        <span>{script?.request?.jobTitle}</span>
      </div>
      <div>
        <strong>Template Selection:</strong>
        <span>{script.flavor}</span>
      </div>
      <div>
        <strong>Script Created at:</strong>
        <span>{toDateTimeString(script.createdAt)}</span>
      </div>
      <div>
        <strong>Job Description Link:</strong>
        <Link href="#" display={'flex'} alignItems={'center'} gap={1}>
          {script.request.url}
          <OpenInNewIcon />
        </Link>
      </div>
    </Root>
  )
}

export default DetailPanel
