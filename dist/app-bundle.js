/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\r\nvar session = __webpack_require__(/*! express-session */ \"express-session\");\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar favicon = __webpack_require__(/*! static-favicon */ \"static-favicon\");\r\nvar logger = __webpack_require__(/*! morgan */ \"morgan\");\r\nvar cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\r\nvar flash = __webpack_require__(/*! connect-flash */ \"connect-flash\");\r\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\r\nvar orm = __webpack_require__(/*! orm */ \"orm\");\r\nvar expressValidator = __webpack_require__(/*! express-validator */ \"express-validator\");\r\nvar passport = __webpack_require__(/*! passport */ \"passport\");\r\nvar LocalStrategy = __webpack_require__(/*! passport-local */ \"passport-local\").Strategy;\r\n\r\nvar users = __webpack_require__(/*! ./routes/users */ \"./routes/users.js\");\r\nvar pads = __webpack_require__(/*! ./routes/pads */ \"./routes/pads.js\");\r\nvar notes = __webpack_require__(/*! ./routes/notes */ \"./routes/notes.js\");\r\nvar settings = __webpack_require__(/*! ./settings */ \"./settings.js\")\r\n\r\nvar app = express();\r\n\r\n\r\n// view engine setup\r\napp.set('views', path.join(__dirname, 'views'));\r\napp.set('view engine', 'jade');\r\n\r\napp.use(favicon());\r\napp.use(logger('dev'));\r\napp.use(bodyParser.json());\r\napp.use(bodyParser.urlencoded());\r\napp.use(expressValidator());\r\napp.use(cookieParser());\r\napp.use(session({cookie: { maxAge: 60000 }, secret: 'secret'}));\r\napp.use(flash());\r\napp.use(passport.initialize());\r\napp.use(passport.session());\r\napp.use(express.static(path.join(__dirname, 'public')));\r\n\r\n// DB configuration\r\nvar sqlite3 = __webpack_require__(/*! sqlite3 */ \"sqlite3\").verbose();\r\nvar db = new sqlite3.Database(settings.db);\r\n\r\norm.settings.set(\"instance.returnAllErrors\", true);\r\napp.use(orm.express(settings.dsn, {\r\n  define: function (db, models, next) {\r\n    db.load(\"./models\", function (err) {\r\n      models.User = db.models.users;\r\n      models.Pad = db.models.pads;\r\n      models.Note = db.models.notes;\r\n      next();\r\n    });\r\n  }\r\n}));\r\n\r\n// Flash Messages configuration\r\napp.use(function(req, res, next){\r\n  res.locals.flash_messages = {\r\n    'success': req.flash('success'),\r\n    'error': req.flash('error')\r\n  }\r\n  next();\r\n});\r\n\r\n// Inject request object and user pads in view scope\r\napp.use(function(req, res, next){\r\n  res.locals.req = req;\r\n\r\n  if (req.isAuthenticated()) {\r\n    req.user.getPads(function(i, pads) {\r\n      res.locals.pads = pads;\r\n      next();\r\n    });\r\n  } else {\r\n    next();\r\n  }\r\n});\r\n\r\napp.use('/', users);\r\napp.use('/', pads);\r\napp.use('/', notes);\r\n\r\n/// catch 404 and forward to error handler\r\napp.use(function(req, res, next) {\r\n  var err = new Error('Not Found');\r\n  err.status = 404;\r\n  next(err);\r\n});\r\n\r\n// development error handler\r\n// will print stacktrace\r\nif (app.get('env') === 'development') {\r\n  app.use(function(err, req, res, next) {\r\n    res.status(err.status || 500);\r\n    res.render('error', {\r\n      message: err.message,\r\n      error: err\r\n    });\r\n  });\r\n}\r\n\r\n// production error handler\r\n// no stacktraces leaked to user\r\napp.use(function(err, req, res, next) {\r\n  res.status(err.status || 500);\r\n  res.render('error', {\r\n    message: err.message,\r\n    error: {}\r\n  });\r\n});\r\n\r\nmodule.exports = app;\r\n\n\n//# sourceURL=webpack://notejam/./app.js?");

/***/ }),

/***/ "./bin/www":
/*!*****************!*\
  !*** ./bin/www ***!
  \*****************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("//usr/bin/env node\r\nvar debug = __webpack_require__(/*! debug */ \"debug\")('notejam');\r\nvar app = __webpack_require__(/*! ../app */ \"./app.js\");\r\n\r\napp.set('port', process.env.PORT || 3000);\r\n\r\nvar server = app.listen(app.get('port'), function () {\r\n  debug('Express server listening on port ' + server.address().port);\r\n});\r\n\n\n//# sourceURL=webpack://notejam/./bin/www?");

/***/ }),

/***/ "./helpers.js":
/*!********************!*\
  !*** ./helpers.js ***!
  \********************/
/***/ ((module) => {

eval("module.exports = {\r\n  formatFormErrors: function(errors) {\r\n    formatted = {};\r\n    errors.forEach(function(e) {\r\n      formatted[e.param] = e.msg;\r\n    });\r\n    return formatted;\r\n  },\r\n\r\n  formatModelErrors: function(errors) {\r\n    formatted = {};\r\n    errors.forEach(function(e) {\r\n      formatted[e.property] = e.msg;\r\n    });\r\n    return formatted;\r\n  },\r\n\r\n  loginRequired: function (req, res, next) {\r\n    if (req.isAuthenticated()) { return next(); }\r\n    res.redirect('/signin')\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://notejam/./helpers.js?");

/***/ }),

/***/ "./routes/notes.js":
/*!*************************!*\
  !*** ./routes/notes.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\r\nvar router = express.Router();\r\nvar orm = __webpack_require__(/*! orm */ \"orm\");\r\nvar async = __webpack_require__(/*! async */ \"async\");\r\n\r\nvar helpers = __webpack_require__(/*! ../helpers */ \"./helpers.js\");\r\n\r\n// All notes (main page)\r\nrouter.get('/', helpers.loginRequired, function(req, res) {\r\n  req.user.getNotes(req.param(\"order\", \"-updated_at\"), function(i, notes) {\r\n    async.map(notes, function(item, cb) {\r\n      item.getPad(function(err, pad) {\r\n        item.pad = pad;\r\n        return cb(null, item);\r\n      })\r\n    }, function(err, results) {\r\n      res.render(\r\n        'notes/list',\r\n        {title: 'All notes (' + results.length + ')', notes: results}\r\n      );\r\n    });\r\n  })\r\n});\r\n\r\n// Create new note\r\nrouter.get('/notes/create', helpers.loginRequired, function(req, res) {\r\n  res.render('notes/create', {padId: req.param('pad')});\r\n});\r\n\r\nrouter.post('/notes/create', helpers.loginRequired, function(req, res) {\r\n  var data = req.body;\r\n  data['user_id'] = req.user.id;\r\n  req.models.Note.create(data, function(err, message) {\r\n    if (err) {\r\n      res.locals.errors = helpers.formatModelErrors(err);\r\n    } else {\r\n      req.flash(\r\n        'success',\r\n        'Note is successfully created'\r\n      );\r\n      return res.redirect('/');\r\n    }\r\n    res.render('notes/create');\r\n  });\r\n});\r\n\r\n// Inject note in request\r\nrouter.use('/notes/:id', function(req, res, next) {\r\n  if (req.user) {\r\n    req.models.Note.one(\r\n      {id: req.param('id'), user_id: req.user.id},\r\n      function(err, note) {\r\n        if (note == null) {\r\n          res.send(404);\r\n          return;\r\n        };\r\n        req.note = note;\r\n        next();\r\n      });\r\n  } else {\r\n    next();\r\n  }\r\n});\r\n\r\n\r\n// View note\r\nrouter.get('/notes/:id', helpers.loginRequired, function(req, res) {\r\n  res.render('notes/view', {note: req.note});\r\n});\r\n\r\n\r\n\r\n// Edit note\r\nrouter.get('/notes/:id/edit', helpers.loginRequired, function(req, res) {\r\n  res.render('notes/edit', {note: req.note});\r\n});\r\n\r\nrouter.post('/notes/:id/edit', helpers.loginRequired, function(req, res) {\r\n  req.note.save(req.body, function(err) {\r\n    if (err) {\r\n      res.locals.errors = helpers.formatModelErrors(err);\r\n      res.render('notes/edit', {note: req.note});\r\n    } else {\r\n      req.flash(\r\n        'success',\r\n        'Note is successfully updated'\r\n      );\r\n      res.redirect('/notes/' + req.note.id);\r\n    }\r\n  });\r\n});\r\n\r\n// Delete note\r\nrouter.get('/notes/:id/delete', helpers.loginRequired, function(req, res) {\r\n  res.render('notes/delete', {note: req.note});\r\n});\r\n\r\nrouter.post('/notes/:id/delete', helpers.loginRequired, function(req, res) {\r\n  req.note.remove(function(err) {\r\n    req.flash(\r\n      'success',\r\n      'Note is successfully deleted'\r\n    );\r\n    res.redirect('/');\r\n  });\r\n});\r\n\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack://notejam/./routes/notes.js?");

/***/ }),

/***/ "./routes/pads.js":
/*!************************!*\
  !*** ./routes/pads.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\r\nvar router = express.Router();\r\nvar orm = __webpack_require__(/*! orm */ \"orm\");\r\n\r\nvar helpers = __webpack_require__(/*! ../helpers */ \"./helpers.js\")\r\n\r\n// Create new pad\r\nrouter.get('/pads/create', helpers.loginRequired, function(req, res) {\r\n  res.render('pads/create');\r\n});\r\n\r\nrouter.post('/pads/create', helpers.loginRequired, function(req, res) {\r\n  var data = req.body;\r\n  data['user_id'] = req.user.id;\r\n  req.models.Pad.create(data, function(err, message) {\r\n    if (err) {\r\n      res.locals.errors = helpers.formatModelErrors(err);\r\n    } else {\r\n      req.flash(\r\n        'success',\r\n        'Pad is successfully created'\r\n      );\r\n      return res.redirect('/');\r\n    }\r\n    res.render('pads/create');\r\n  });\r\n});\r\n\r\n// Inject pad in request\r\nrouter.use('/pads/:id', function(req, res, next) {\r\n  if (req.user) {\r\n    req.models.Pad.one(\r\n      {id: req.param('id'), user_id: req.user.id},\r\n      function(err, pad) {\r\n        if (pad == null) {\r\n          res.send(404);\r\n          return;\r\n        };\r\n        req.pad = pad;\r\n        next();\r\n      });\r\n  } else {\r\n    next();\r\n  }\r\n});\r\n\r\n// Pad notes\r\nrouter.get('/pads/:id', helpers.loginRequired, function(req, res) {\r\n  req.pad.getNotes(req.param(\"order\", \"-updated_at\"), function(i, notes) {\r\n    res.render(\r\n      'pads/list',\r\n      {title: req.pad.name + ' (' + notes.length + ')',\r\n       pad: req.pad, notes: notes}\r\n    );\r\n  });\r\n});\r\n\r\n// Edit pad\r\nrouter.get('/pads/:id/edit', helpers.loginRequired, function(req, res) {\r\n  res.render('pads/edit', {pad: req.pad});\r\n});\r\n\r\nrouter.post('/pads/:id/edit', helpers.loginRequired, function(req, res) {\r\n  req.pad.save({name: req.param('name')}, function(err) {\r\n    if (err) {\r\n      res.locals.errors = helpers.formatModelErrors(err);\r\n      res.render('pads/edit', {pad: req.pad});\r\n    } else {\r\n      req.flash(\r\n        'success',\r\n        'Pad is successfully updated'\r\n      );\r\n      res.redirect('/');\r\n    }\r\n  });\r\n});\r\n\r\n// Delete pad\r\nrouter.get('/pads/:id/delete', helpers.loginRequired, function(req, res) {\r\n  res.render('pads/delete', {pad: req.pad});\r\n});\r\n\r\nrouter.post('/pads/:id/delete', helpers.loginRequired, function(req, res) {\r\n  req.pad.remove(function(err) {\r\n    req.flash(\r\n      'success',\r\n      'Pad is successfully deleted'\r\n    );\r\n    res.redirect('/');\r\n  });\r\n});\r\n\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack://notejam/./routes/pads.js?");

/***/ }),

/***/ "./routes/users.js":
/*!*************************!*\
  !*** ./routes/users.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\r\nvar router = express.Router();\r\nvar debug = __webpack_require__(/*! debug */ \"debug\")('http')\r\nvar orm = __webpack_require__(/*! orm */ \"orm\");\r\nvar passport = __webpack_require__(/*! passport */ \"passport\");\r\nvar LocalStrategy = __webpack_require__(/*! passport-local */ \"passport-local\").Strategy;\r\nvar bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\r\nvar nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\r\nvar stubTransport = __webpack_require__(/*! nodemailer-stub-transport */ \"nodemailer-stub-transport\");\r\n\r\nvar helpers = __webpack_require__(/*! ../helpers */ \"./helpers.js\")\r\nvar settings = __webpack_require__(/*! ../settings */ \"./settings.js\");\r\n\r\n// Sign Up\r\nrouter.get('/signup', function(req, res) {\r\n  res.render('users/signup');\r\n});\r\n\r\nrouter.post('/signup', function(req, res) {\r\n  var data = req.body;\r\n  if (data['password']) {\r\n    data['password'] = generateHash(data['password']);\r\n  };\r\n  req.models.User.create(data, function(err, message) {\r\n    if (err) {\r\n      res.locals.errors = helpers.formatModelErrors(err);\r\n    } else {\r\n      req.flash(\r\n        'success',\r\n        'User is successfully created. Now you can sign in.'\r\n      );\r\n      return res.redirect('/signin');\r\n    }\r\n    res.render('users/signup');\r\n  });\r\n});\r\n\r\n// Sign In\r\nrouter.get('/signin', function(req, res) {\r\n  res.render('users/signin');\r\n});\r\n\r\nrouter.post('/signin', function(req, res, next) {\r\n  req.checkBody('email', 'Email is required').notEmpty();\r\n  req.checkBody('password', 'Password is required').notEmpty();\r\n  if (req.validationErrors()) {\r\n    var errors = helpers.formatFormErrors(req.validationErrors());\r\n  }\r\n\r\n  if (!errors) {\r\n    passport.authenticate('local', function(err, user, info) {\r\n      if (err) { return next(err) }\r\n      if (!user) {\r\n        req.flash('error', info.message);\r\n        return res.redirect('/signin')\r\n      }\r\n      req.logIn(user, function(err) {\r\n        if (err) { return next(err); }\r\n        return res.redirect('/');\r\n      });\r\n    })(req, res, next);\r\n  } else {\r\n    res.locals.errors = errors;\r\n    res.render('users/signin');\r\n  }\r\n});\r\n\r\n// Account settings\r\nrouter.get('/settings', helpers.loginRequired, function(req, res) {\r\n  res.render('users/settings');\r\n});\r\n\r\nrouter.post('/settings', function(req, res, next) {\r\n  req.checkBody('password', 'Password is required').notEmpty();\r\n  req.checkBody('new_password', 'New password is required').notEmpty();\r\n  req.checkBody('confirm_new_password', 'Passwords do not match').equals(\r\n    req.body.new_password\r\n  );\r\n  if (req.validationErrors()) {\r\n    var errors = helpers.formatFormErrors(req.validationErrors());\r\n  }\r\n\r\n  if (!errors) {\r\n    if (!checkPassword(req.user, req.param('password'))) {\r\n      req.flash(\r\n        'error',\r\n        'Current password is not correct'\r\n      );\r\n      return res.redirect('/settings');\r\n    }\r\n    var hash = generateHash(req.param('password'));\r\n    req.user.save({password: hash}, function(err) {\r\n      req.flash(\r\n        'success',\r\n        'Password is successfully changed'\r\n      );\r\n      return res.redirect('/');\r\n    })\r\n  } else {\r\n    res.locals.errors = errors;\r\n    res.render('users/settings');\r\n  }\r\n});\r\n\r\n// Forgot password\r\nrouter.get('/forgot-password', function(req, res) {\r\n  res.render('users/forgot-password');\r\n});\r\n\r\nrouter.post('/forgot-password', function(req, res) {\r\n  req.checkBody('email', 'Email is required').notEmpty();\r\n  if (req.validationErrors()) {\r\n    res.locals.errors = helpers.formatFormErrors(req.validationErrors());\r\n    res.render('users/forgot-password');\r\n    return;\r\n  }\r\n  if (req.models.User.one({email: req.param('email')}, function(err, user) {\r\n    if (user) {\r\n      var password = generateRandomPassword();\r\n      var hash = generateHash(password);\r\n      user.save({password: hash}, function() {\r\n        sendNewPassword(user, password);\r\n        req.flash(\r\n          'success',\r\n          'New password sent to your inbox'\r\n        );\r\n        return res.redirect('/signin');\r\n      });\r\n    } else {\r\n      req.flash(\r\n        'error',\r\n        'No user with given email found'\r\n      );\r\n      return res.redirect('/forgot-password');\r\n    }\r\n  }));\r\n});\r\n\r\n// Sign Out\r\nrouter.get('/signout', function(req, res) {\r\n  req.logout();\r\n  res.redirect('/signin');\r\n});\r\n\r\n\r\n// Helper user functions\r\n// Auth settings\r\npassport.serializeUser(function(user, done) {\r\n  done(null, user.id);\r\n});\r\n\r\npassport.deserializeUser(function(id, done) {\r\n  findById(id, function (err, user) {\r\n    done(err, user);\r\n  });\r\n});\r\n\r\npassport.use(new LocalStrategy(\r\n  {usernameField: 'email', passwordField: 'password'},\r\n  function(username, password, done) {\r\n    findByUsername(username, function(err, user) {\r\n      if (err) {\r\n        return done(err);\r\n      }\r\n      if (!user) {\r\n        return done(null, false, { message: 'Unknown user ' + username });\r\n      }\r\n      if (!checkPassword(user, password)) {\r\n        return done(null, false, { message: 'Invalid password' });\r\n      }\r\n      return done(null, user);\r\n    })\r\n  }\r\n));\r\n\r\nfunction findByUsername(username, fn) {\r\n  orm.connect(settings.dsn, function(err, db) {\r\n    db.load(\"../models\", function (err) {\r\n      var User = db.models.users;\r\n      db.models.users.find({email: username}, function (err, users) {\r\n        if (users.length) {\r\n          return fn(null, users[0]);\r\n        } else {\r\n          return fn(null, null);\r\n        }\r\n      });\r\n    });\r\n  });\r\n}\r\n\r\nfunction findById(id, fn) {\r\n  orm.connect(settings.dsn, function(err, db) {\r\n    db.load(\"../models\", function (err) {\r\n      var User = db.models.users;\r\n      User.get(id, function (err, user) {\r\n        if (err) {\r\n          fn(new Error('User ' + id + ' does not exist'));\r\n        }\r\n        return fn(null, user);\r\n      });\r\n    });\r\n  });\r\n}\r\n\r\nfunction generateHash(password) {\r\n  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));\r\n}\r\n\r\nfunction checkPassword(user, password) {\r\n  return bcrypt.compareSync(password, user.password);\r\n}\r\n\r\nfunction generateRandomPassword() {\r\n  return Math.random().toString(36).replace(/[^a-z]+/g, '');\r\n}\r\n\r\nfunction sendNewPassword(user, password) {\r\n  var mailer = nodemailer.createTransport(stubTransport());\r\n  mailer.sendMail({\r\n    from: 'norepy@notejamapp.com',\r\n    to: user.email,\r\n    subject: 'New notejam password',\r\n    text: 'Your new password: ' + password\r\n  }, function(err, info) {\r\n    // sent mail to console output\r\n    console.log(info.response.toString());\r\n  });\r\n}\r\n\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack://notejam/./routes/users.js?");

/***/ }),

/***/ "./settings.js":
/*!*********************!*\
  !*** ./settings.js ***!
  \*********************/
/***/ ((module) => {

eval("var settings = {\r\n  development: {\r\n    db: \"notejam.db\",\r\n    dsn: \"sqlite://notejam.db\"\r\n  },\r\n  test: {\r\n    db: \"notejam_test.db\",\r\n    dsn: \"sqlite://notejam_test.db\"\r\n  }\r\n};\r\n\r\n\r\nvar env = \"development\"\r\nif (!env) {\r\n  env = 'development'\r\n};\r\nmodule.exports = settings[env];\r\n\n\n//# sourceURL=webpack://notejam/./settings.js?");

/***/ }),

/***/ "async":
/*!***********************************!*\
  !*** external "require('async')" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require('async');

/***/ }),

/***/ "bcrypt":
/*!************************************!*\
  !*** external "require('bcrypt')" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require('bcrypt');

/***/ }),

/***/ "body-parser":
/*!*****************************************!*\
  !*** external "require('body-parser')" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require('body-parser');

/***/ }),

/***/ "connect-flash":
/*!*******************************************!*\
  !*** external "require('connect-flash')" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require('connect-flash');

/***/ }),

/***/ "cookie-parser":
/*!*******************************************!*\
  !*** external "require('cookie-parser')" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require('cookie-parser');

/***/ }),

/***/ "debug":
/*!***********************************!*\
  !*** external "require('debug')" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require('debug');

/***/ }),

/***/ "express":
/*!*************************************!*\
  !*** external "require('express')" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require('express');

/***/ }),

/***/ "express-session":
/*!*********************************************!*\
  !*** external "require('express-session')" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = require('express-session');

/***/ }),

/***/ "express-validator":
/*!***********************************************!*\
  !*** external "require('express-validator')" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require('express-validator');

/***/ }),

/***/ "morgan":
/*!************************************!*\
  !*** external "require('morgan')" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require('morgan');

/***/ }),

/***/ "nodemailer":
/*!****************************************!*\
  !*** external "require('nodemailer')" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require('nodemailer');

/***/ }),

/***/ "nodemailer-stub-transport":
/*!*******************************************************!*\
  !*** external "require('nodemailer-stub-transport')" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require('nodemailer-stub-transport');

/***/ }),

/***/ "orm":
/*!*********************************!*\
  !*** external "require('orm')" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require('orm');

/***/ }),

/***/ "passport":
/*!**************************************!*\
  !*** external "require('passport')" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require('passport');

/***/ }),

/***/ "passport-local":
/*!********************************************!*\
  !*** external "require('passport-local')" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require('passport-local');

/***/ }),

/***/ "path":
/*!**********************************!*\
  !*** external "require('path')" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require('path');

/***/ }),

/***/ "sqlite3":
/*!*************************************!*\
  !*** external "require('sqlite3')" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require('sqlite3');

/***/ }),

/***/ "static-favicon":
/*!********************************************!*\
  !*** external "require('static-favicon')" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require('static-favicon');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./bin/www");
/******/ 	
/******/ })()
;