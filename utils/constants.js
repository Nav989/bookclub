let constants = {
    httpStatusCode: {
      success: 200,
      unauthorised: 401,
      forbidden: 403,
      badRequest: 400
    },
    responseCodes: {
      successfulOperation: 200,
      noContent: 204,
      failedOperation: 500,
      unauthorizedAccess: 401,
      invalidOTP: 402,
      revalidation: 400,
      limitExceeded: 402
    },
    rqstHeaders: {
      langCode: 'language_code'
    },
    messageKeys: {
      en: {
        msg_success: 'Successful Operation',
        msg_failed: 'Something went wrong',
        msg_unauthorised: 'Unauthorized access',
        msg_invalid: 'Please enter valid User ID or Password',
        msg_invalid_email:'please enter valid email ID',
        msg_invalid_OTP: 'please enter correct OTP',
         msg_invalid_system: 'Not a Valid System User. Please Register the User to the System',
        msg_revalidate: 'Schema Validation Failed',
        msg_alreadyExists: ' user already exists',
        msg_notExists: 'This email and bookname Record does not exists',
        msg_invalid_author: 'Invalid author name',
        msg_password_same: 'Old Password and New Password is same'
      }
    },
    moduleNames: {
      user: 'user',
      author: 'author',
      admin: 'admin',
      books: 'books'
    },
    uniqueColumn: {
      en: {
        email: 'email',
        user: 'User',
        role_name: 'Role name',
        faq_name: 'FAQ name',
        about_us_name: 'About Us',
        contact_us_name: 'Contact Us'
      }
    }
  }
  
  module.exports = constants