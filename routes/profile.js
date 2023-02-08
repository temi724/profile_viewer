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

const setUpload = upload.single('avatarUrl')
const readFile = async (req, res) => {
    // const y = []
    // let avatar = req.file
    // console.log("avatar shit", req.body.avatarUrl)
    // console.log("Shiiiiit", avatar)
    // avatar.forEach(x => {
    // const buffer = fs.createReadStream((avatar['path']))
    // // console.log("Shitttttty", buffer)
    // const url = `https://storage.bunnycdn.com/talent/profileAvatar/${avatar['originalname']}`;
    // const options = {
    //     method: 'PUT',
    //     headers: {
    //         'content-type': 'application/octet-stream',
    //         AccessKey: process.env.bunny_key
    //     },
    //     body: buffer
    // };
    // // fs.unlinkSync(x['path'])
    // fetch(url, options)
    //     .then(res => console.log("something fisshy"))
    //     .then(json => console.log(json))
    //     .catch(err => console.error('error:' + err));
    // // fs.unlinkSync(x['path'])
    // y.push(`https://talentget.b-cdn.net/profileAvatar/${avatar['originalname']}`)
    //This code works on the browser
    var dir = './images/resume';
    const y = []
    let avatar = req.body.avatarUrl
    var base64Data = avatar.split(',')[1];
    const decodeImage = Buffer.from(base64Data, "base64");
    // console.log("Value Returned", decodeImage)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const fileNameOnly = req.body.picturename.split('.')[0];
    const extention = req.body.picturename.split('.')[1];
    const fileName = `cv-${fileNameOnly}-${Date.now()}.${extention}`
    const filePath = `${dir}/${fileName}`
    fs.writeFileSync(filePath, decodeImage)
    const buffer = fs.createReadStream((filePath))
    const url = `https://storage.bunnycdn.com/talent/profileAvatar/${fileName}`;
    const options = {
        method: 'PUT',
        headers: {
            'content-type': 'application/octet-stream',
            AccessKey: process.env.bunny_key
        },
        body: buffer
    };
    // // // fs.unlinkSync(x['path'])
    fetch(url, options)
        .then(res => console.log("something fisshy"))
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
    // fs.unlinkSync(x['path'])

    y.push(`https://talentget.b-cdn.net/profileAvatar/${fileName}`)


    //Get The imaage stored on the server...




    const langs = req.body.languages
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

    fs.unlinkSync(filePath);
    cd.save((err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.status(200).send("thanks");
    })
}

// Language operation.....
router.post('/languages', async (req, res) => {
    const lg = new language({
        name: req.body.name
    })
    lg.save((err, result) => {
        if (err) {
            console.log("shit")
        }
        res.send("hi")
    })
})

router.put('/updatelanguage/:id', async (req, res) => {
    const langToupdate = await language.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, { new: true })
    if (!langToupdate) return res.status(404).send("dosent exist")
    res.send("updated")
})

router.get('/getlanguages', async (req, res) => {
    const lang = await language.find()
    res.send(lang)
})

router.delete('/deletelanguage/:id', async (req, res) => {
    const deletelang = await language.deleteOne({ _id: req.params.id })
    if (!deletelang) return res.status(404).send('There is no language with the Id')
    res.send("deleted")
})
// end of language operation

/**Add auth , [auth, admin] */
router.post('/createprofile', setUpload, readFile)

router.get('/', async (req, res) => {
    const profile = await Candidate.find().sort('fullname')
    res.send(profile)
    res.end()
})

router.get('/findbyid/:id', async (req, res) => {
    const profile_id = await Candidate.findById(req.params.id)
    if (!profile_id) return res.status(404).send('profile not found')
    res.send(profile_id)
})

router.delete('/deleteprofile/:id', async (req, res) => {
    const deleteprofile = await Candidate.deleteOne({ _id: req.params.id })
    if (!deleteprofile) return res.status(404).send('There is no profile with the Id')
    res.send("deleted")
})

module.exports = router