
var convict = require('convict');
const path = require('path')

 
// convict.addFormat(require('convict-format-with-validator').ipaddress);
 
// Define a schema
var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['producation', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  
  cluster: {
    workerCount: {
      doc: 'No of worker Thread',
      format: Number,
      default: 12
    },
  },

 server:{  
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 5000,
    env: 'PORT',
    arg: 'port'
  },
  timeout: {
    doc: 'Server Timeout',
    format: 'Number',
    default: 60000
  },
  enableHttpLogging: {
    doc: 'Enable HTTP Logging',
    format: Boolean,
    default: true
  },
  enableCompression: {
    doc: 'Enable HTTP compression',
    format: Boolean,
    default: true
  },
  security: {
    enableXframe: {
      doc: 'Enable Iframe protection',
      format: Boolean,
      default: true
    },
    enableHidePoweredBy: {
      doc: 'Hide X powered by Header',
      format: Boolean,
      default: true
    },
    enableNoCaching: {
      doc: 'Enable No caching',
      format: Boolean,
      default: true
    },
    enableCSP: {
      doc: 'Enable CSP policy',
      format: Boolean,
      default: false
    },
    enableHSTS: {
      doc: 'Enable HSTS',
      format: Boolean,
      default: true
    },
    enableXssFilter: {
      doc: 'Enable XSS filter protection',
      format: Boolean,
      default: true
    },
    enableForceContentType: {
      doc: 'Enable force content type',
      format: Boolean,
      default: false
    },
    salt: {
      doc: 'Server Security Salt',
      format: String,
      default: '$2a$10$e.oPc.dyrwRoQCpDvO9Rhe'
    }

  },
  bodyParser: {
    limit: {
      doc: 'maximum request body size',
      format: String,
      default: '100kb'
    }
  }

},
  mysql: {
  
    host: {
        doc: 'Holds the SQL Server Host',
        format: String,
        default: 'localhost'
      },
      port: {
        doc: 'Holds the SQL Server Port',
        format: Number,
        default: 3306
      },
      username: {
        doc: 'Holds the SQL Server Username',
        format: String,
        default: 'root'
      },
      password: {
        doc: 'Holds the SQL Server Password',
        format: String,
        default: ''
      },
      database: {
        doc: 'Holds the Database In SQL Server',
        format: String,
        default: 'bookclub'
      },
      //this Sequelizer uses to talk with Mysql
      dialect: {
        doc: 'Holds the Dialect Details That we are using for the Connection',
        format: String,
        default: 'mysql'
      },
      connectTimeout: {
        doc: 'Holds the Connection Timeout Time in ms',
        format: Number,
        default: 10000
      },
      pool: {
        max: {
          doc: 'Holds the Maximum SQL Pool Size',
          format: Number,
          default: 5
        },
        min: {
          doc: 'Holds the Minimum SQL Pool Size',
          format: Number,
          default: 0
        },
        acquire: {
          doc: 'Holds the Value for the time to Acquire the SQL Connection.',
          format: Number,
          default: 30000
        },
        idle: {
          doc: 'Holds the Idle Time for SQL To Reset the Connection.',
          format: Number,
          default: 10000
        }
      },
      dialectOptions: {
        multipleStatements: {
          doc: 'Whether to allow Multiple SQL Statements or not',
          format: Boolean,
          default: true
        }
      },
      logging: {
        doc: 'Whether Logging is Enabled or not',
        format: Boolean,
        default: true
      }

  },
  admins: {
    doc: 'Users with write access, or null to grant full access without login.',
    format: Array,
    nullable: true,
    default: null
  }
 } )
 
// Load environment dependent configuration
var env = config.get('env');
config.loadFile(path.join(__dirname, '/config-' + env + '.json'))
 
// Perform validation
config.validate();



module.exports = config;



