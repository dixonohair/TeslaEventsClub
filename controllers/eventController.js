const model = require('../models/events');
const rsvp = require('../models/rsvp');

exports.index = (req, res, next)=>{
    model.find()
    .then(events =>res.render('pages/connections', {events}))
    .catch(err=>next(err));
    
};

exports.newConnection = (req, res)=>{
    res.render('pages/newConnection');
    
}

exports.create = (req, res, next)=>{
    let event = new model(req.body);
    event.author = req.session.user;
    event.save()
    .then((event)=>{
        res.redirect('/connections/connections');
    })
    .catch(err=>next(err));
};


exports.show = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(event=>{
        if(event){
            return res.render('./pages/connection', {event});
        } else{
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};


exports.edit = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(event=>{
        if(event){
            return res.render('./pages/edit', {event});
        } else{
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};


exports.update = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event=>{
        if(event){
            res.redirect('/connections/'+id);
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> {
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err);
    });

};


exports.delete = (req, res, next)=>{
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event=>{
        if(event){
            res.redirect('/connections/connections');
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
    
};

exports.addRSVP = (req, res, next)=>{
    //add function of what happens when this is called
    //then redirect/refresh to the connection page with the updated number. 
    

};