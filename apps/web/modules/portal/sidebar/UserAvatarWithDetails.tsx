import {
  Tooltip,
  Box,
  Typography,
  Avatar,
  styled,
  Badge,
  tooltipClasses,
  TooltipProps,
  Stack,
} from '@mui/material'

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff',
    marginLeft: '0 !important',
    padding: '1rem',
  },
  [`& .${tooltipClasses.popper}`]: {},
}))

interface Props {
  email: string
  firstName: string
  lastName: string
  isUserActive: boolean
  avatar: string
  flow: 'scripting' | 'sidebar'
}
export const UserAvatarWithDetails = ({
  email,
  firstName,
  lastName,
  isUserActive,
  avatar,
  flow,
}: Props) => {
  const userData = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        padding: '0.5rem 1.5rem',
        '&:hover': {
          cursor: flow == 'scripting' ? '' : 'pointer',
          backgroundColor: flow == 'scripting' ? 'none' : '#202353',
        },
      }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          marginRight: '1rem',
          '& .MuiBadge-badge': {
            backgroundColor: isUserActive ? '#44b700' : '#D9D9D9',
            color: isUserActive ? '#44b700' : '#D9D9D9',
            '&::after': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              content: '""',
            },
          },
        }}
        variant="dot"
      >
        <Avatar
          alt="Avatar"
          src={avatar}
          sx={{ width: '2rem', height: '2rem' }}
        />
      </Badge>
      <Box
        padding={0}
        margin={0}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          display="inline"
          textOverflow="ellipsis"
          fontSize="0.9rem"
          fontWeight={flow == 'scripting' ? 500 : 300}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {!firstName && !lastName ? 'No Name' : `${firstName} ${lastName}`}
        </Typography>
        {flow === 'scripting' && (
          <Typography
            display="inline"
            textOverflow="ellipsis"
            fontSize="0.75rem"
            fontWeight={flow == 'scripting' ? 500 : 300}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {email}
          </Typography>
        )}
      </Box>
    </Stack>
  )

  // Component for user avatar
  return flow === 'scripting' ? (
    <>{userData}</>
  ) : (
    <StyledTooltip
      title={
        <Box>
          <Typography variant="subtitle2" fontWeight={600} color="#000">
            {firstName} {lastName}
          </Typography>
          <Typography variant="subtitle2" fontWeight={200} color="#333">
            {email}
          </Typography>
        </Box>
      }
      placement="right-start"
    >
      {userData}
    </StyledTooltip>
  )
}
