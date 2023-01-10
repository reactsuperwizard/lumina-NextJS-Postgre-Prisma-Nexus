import { Box, CircularProgress, Divider } from '@mui/material'
import { LuminaAccordion } from 'modules/utils/LuminaAccordion'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { UserAvatarWithDetails } from 'modules/portal/sidebar/UserAvatarWithDetails'
import { CustomerQuery } from '../modules/dashboard'

interface Props {
  activeScripters: CustomerQuery['users']
  inactiveScripters: CustomerQuery['users']
  loading: boolean
}
export const ScriptingList = ({
  activeScripters,
  inactiveScripters,
  loading,
}: Props) => {
  return (
    <Box>
      <LuminaAccordion
        title="Scripters"
        openOnStart={true}
        collapseIcon={<AddIcon />}
        expandIcon={<RemoveIcon />}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" padding="0.5rem">
            <CircularProgress size="2rem" />
          </Box>
        ) : (
          <>
            {activeScripters?.length > 0 &&
              activeScripters.map((user) => (
                <div key={`${user.email}`}>
                  <UserAvatarWithDetails
                    firstName={user.firstName as string}
                    lastName={user.lastName as string}
                    email={user.email as string}
                    isUserActive={user.isUserActive as boolean}
                    avatar={user.avatar}
                    flow="scripting"
                  />
                </div>
              ))}

            {activeScripters?.length > 0 && inactiveScripters?.length > 0 && (
              <Divider sx={{ mt: '0.5rem', mb: '0.5rem' }} variant="middle" />
            )}
            {inactiveScripters?.length > 0 &&
              inactiveScripters.map((user) => (
                <div key={`${user.email}`}>
                  <UserAvatarWithDetails
                    firstName={user.firstName as string}
                    lastName={user.lastName as string}
                    email={user.email as string}
                    isUserActive={user.isUserActive as boolean}
                    avatar={user.avatar}
                    flow="scripting"
                  />
                </div>
              ))}
          </>
        )}
      </LuminaAccordion>
    </Box>
  )
}
