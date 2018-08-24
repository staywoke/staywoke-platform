import AWS from 'aws-sdk'

import { tempStore } from './store/modules/store'

// @TODO import store module
const lambdaConfig = {
  apiVersion: '2015-03-31',
  region: process.env.STAYWOKE_AWS_REGION
}

export const AMZ = {

  Lambda: {
    callPublic: function(fn, data, callback) {
      if(typeof data !== 'string') {
        data = JSON.stringify(data)
      }

      AWS.config.region = process.env.STAYWOKE_AWS_REGION
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.STAYWOKE_AWS_UNAUTH_IDENTITY_POOL_ID,
      })
      AWS.config.credentials.params.IdentityId = null
      AWS.config.credentials.params.Logins = null
      var lambda = new AWS.Lambda(lambdaConfig)
      
      const promise = new Promise((resolve, reject) => {
        lambda.invoke({
            FunctionName: fn,
            Payload: data
        }, function (err, response) {
            if(err || !response || !response.Payload) {
                console.log(err || 'unknown error executing lambda function')
                return reject(new Error(err || 'unknown error executing lambda function'))                          
            }

            response = JSON.parse(response.Payload)
            if(response && response.errorMessage) {
              return reject(new Error(response.errorMessage))
            }

            return resolve(response);
        })
      })

      if (callback && typeof callback === 'function') {
        return promise.then(callback.bind(null, null), callback)
      }

      return promise
    },

    callPrivate: function(fn, data, callback){
      if(typeof data !== 'string') {
          data = JSON.stringify(data)
      }

      var user = tempStore.get('user')
      if(!user){
        return
      }

      var refreshFunction = AMZ.Credentials.needsRefresh() ? AMZ.Credentials.refresh.bind(AMZ) : AMZ.Credentials.set.bind(AMZ);
      
      const promise = new Promise((resolve, reject) => {
        refreshFunction(user, function(err){
          if(err){
            return reject(new Error(err || 'unknown error executing lambda function'))
          }
          var lambda = new AWS.Lambda(lambdaConfig)
          lambda.invoke({
              FunctionName: fn,
              Payload: data
          }, function (err, response) {
              if(err || !response || !response.Payload) {
                  console.log(err || 'unknown error executing lambda function');
                  return callback(err || 'unknown error executing lambda function');                           
              }

              response = JSON.parse(response.Payload);
              if(response && response.errorMessage) {
                return reject(new Error(response.errorMessage))
              }

              return resolve(response)
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
    needsRefresh (){
      var expireTime, user, lastLogin 
      if (AWS.config && AWS.config.credentials && AWS.config.credentials.expireTime){
        expireTime = AWS.config.credentials.expireTime
      }
      else {
        user = tempStore.get('user')
        if (!user){
          return
        }
        expireTime = user.rawCredentials.Credentials.Expiration
        lastLogin = user.lastLoginDate
      }

      var minutesInThreeWeeks = 30240
      var timeSinceLastLogin = ( new Date() - new Date(lastLogin))/ 60000
      if (timeSinceLastLogin > minutesInThreeWeeks){
          // TODO: remove user from localStorage and direct user to login page 
      }

      var expiresIn = ( new Date(expireTime) - new Date() )/ 60000
      return expiresIn < 0
    }, 
    refresh (user, callback){
      user = user || tempStore.get('user')
      if (!user){
          return
      }

      AWS.config.region = process.env.STAYWOKE_AWS_REGION
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.STAYWOKE_AWS_UNAUTH_IDENTITY_POOL_ID,
      })
      var sts = new AWS.STS();
      AWS.config.credentials = sts.credentialsFrom(user.rawCredentials);
      var payload = { userId: user.id };
      AMZ.Lambda.callPublic('refreshCredentials', payload, function(err, user){
          if (err){
              return callback(err);
          }
          var sts = new AWS.STS();
          AWS.config.credentials = sts.credentialsFrom(user.rawCredentials);
          tempStore.put('user', user);
          return callback(null);
      });
    },
    set(user, callback){
      AWS.config.region = process.env.STAYWOKE_AWS_REGION
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.STAYWOKE_AWS_UNAUTH_IDENTITY_POOL_ID,
      })
      var sts = new AWS.STS();
      AWS.config.credentials = sts.credentialsFrom(user.rawCredentials);
      return callback(null);
    }
  }
}