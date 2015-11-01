module.exports = function(app, passport) {

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
    }));

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/boogey' // redirect back to the signup page if there is an error
    }));

    // app.post('/signup',function(req,res){
    //   res.json({hi: "hello"});
    // });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
