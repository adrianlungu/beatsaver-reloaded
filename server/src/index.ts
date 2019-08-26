import mongoose from 'mongoose'
import {ELASTIC_DISABLED, ELASTIC_HOST, ELASTIC_PORT, IS_DEV, MONGO_URL, PORT,} from './env'
import {app} from './koa'
import {awaitCacheDB, awaitRateLimitDB} from './redis'
import './strategies'
import './tasks'
import axios from './utils/axios'
import signale, {panic} from './utils/signale'
import Beatmap from './mongo/models/Beatmap'

if (IS_DEV) signale.warn('Running in development environment!')
mongoose.set('useCreateIndex', true)
mongoose
  .connect(MONGO_URL, {useNewUrlParser: true})
  .then(() => {
    signale.info(`Connected to MongoDB ${IS_DEV ? 'Instance' : 'Cluster'}`)
    return Promise.all([awaitCacheDB(), awaitRateLimitDB()])
  })
  .then(() => {
    try {
      if (!ELASTIC_DISABLED) {
        axios.get(`http://${ELASTIC_HOST}:${ELASTIC_PORT}`)
        signale.info('Connected to Elasticsearch instance!')

        axios.get(`http://${ELASTIC_HOST}:${ELASTIC_PORT}/beatmaps`).then((response) => {
        }, (error) => {
          if (error.response.status == 404) {
            Beatmap.synchronize();
          }
        })

      }
    } catch (err) {
      signale.fatal('Failed to connect to Elasticsearch!')
      process.exit(1)
    }

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
