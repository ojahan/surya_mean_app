var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('../models/user');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        user.comparePassword(password, function(data){
            if (data) {
              return done(null, user);
            }else{
              return done(null, false, { message: 'Incorrect password.' });
            }
        });
    });
  }
));

passport.serializeUser(function(user,done){
	done(null,user.id);
});

passport.deserializeUser(function(id,done){
	User.findById(id,function(err,user){
		done(err,user);
	});
});

module.exports.passport = passport;

module.exports.isLoggedIn = function(req,res,next){
  if (req.isAuthenticated()) {
    next()
  }else{
    res.status(401).send('Request is not authenticated');
  }
}