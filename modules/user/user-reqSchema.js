
var Validator = require('jsonschema').Validator;
var v = new Validator();


let schemas =  ()=>{

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


schemas.editUser = {
  'type': 'object',
  'properties': {
    'email': {
      'type': 'string',
      'required': true
    },
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
    'user_type': {
      'type': 'string',
      'required': true
    }
  }
}

schemas.allborrowedbook = {
  'type': 'object',
  'properties': {
    'email': {
      'type': 'string',
      'required': true
    }
  }
}

schemas.borrow = {
  'type': 'object',
  'properties': {
    'email': {
      'type': 'string',
      'required': true
    },
    'book_name':{
      'type': 'string',
      'required': true
    },
    'borrow_book':{
      'type': 'integer',
      'required': true
    }
  }
}


schemas.returnBook = {
  'type': 'object',
  'properties': {
    'email': {
      'type': 'string',
      'required': true
    },
    'book_name':{
      'type': 'string',
      'required': true
    },
    'return_book':{
      'type': 'integer',
      'required': true
    },
    'return_date':{
      'type':'dateonly',
      'required': true
    }
  }
}

schemas.viewDays = {
  'type': 'object',
  'properties': {
    'email': {
      'type': 'string',
      'required': true
    },
    'book_name':{
      'type': 'string',
      'required': true
    }
  }
}

schemas.recommendbook = {
  'type': 'object',
  'properties': {
    'email': {
      'type': 'string',
      'required': true
    },
    'book_name':{
      'type': 'string',
      'required': true
    },
    'recommend':{
      'type': 'string',
      'required': true
    }
  }
}

schemas.ratebook = {
  'type': 'object',
  'properties': {
    'email': {
      'type': 'string',
      'required': true
    },
    'book_name':{
      'type': 'string',
      'required': true
    },
    'rate_book':{
      'type': 'float',
      'required': true
    }
  }
}

schemas.favbook = {
  'type': 'object',
  'properties': {
    'email': {
      'type': 'string',
      'required': true
    },
    'book_name':{
      'type': 'string',
      'required': true
    }
  }
}


schemas.removefavbook = {
  'type': 'object',
  'properties': {
    'email': {
      'type': 'string',
      'required': true
    },
    'book_name':{
      'type': 'string',
      'required': true
    }
  }
}


schemas.listfavbook = {
  'type': 'object',
  'properties': {
    'email': {
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

module.exports=schemas
