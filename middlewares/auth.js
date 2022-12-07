const Events =require('../models/events');

exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    }else{
        req.flash('error', 'You are logged in already');
        return res.redirect('/users/profile');
    }
}

exports.isLoggedIn = (req, res, next)=>{
    if(req.session.user){
        return next();
    }else{
        req.flash('error', 'You need to log in first');
        return res.redirect('/users/login');
    }
}


//if user is author of Event
exports.isAuthor = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    Events.findById(id)
    .then(event=>{
        if(event){
            if(event.author == req.session.user){
                return next();
            } else{
                let err = new Error('Unauthorized to request resource');
                err.status = 401;
                return next(err);
            }
        }
    })
    .catch(err=>next(err));
}

