var Validator = require('jsonschema').Validator;
var v = new Validator();


let schemas = () => {

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


schemas.register = {
    'type': 'object',
    'properties': {
        'name': {
            'type': 'string',
            'required': true
        },
        'surname': {
            'type': 'string',
            'required': true
        },
        'dob': {
            'type': 'string',
            'required': true
        },
        'email': {
            'type': 'string',
            'required': true
        },
        'password': {
            'type': 'string',
            'required': true
        },
        'cpassword': {
            'type': 'string',
            'required': true
        },
        'user_type': {
            'type': 'string',
            'required': true
        }
    }
}

schemas.emailSend = {
    'type': 'object',
    'properties': {
        'email': {
            'type': 'string',
            'required': true
        }
    }
}

schemas.changePassword = {
    'type': 'object',
    'properties': {
        'email': {
            'type': 'string',
            'required': true
        },
        'otp': {
            'type': 'string',
            'required': true
        },
        'password': {
            'type': 'string',
            'required': true
        }
    }
}

schemas.addbook = {
    'type': 'object',
    'properties': {
        "book_image": {
            'type': 'string',
            'required': true
        },
        "book_name": {
            'type': 'string',
            'required': true
        },
        "author_name": {
            'type': 'string',
            'required': true
        },
        "availability_status": {
            'type': 'string',
            'required': true
        },
        "page_count": {
            'type': 'integer',
            'required': true
        },
        "description": {
            'type': 'string',
            'required': true
        },
        "publish_Date": {
            'type': 'dateonly',
            'required': true
        },
        "quantity": {
            'type': 'integer',
            'required': true
        }
    }
}

schemas.editbook = {
    'type': 'object',
    'properties': {
        "book_image": {
            'type': 'string',
            'required': true
        },
        "book_name": {
            'type': 'string',
            'required': true
        },
        "author_name": {
            'type': 'string',
            'required': true
        },
        "availability_status": {
            'type': 'string',
            'required': true
        },
        "publish_Date": {
            'type': 'dateonly',
            'required': true
        },
        "quantity": {
            'type': 'integer',
            'required': true
        }
    }
}


schemas.listbook = {
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