const Post = require('../Models/hospitalPosts')
const formidable = require('formidable')
const form = formidable();
const fs = require('fs')  //core node js module
const _ = require('lodash')

exports.getDummyPosts = (req, res) => {
    res.json({
        posts: [
            {title: "Fisr Title Post"},
            { title: "second post"}
        ]
    })
}

exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate("postedBy", "_id hospitalName")
        .exec((err, post) => {
            if(err || !post) {
                return res.status(400).json({
                    error: err
                })
            }
            req.post = post //add the post to the request body
            next()
        })
}

exports.getPosts = (req, res) => {
    const posts = Post.find()
    .populate("postedBy", "_id hospitalName")
    .select("_id title body quantity created") //we don't want the _v
    .sort({created: -1 })
    .then((posts) => {
        // res.status(200).json({posts:posts})  -> Error Frontend: posts.map is not a function
        res.status(200).json(posts)
    })
    .catch(err => console.log(err))
}


exports.createPost = (req, res, next) => {
    //We are using formidable in here to create a POst:
    // let form = new formidable.IncomingForm();
    // form.keepExtensions = true;
    // form.parse(req, (err, fields, files) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: 'Image could not be uploaded'
    //         });
    //     }
    //     let post = new Post(fields);

    //        req.profile.hashed_password = undefined;
    //        req.profile.salt = undefined;

    // //     //here is use the relation made in DB:
    //     post.postedBy = req.profile;
    //     console.log('PROFILE: ', req.profile)
    //         if (files.photo) {
    //             post.photo.data = fs.readFileSync(files.photo.path);
    //             post.photo.contentType = files.photo.type;
    //         }
    //         post.save((err, result) => {
    //             if (err) {
    //                 return res.status(400).json({
    //                     error: err
    //                 });
    //             }
    //             res.json(result);
    //         });
    //     });
    
    //We are NOTTTTT using formidable in here to cretae a post:

    const post = new Post(req.body)
    // let form = new formidable.IncomingForm();
    // form.keepExtensions = true;
    console.log('CREATING POST, testing post: ', post)
    console.log('CREATING POST, testing req.body - need to habe body-parser to work: ', req.body)
    //To save to database:
    post.postedBy = req.profile;
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    post.save((err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        };
        res.status(200).json({
            post: result
        });
    });
    console.log('PROFILE' , req.profile)
    post.save()
    .then(result => {
        res.status(200).json({
            post: result
        });
    });
 };

// exports.createPost = (req, res, next) => {
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'Image could not be uploaded'
//             });
//         }
//         let post = new Post(fields);

//         req.profile.hashed_password = undefined;
//         req.profile.salt = undefined;
//         post.postedBy = req.profile;

//         if (files.photo) {
//             post.photo.data = fs.readFileSync(files.photo.path);
//             post.photo.contentType = files.photo.type;
//         }
//         post.save((err, result) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: err
//                 });
//             }
//             res.json(result);
//         });
//     });
// };

 exports.postsByHospital = (req, res) => {
     Post.find({postedBy: req.profile._id})
        .populate("postedBy", "_id, hospitalName")
        .sort("_created") //new ones will upload first
        .exec((err, posts) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(posts)
        })
 }

 exports.isPoster = (req, res, next) => {
     //chek if we have the correct hspital to handke the post:
     let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id

     console.log('req.post: ', req.post)
     console.log('req.auth: ', req.auth)
     console.log('req.post.postedBy._id: ', req.post.postedBy._id)
     console.log('req.auth._id: ', req.auth._id)

    if( !isPoster ){
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next()
 }

 exports.deletePost = (req, res ) => {
     let post = req.post
    //  post.remove()
     post.remove((err, post) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: "Post deleted successfuly"
        })
     })
 }

 exports.updatePost = (req, res, next) => {
    let post = req.post;
    post = _.extend(post, req.body)
    post.updated = Date.now()
    post.save(err => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(post);
    })
}

exports.singlePost = (req, res, next) => {
    return res.json(req.post);
}