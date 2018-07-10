import AWS from 'aws-sdk'

import { tempStore } from './store/modules/store'

// @TODO import store module
const lambdaConfig = {
  apiVersion: '2015-03-31',
  region: process.env.STAYWOKE_AWS_REGION
}

export const AMZ = {
  callLambda (functionName, data, callback) {
    if (typeof data !== 'string') {
      data = JSON.stringify(data)
    }

    const lambda = new AWS.Lambda(lambdaConfig)
    const promise = new Promise((resolve, reject) => {
      lambda.invoke({
        FunctionName: functionName,
        Payload: data
      }, (err, response) => {
        if (err || !response || !response.Payload) {
          console.log(err || 'unknown error executing lambda function')
          return reject(new Error(err || 'unknown error executing lambda function'))
        }

        response = JSON.parse(response.Payload)

        if (response && response.errorMessage) {
          return reject(new Error(response.errorMessage))
        }

        return resolve(response)
      })
    })

    if (callback && typeof callback === 'function') {
      return promise.then(callback.bind(null, null), callback)
    }

    return promise
  },

  setCredentials (rawCredentials) {
    var sts = new AWS.STS()
    AWS.config.credentials = sts.credentialsFrom(rawCredentials)
  },

  initLogin () {
    AWS.config.region = process.env.STAYWOKE_AWS_REGION
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.STAYWOKE_AWS_UNAUTH_IDENTITY_POOL_ID
    })
    AWS.config.credentials.params.IdentityId = null
    AWS.config.credentials.params.Logins = null
  },

  refreshCredentials () {
    var expireTime

    if (AWS.config && AWS.config.credentials && AWS.config.credentials.expireTime) {
      expireTime = AWS.config.credentials.expireTime
    } else {
      var user = tempStore.get('user')

      if (!user) {
        return // @TODO: send user to login page
      }

      expireTime = user.rawCredentials.Credentials.Expiration
    }

    var expiresIn = (new Date(expireTime) - new Date()) / 60000 // in minutes
    if (expiresIn < 30) {
      AMZ.getCredentials(user)
    }
  },

  getCredentials (user) {
    user = user || tempStore.get('user')
    if (!user) {
      return // @TODO: send user to login page
    }

    var payload = {
      userId: user.id
    }

    return AMZ.callLambda('refreshCredentials', payload).then(user => {
      var sts = new AWS.STS()
      AWS.config.credentials = sts.credentialsFrom(user.rawCredentials)
      tempStore.put('user', user)
    })
  },

  // @TODO: invoke fn on index plage - reinstantiate aws & cognito config on refresh using user creds from localStorage
  initIndex () {
    var user = tempStore.get('user')
    if (!user) {
      return // @TODO: send user to login page
    }

    AWS.config.region = process.env.STAYWOKE_AWS_REGION
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.STAYWOKE_AWS_UNAUTH_IDENTITY_POOL_ID
    })

    var sts = new AWS.STS()

    AWS.config.credentials = sts.credentialsFrom(user.rawCredentials)
  }
}
