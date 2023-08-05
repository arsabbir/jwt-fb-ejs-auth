const localsMiddle = (req,res,next ) => {
    res.locals.message = req.session.message;
    delete req.session.message
    res.locals.err = req.session.err;
    delete req.session.err
    res.locals.user = req.session.user;
    res.locals.resentMail = req.session.resentMail;
    next()
}

// export
export default localsMiddle