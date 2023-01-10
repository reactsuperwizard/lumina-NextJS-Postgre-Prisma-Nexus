import { Chip, FormControl, styled } from '@mui/material'
import ChipInput from 'material-ui-chip-input'

interface Props {
  addTag: (chip: string) => void
  handleDelete: (chip: string) => void
  tags: string[]
}

const StyledFormControl = styled(FormControl)(() => ({
  width: '100%',
  '& .MuiFormControl-root': {
    whiteSpace: 'initial',
    paddingTop: 0,
  },
  '& .MuiInputBase-root': {
    padding: '5px !important',
  },
  '& .MuiInputBase-input': {
    padding: '5px !important',
  },
}))

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.primary.main,
  margin: '0.2rem',
  border: `1px solid ${theme.palette.primary.main}`,
  '& .MuiChip-deleteIcon': {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))
export const AssetTagFilter = ({ addTag, handleDelete, tags }: Props) => {
  return (
    <StyledFormControl variant="filled">
      <ChipInput
        value={tags}
        placeholder="Search by Tags"
        variant="outlined"
        onAdd={(chip) => addTag(chip)}
        onDelete={(chip) => handleDelete(chip)}
        chipRenderer={({ value, chip, handleDelete }, key) => (
          <StyledChip
            key={key}
            label={value}
            onDelete={() => handleDelete(chip)}
          />
        )}
      />
    </StyledFormControl>
  )
}
