import sgMail from '@sendgrid/mail'
interface OnboardingEmailTemplateData {
  firstName: string
  onboardingLink: string
}

interface OnboardingMsg {
  to: string
  from: 'sarah@lumina.co'
  templateId: 'd-9f13d29953094288a98c9bdb9d565f50'
  dynamicTemplateData: OnboardingEmailTemplateData
}

export const sendOnBoardingEmail = async ({
  email,
  firstName,
  onboardingLink,
}: { email: string } & OnboardingEmailTemplateData): Promise<boolean> => {
  const dynamicTemplateData: OnboardingEmailTemplateData = {
    firstName,
    onboardingLink,
  }
  const msg: OnboardingMsg = {
    to: email,
    from: 'sarah@lumina.co',
    templateId: 'd-9f13d29953094288a98c9bdb9d565f50',
    dynamicTemplateData,
  }

  try {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

    if (!SENDGRID_API_KEY) {
      throw new Error('Make sure you havea SENDGRID_API_KEY!')
    }

    sgMail.setApiKey(SENDGRID_API_KEY)
    await sgMail.send(msg)
    return true
  } catch (e) {
    throw e
  }
}

interface OrderCompleteTemplateData {
  webLink: string
}
interface OrderCompleteMsg {
  to: string[]
  from: 'hello@lumina.co'
  templateId: 'd-28fbab0863d143fb8071b12cdaa0cc58'
  dynamicTemplateData: OrderCompleteTemplateData
}

export const sendOrderCompleteEmail = async (
  email: string[],
  webLink: string,
) => {
  const dynamicTemplateData: OrderCompleteTemplateData = {
    webLink,
  }
  const msg: OrderCompleteMsg = {
    to: email,
    from: 'hello@lumina.co',
    templateId: 'd-28fbab0863d143fb8071b12cdaa0cc58',
    dynamicTemplateData,
  }
  try {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

    if (!SENDGRID_API_KEY) {
      throw new Error('Make sure you have a SENDGRID_API_KEY!')
    }
    sgMail.setApiKey(SENDGRID_API_KEY)
    await sgMail.sendMultiple(msg)
  } catch (e) {
    throw e
  }
}
interface TeammateInvitationTemplateData {
  sendersFirstName: string
  customer: string
  email: string
}
interface TeammateInvitationMsg {
  to: string[]
  from: 'hello@lumina.co'
  templateId: string
  dynamicTemplateData: TeammateInvitationTemplateData
}

export const sendTeammateInvitations = async (
  emails: string[],
  sendersFirstName: string,
  customer: string,
  email: string,
  type: string,
) => {
  try {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

    if (!SENDGRID_API_KEY) {
      throw new Error('Make sure you have a SENDGRID_API_KEY!')
    }
    sgMail.setApiKey(SENDGRID_API_KEY)
    for (const email of emails) {
      const dynamicTemplateData: TeammateInvitationTemplateData = {
        sendersFirstName,
        customer,
        email,
      }
      const msg: TeammateInvitationMsg = {
        to: [email],
        from: 'hello@lumina.co',
        templateId:
          type === 'HOME_PAGE'
            ? 'd-ecbba3688a7648f083eb3b25a4409a02'
            : 'd-f63234ea35f44510b8aac7aadc394ee8',
        dynamicTemplateData,
      }
      await sgMail.sendMultiple(msg)
    }
  } catch (e) {
    throw e
  }
}
