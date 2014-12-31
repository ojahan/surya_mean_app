module.exports.isLoggedIn = function isLoggedIn(request,respond,next){
	if (request.isAuthenticated()) {
		next();
	};
	respond.redirect('/');
};

module.exports.secretKey = {
	key : 'thisismywebsite'
};

module.exports.initialize = function initializeAuth(router, passport, flash, session, secretKey){
	router.use(passport.initialize());
	router.use(passport.session());
	router.use(flash());
	router.use(session({ secret: secretKey, resave: false, saveUninitialized: true }));	
}