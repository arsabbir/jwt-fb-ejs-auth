// Response

class Respons {
    constructor(msg, err, redirect, req, res) {
      req.session.message = msg;
      req.session.err = err;
      res.redirect(redirect);
    }
  }
  
  // export
  
  export default Respons;


