function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/signin');
}

module.exports = (app, passport) => {
    app.get('/dashboard', isLoggedIn, (req, res) => {
        res.render('dashboard');
    });

    app.get('/logout', (req, res) => {
        req.session.destroy(function(err) {
            res.redirect('/');
        });
    });

    app.get('/signin', (req, res) => {
        res.render('signin');
    });

    app.post(
        '/signin',
        passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/signin'
        })
    );

    app.post(
        '/signup',
        passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/signup'
        })
    );

    app.get('/signup', (req, res) => {
        res.render('signup');
    });
};
