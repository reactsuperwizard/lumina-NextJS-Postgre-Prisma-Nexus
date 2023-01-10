import { PermissionsRole } from '@lumina/api'
import React from 'react'

import { EventNames } from './Constants'

type VideoDownload = (
  eventName: EventNames.VIDEO_DOWNLOAD,
  props: {
    props: {
      videoId: number
      size: string
      page: string
      email: { role: PermissionsRole } | null
    }
  },
) => void

type LinkShare = (
  eventName: EventNames.LINK_SHARE,
  props: {
    props: {
      videoId: number
      page: string
      email: { role: PermissionsRole } | null
    }
  },
) => void

type SocialShare = (
  eventName: EventNames.SOCIAL_SHARE,
  props: {
    props: {
      videoId: number
      page: string
      platform: 'Linkedin' | 'Facebook' | 'Twitter'
      email: { role: PermissionsRole } | null
    }
  },
) => void

type InactiveCustomerViewsVideo = (
  eventName: EventNames.INACTIVE_CUSTOMER_VIEWS_VIDEO,
  props: {
    props: {
      customer: string
      page: string
      active: boolean
      email: { role: PermissionsRole } | null
    }
  },
) => void

type LicenseDialog = (
  eventName: EventNames.LICENSE_DIALOG,
  props: {
    props: {
      customer: string
      page: string
      email: { role: PermissionsRole } | null
    }
  },
) => void

type TermsConditionLinks = (
  eventName: EventNames.TERMS_CONDITIONS_LINK,
  props: {
    props: {
      customer: string
      page: string
      email: { role: PermissionsRole } | null
    }
  },
) => void

type InactiveCustomerLoginToPortal = (
  eventName: EventNames.INACTIVE_CUSTOMER_LOGIN_PORTAL,
  props: {
    props: {
      customer: string
      active: boolean
      email: { role: PermissionsRole } | null
    }
  },
) => void

type PortalActivated = (
  eventName: EventNames.PORTAL_ACTIVATED,
  props: {
    props: {
      customer: string
      page: string
      email: { role: PermissionsRole } | null
    }
  },
) => void

type SignUpButtonClicked = (eventName: EventNames.SIGNUP_BUTTON_CLICK) => void

type SignUpPageVisit = (eventName: EventNames.SIGNUP_PAGE_VISIT) => void

type PLGAddNewCustomer = (
  eventName: EventNames.PLG_ADD_NEW_CUSTOMER,
  props: {
    props: {
      userEmail: string
    }
  },
) => void

type PLGAddExistingCustomer = (
  eventName: EventNames.PLG_ADD_EXISTING_CUSTOMER,
  props: {
    props: {
      userEmail: string
    }
  },
) => void

type InviteTeammateDialogOpen = (
  eventName: EventNames.INVITE_TEAMMATE_DIALOG_OPEN,
  props: {
    props: {
      userEmail: string | undefined
      customer: string | null
    }
  },
) => void

type InviteTeammateSent = (
  eventName: EventNames.INVITE_TEAMMATE_SENT,
  props: {
    props: {
      userEmail: string | undefined
      customer: string | null
    }
  },
) => void

type RequestNewVideoButtonClick = (
  eventName: EventNames.REQUEST_NEW_VIDEO_BUTTON,
  props: {
    props: {
      userEmail: string | undefined
      customer: string | null
    }
  },
) => void

export interface PlausibleContext {
  isPlausibleLoaded: boolean
  videoDownload: VideoDownload
  linkShare: LinkShare
  socialShare: SocialShare
  inactiveCustomerViewsVideo: InactiveCustomerViewsVideo
  licenseDialog: LicenseDialog
  termsConditionsLink: TermsConditionLinks
  inactiveCustomerLoginToPortal: InactiveCustomerLoginToPortal
  portalActivated: PortalActivated
  signUpButtonClicked: SignUpButtonClicked
  signUpPageVisit: SignUpPageVisit
  plgAddNewCustomer: PLGAddNewCustomer
  plgAddExistingCustomer: PLGAddExistingCustomer
  inviteTeammateDialogOpen: InviteTeammateDialogOpen
  inviteTeammateSent: InviteTeammateSent
  requestNewVideoButtonClick: RequestNewVideoButtonClick
}

export const PlausibleContext = React.createContext<PlausibleContext | null>(
  null,
)
