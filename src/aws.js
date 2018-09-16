import AWS from 'aws-sdk'

import store from './store'

import { EventBus } from './event-bus'

// @TODO import store module
const lambdaConfig = {
  apiVersion: '2015-03-31',
  region: process.env.STAYWOKE_AWS_REGION
}

export const AMZ = {
  Lambda: {
    /**
     * Single method to fetch lambda function
     *
     * @param {Function} fn Name of Lambda Function
     * @param {Mixed} data Either an Object or JSON Stringified String of Lambda Payload
     * @param {Function} callback Callback Function
     *
     * @return {Promise}
     */
    fetch: (fn, data, callback) => {
      const user = store.getters.getUserAccount

      return (user)
        ? AMZ.Lambda.callPrivate(fn, data, callback)
        : AMZ.Lambda.callPublic(fn, data, callback)
    },

    /**
     * Call named lambda function that does not require user specific data
     *
     * @param {Function} fn Name of Lambda Function
     * @param {Mixed} data Either an Object or JSON Stringified String of Lambda Payload
     * @param {Function} callback Callback Function
     *
     * @return {Promise}
     */
    callPublic: (fn, data, callback) => {
      if (typeof data !== 'string') {
        data = JSON.stringify(data)
      }

      AWS.config.region = process.env.STAYWOKE_AWS_REGION
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.STAYWOKE_AWS_UNAUTH_IDENTITY_POOL_ID
      })
      AWS.config.credentials.params.IdentityId = null
      AWS.config.credentials.params.Logins = null

      const lambda = new AWS.Lambda(lambdaConfig)

      const promise = new Promise((resolve, reject) => {
        lambda.invoke({
          FunctionName: fn,
          Payload: data
        }, (err, response) => {
          if (err || !response || !response.Payload) {
            return reject(new Error(err || 'unknown error executing lambda function'))
          }

          const payload = JSON.parse(response.Payload)
          const hasError = (typeof payload !== 'undefined' && typeof payload.errorMessage !== 'undefined')
          const errorMessage = (typeof payload !== 'undefined' && typeof payload.errorMessage !== 'undefined')
            ? payload.errorMessage
            : 'An Unknown Error has Occured'

          return (payload && !hasError)
            ? resolve(payload)
            : reject(new Error(errorMessage))
        })
      })

      if (callback && typeof callback === 'function') {
        return promise.then(callback.bind(null, null), callback)
      }

      return promise
    },

    /**
     * Call named lambda function that may have user specific data
     *
     * @param {Function} fn Name of Lambda Function
     * @param {Mixed} data Either an Object or JSON Stringified String of Lambda Payload
     * @param {Function} callback Callback Function
     *
     * @return {Promise}
     */
    callPrivate: (fn, data, callback) => {
      if (typeof data !== 'string') {
        data = JSON.stringify(data)
      }

      const user = store.getters.getUserAccount

      if (!user) {
        return
      }

      const refreshFunction = AMZ.Credentials.needsRefresh()
        ? AMZ.Credentials.refresh.bind(AMZ)
        : AMZ.Credentials.set.bind(AMZ)

      const promise = new Promise((resolve, reject) => {
        refreshFunction(user, (err) => {
          if (err) {
            return reject(new Error(err || 'unknown error executing lambda function'))
          }

          const lambda = new AWS.Lambda(lambdaConfig)

          lambda.invoke({
            FunctionName: fn,
            Payload: data
          }, (err, response) => {
            if (err || !response || !response.Payload) {
              return callback(err || 'unknown error executing lambda function')
            }

            const payload = JSON.parse(response.Payload)
            const hasError = (typeof payload !== 'undefined' && typeof payload.errorMessage !== 'undefined')
            const errorMessage = (typeof payload !== 'undefined' && typeof payload.errorMessage !== 'undefined')
              ? payload.errorMessage
              : 'An Unknown Error has Occured'

            return (payload && !hasError)
              ? resolve(payload)
              : reject(new Error(errorMessage))
          })
        })
      })

      if (callback && typeof callback === 'function') {
        return promise.then(callback.bind(null, null), callback)
      }

      return promise
    }
  },
  Credentials: {
    needsRefresh () {
      let expireTime, user, lastLogin

      if (AWS.config && AWS.config.credentials && AWS.config.credentials.expireTime) {
        expireTime = AWS.config.credentials.expireTime
      } else {
        user = store.getters.getUserAccount

        if (!user) {
          return
        }

        expireTime = user.rawCredentials.Credentials.Expiration
        lastLogin = user.lastLoginDate
      }

      const minutesInThreeWeeks = 30240
      const timeSinceLastLogin = (new Date() - new Date(lastLogin)) / 60000

      if (timeSinceLastLogin > minutesInThreeWeeks) {
        EventBus.$emit('SESSION_EXPIRED')
      }

      const expiresIn = (new Date(expireTime) - new Date()) / 60000
      return expiresIn < 0
    },
    refresh (user, callback) {
      user = user || store.getters.getUserAccount

      if (!user) {
        return
      }

      AWS.config.region = process.env.STAYWOKE_AWS_REGION
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.STAYWOKE_AWS_UNAUTH_IDENTITY_POOL_ID
      })

      const sts = new AWS.STS()
      AWS.config.credentials = sts.credentialsFrom(user.rawCredentials)
      const payload = { userId: user.id }

      AMZ.Lambda.callPublic('refreshCredentials', payload, (err, user) => {
        if (err) {
          return callback(err)
        }

        const stsRefresh = new AWS.STS()
        AWS.config.credentials = stsRefresh.credentialsFrom(user.rawCredentials)
        store.dispatch('userLogin', user)

        return callback(null)
      })
    },
    set (user, callback) {
      AWS.config.region = process.env.STAYWOKE_AWS_REGION
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.STAYWOKE_AWS_UNAUTH_IDENTITY_POOL_ID
      })

      const sts = new AWS.STS()
      AWS.config.credentials = sts.credentialsFrom(user.rawCredentials)

      return callback(null)
    }
  }
}
