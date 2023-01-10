import { styled } from '@mui/system'
import { GetScriptQuery } from 'modules/admin/scripts/queries'
import { useEffect, useState } from 'react'

const Root = styled('div')(({ theme }) => ({
  backgroundColor: '#D9EAF5',
  borderRadius: `4px`,
  padding: theme.spacing(2),
  strong: {
    fontSize: 12,
    fontWeight: 900,
  },
  ul: {
    paddingInlineStart: 20,
  },
}))

const CustomerNotes = ({ script }: { script: GetScriptQuery }) => {
  const [notes, setNotes] = useState<string[]>([])
  useEffect(() => {
    if (script?.customer?.notes) {
      setNotes(script.customer.notes.split('\n'))
    }
  }, [script])
  return (
    <Root>
      <strong>INTERNAL CUSTOMER NOTES</strong>
      <ul>
        {notes.map((note) => (
          <li>{note}</li>
        ))}
      </ul>
    </Root>
  )
}

export default CustomerNotes
