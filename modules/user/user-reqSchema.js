
var Validator = require('jsonschema').Validator;
var v = new Validator();


let schemas = function () {

}

schemas.login = {
    'type': 'object',
    'properties': {
      'email': {
        'type': 'string',
        'required': true
      },
      'password': {
        'type': 'string',
        'required': true
      },
      'user_type': {
        'type': 'string',
        'required': true
    }
  }
}

module.exports=schemas