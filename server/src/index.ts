import mongoose from 'mongoose'
import { IS_DEV, MONGO_URL, PORT } from './env'
import { app } from './koa'
import { awaitCacheDB, awaitRateLimitDB } from './redis'
import './strategies'
import signale, { panic } from './utils/signale'

if (IS_DEV) signale.warn('Running in development environment!')
mongoose.set('useCreateIndex', true)
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    signale.info(`Connected to MongoDB ${IS_DEV ? 'Instance' : 'Cluster'}`)
    return Promise.all([awaitCacheDB(), awaitRateLimitDB()])
  })
  .then(() => {
    app.listen(PORT).on('listening', () => {
      signale.start(`Listening over HTTP on port ${PORT}`)
    })
  })
  .catch(err => {
    signale.fatal(
      `Failed to connect to MongoDB ${IS_DEV ? 'Instance' : 'Cluster'}!`
    )

    return panic(err)
  })
