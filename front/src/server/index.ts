// https://qiita.com/chocomintkusoyaro/items/9df366fd5c119ab6b90e
// https://blog.ryou103.com/post/nuxtjs-ssl/
// 開発環境のみカスタムサーバで起動しhttps化する
import fs from 'fs'
import https from 'https'
import express, { Request, Response } from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = 3000 //process.env.PORT || 3000

async function main() {
  try {
    await app.prepare()
    const server = express()
    server.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    const options =
      process.env.NODE_ENV === 'development'
        ? {
            key: fs.readFileSync(`${__dirname}/cert/localhost+1-key.pem`),
            cert: fs.readFileSync(`${__dirname}/cert/localhost+1.pem`),
          }
        : {}

    https.createServer(options, server).listen(port, (err?: unknown) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
