
const lodash =require('lodash');
const constants = require('../utils/constants')



let sanitize =  (object, schema, modelName)=> {
    let schemaKeys = lodash.keys(schema.properties)
    let objectKeys = lodash.keys(object)
    let constantsValues = lodash.values(constants.keys)
    for (let key in objectKeys) {
      let isValueMatched = false
      for (let index in constantsValues) {
        if (constantsValues[index].indexOf(objectKeys[key].substring(0, constantsValues[index].length)) === 0) {
          isValueMatched = true
          break
        }
      }
      if (!isValueMatched && schemaKeys.indexOf(objectKeys[key]) === -1) {   
        delete object[objectKeys[key]]
      } else {
        let propertyList = lodash.keys(schema.properties[objectKeys[key]])
        for (let index = 0; index < propertyList.length; index++) {
          if (propertyList[index] === '$ref') {
            let refValue = schema.properties[objectKeys[key]]
            let schemas = require('../modules/' + modelName + '/' + modelName + '-schema')
            let refSchema = refValue.$ref.substring(1, refValue.$ref.length)
            sanitize(object[objectKeys[key]], schemas[refSchema])
          }
        }
      }
    }
   
    return object
  }

  module.exports = {
     sanitize
  }
  