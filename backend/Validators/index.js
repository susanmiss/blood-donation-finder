exports.createPostValidator = (req, res, next) => {
    //title:
    req.check('title', 'Write a title').notEmpty()
    req.check('title', 'Your title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    })
    //body:
    req.check('body', 'Write a body').notEmpty()
    req.check('body', 'Your body must be between 4 to 2000 characters').isLength({
        min: 4,
        max: 2000
    })
    //quantity:
    req.check('quantity', 'Write a quantity. If you do not know for sure type "any quantity"').notEmpty()
    //check for errors:
    const errors = req.validationErrors()
    //map throught the errors:
    if(errors){
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
        }
    next();    
};


exports.userSignUpValidator = (req, res, next) => {
    //name is not null and between 4 to 10
    req.check('name', "Name is required")
    .notEmpty()
    .isLength({
        min: 2, max: 200
    })
    .withMessage("Name must contain at least 2 characters")
    //email is not null, valid and normalized with regular expression
    req.check('email', 'Email must be between 3 to 32 characters')
    .matches(/.+@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({
        min: 4, max: 2000
    })
    //check for password
    req.check('password', "Password is required").notEmpty();
    req.check('password')
    .isLength({min:5})
    .withMessage("Password must contain at least 5 characters")
    .matches(/\d/)
    .withMessage('Password must contain a number')
    //check for errors:
    const errors = req.validationErrors()
    //map throught the errors:
    if(errors){
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
        }
    next();
}


exports.hospitalSignUpValidator = (req, res, next) => {
    //name is not null and between 4 to 10
    req.check('hospitalName', "Hospital Name is required")
    .notEmpty()
    .isLength({
        min: 2, max: 200
    })
    .withMessage("Name must contain at least 2 characters")
     //address
     req.check('address', "Address is required")
     .notEmpty()
     .isLength({
         min: 2, max: 200
     })
     .withMessage("Name must contain at least 2 characters")
    //email is not null, valid and normalized with regular expression
    req.check('hospitalEmail', 'Hospital Email must be between 3 to 32 characters')
    .matches(/.+@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({
        min: 4, max: 2000
    })
    //person Name
    req.check('personName', "Person Name is required")
    .notEmpty()
    .isLength({
        min: 2, max: 200
    })
    .withMessage("Person Name must contain at least 2 characters")
     //email is not null, valid and normalized with regular expression
     req.check('personEmail', 'Person Email must be between 3 to 32 characters')
     .matches(/.+@.+\..+/)
     .withMessage('Person Email must contain @')
     .isLength({
         min: 4, max: 2000
     })
    //check for password
    req.check('password', "Password is required").notEmpty();
    req.check('password')
    .isLength({min:8})
    .withMessage("Password must contain at least 8 characters")
    .matches(/\d/)
    .withMessage('Password must contain a number')
    //check for errors:
    const errors = req.validationErrors()
    //map throught the errors:
    if(errors){
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError})
        }
    next();
}