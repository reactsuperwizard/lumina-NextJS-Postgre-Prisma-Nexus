import { NewsAPIRes } from 'modules/utils/BigErrorSplash'
import { NextApiHandler } from 'next'

export const handler: NextApiHandler = async (req, res) => {
  // Fetch data from external API
  const news = await fetch(
    `https://newsapi.org/v2/everything?q=AWS+Outage&apiKey=305f883452d74d10b80593b0f5d25301`,
  )
  const data: NewsAPIRes = await news.json()

  // Pass data to the page via props
  res.json(data)
}

export default handler
