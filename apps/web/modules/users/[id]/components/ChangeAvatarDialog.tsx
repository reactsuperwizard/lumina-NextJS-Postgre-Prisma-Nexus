import React, { useEffect, useState } from 'react'
import {
  IconButton,
  Dialog,
  DialogTitle,
  styled,
  Typography,
} from '@mui/material'
import { HighlightOffRounded } from '@mui/icons-material/'

import { useMutation, gql, useQuery } from '@apollo/client'
import { Asset, QueryAssetsArgs, User } from '@lumina/api'
import { useRouter } from 'next/router'

const PREFIX = 'ChangeAvatarDialog'

const classes = {
  closeButton: `${PREFIX}-closeButton`,
  dialog: `${PREFIX}-dialog`,
  confirmationDialog: `${PREFIX}-confirmationDialog`,
  listOfAvatars: `${PREFIX}-listOfAvatars`,
  headerText: `${PREFIX}-headerText`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.closeButton}`]: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  [`& .${classes.dialog}`]: {
    borderRadius: 20,
    padding: '1.5rem',
    paddingBottom: '3rem',
    maxWidth: '640px',
  },

  [`& .${classes.confirmationDialog}`]: {
    maxWidth: '675px',
  },
  [`& .${classes.listOfAvatars}`]: {
    height: '2rem',
    width: '2rem',
  },
}))
const StyledDiv = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  columnGap: '1rem',
  rowGap: '1rem',
  [`& .${classes.listOfAvatars}`]: {
    height: '5rem',
    width: '5rem',
    cursor: 'pointer',
  },
}))

const GET_AVATAR_ASSETS = gql`
  query Assets($where: AssetWhereInput) {
    assets(where: $where) {
      id
      url
    }
  }
`

const UPDATE_AVATAR = gql`
  mutation updateMe($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    user: updateMe(where: $where, data: $data) {
      avatar
      id
    }
  }
`
interface Props {
  close: () => void
  open: boolean
}

export const ChangeAvatarDialog = ({ close, open }: Props) => {
  const router = useRouter()
  const id = parseInt((router.query.id as string) || 'NaN')

  const { data, refetch } = useQuery<
    { assets: Pick<Asset, 'id' | 'url'>[] },
    QueryAssetsArgs
  >(GET_AVATAR_ASSETS, {
    variables: {
      where: { folderId: { equals: 233 } },
    },
  })

  const [updateUserAvatar] =
    useMutation<{ user: Pick<User, 'avatar'> }>(UPDATE_AVATAR)

  const handleAvatarChange = async (avatarUrl: string) => {
    updateUserAvatar({
      variables: {
        data: { avatar: { set: avatarUrl } },
        where: { id: id },
      },
    })
    await refetch()
    close()
  }

  return (
    <>
      <StyledDialog
        onClose={close}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
        classes={{
          paper: `${classes.dialog}`,
        }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={close}
            size="large"
          >
            <HighlightOffRounded fontSize="large" />
          </IconButton>
          <Typography
            className={classes.headerText}
            color="textPrimary"
            textAlign="center"
            style={{ fontSize: '1.75rem' }}
          >
            Pick a new Avatar!
          </Typography>
        </DialogTitle>
        <StyledDiv>
          {data?.assets.map((asset: any) => (
            <img
              key={`${asset.url}`}
              className={classes.listOfAvatars}
              src={asset.url}
              onClick={() => handleAvatarChange(asset.url)}
            />
          ))}
        </StyledDiv>
      </StyledDialog>
    </>
  )
}
