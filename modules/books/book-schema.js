
var Validator = require('jsonschema').Validator;
var v = new Validator();


let schemas = () => {

}


schemas.booklist = {
    'type': 'object',
    'properties': {
        "author_name": {
            'type': 'string',
            'required': true
        }
    }
}


schemas.validate = function (object, schema) {
    let errors = v.validate(object, schema).errors
    if (errors.length > 0) {
        console.log('Schema validation failed for id:- %s errors:- %j', schema, errors);
    }
    return errors.length <= 0
}

module.exports = schemas