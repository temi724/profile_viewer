const express = require('express')
const router = express.Router()
const multer = require('multer')
require('dotenv').config()
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch');
const { Candidate } = require('../models/profile')
const { languageSchema, language } = require('../models/languages')
const admin = require('../middlewears/admin')
const auth = require('../middlewears/auth')
const { getgid } = require('process')

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".mp4" && ext !== ".mkv" && ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});

const setUpload = upload.any([{ name: 'avatarUrl' }])
const readFile = async (req, res) => {
    const y = []
    let avatar = req.files
    avatar.forEach(x => {
        const buffer = fs.createReadStream((x['path']))
        const url = `https://storage.bunnycdn.com/talent/profileAvatar/${x['originalname']}`;
        const options = {
            method: 'PUT',
            headers: {
                'content-type': 'application/octet-stream',
                AccessKey: process.env.bunny_key
            },
            body: buffer
        };
        // fs.unlinkSync(x['path'])
        fetch(url, options)
            .then(res => console.log("something fisshy"))
            .then(json => console.log(json))
            .catch(err => console.error('error:' + err));
        // fs.unlinkSync(x['path'])
        y.push(`https://talentget.b-cdn.net/profileAvatar/${x['originalname']}`)
    });
    // const url = y

    const langs = req.body.languages
    const intr = req.body.interest


    var lg = []
    for (let a of langs) {
        let speaking = await language.findById(a)
        lg.push(speaking)
    }

    var cd = new Candidate({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        education: req.body.education,
        interest: req.body.interest,
        extraVersion: req.body.extraVersion,
        emotionalStability: req.body.emotionalStability,
        agreeableness: req.body.agreeableness,
        openess: req.body.openess,
        conscientiousness: req.body.conscientiousness,
        english: req.body.english,
        technical: req.body.technical,
        OtherArt: req.body.OtherArt,
        skills: req.body.skills,
        avatar: y[0],
        comment: req.body.comment,
        software: req.body.software,
        Comment: req.body.comment,
        languages: lg,
        experience: req.body.experience

    })
    console.log(req.body.languages)
    // cd.languages.push(lg)
    cd.save((err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.status(200).send("thanks");
    })


}
// router.post('/languages', async (req, res) => {
//     const lg = new language({
//         name: req.body.name
//     })
//     lg.save((err, result) => {
//         if (err) {
//             console.log("shit")
//         }
//         res.send("hi")
//     })
// })

router.get('/getlanguages', async (req, res) => {
    const lang = await language.find()
    res.send(lang)
})

/**Add auth , [auth, admin] */
router.post('/createprofile', setUpload, readFile)

router.get('/', async (req, res) => {
    const profile = await Candidate.find().sort('fullname')
    res.send(profile)
    res.end()

})
// router.get('/findbyid/:id', async (req, res) => {

//     const profile_id = await Candidate.findById(req.params.id)
//     if (!profile_id) return res.status(404).send('profile not found')
//     res.send(profile_id)
// })

module.exports = router