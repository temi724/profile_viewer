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
const { interests } = require('../models/interest')
const { software } = require('../models/software')
const { skills } = require('../models/skills')
const { assessments } = require('../models/accessments')

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
    limits: {
        fieldSize: 50 * 1024 * 1024
    }
});

const setUpload = upload.single('avatarUrl')
const readFile = async (req, res) => {
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

    // console.log("Actual Image file", buffer)
    //console.log("Buffer File Reader", buffer)
    const url = `https://storage.bunnycdn.com/talent/profileAvatar/${fileName}`;
    const options = {
        method: 'PUT',
        headers: {
            'content-type': 'application/octet-stream',
            AccessKey: process.env.bunny_key
        },
        body: buffer
    };

    fetch(url, options)
        .then(res => console.log("something fisshy"))
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
    // fs.unlinkSync(x['path'])
    ////y.push(`https://talentget.b-cdn.net/profileAvatar/${avatar['originalname']}`)
    y.push(`https://talentget.b-cdn.net/profileAvatar/${fileName}`)





    //end line
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
        experience: req.body.experience,
        softwareMain: req.body.softwareMain

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
//Languages
/**
 * @openapi
 * /languages:
 *   get:
 *     summary: Retrieve a list of languages available
 *     description: .
 *     responses:
 *         200:
 *            description:Return all Images
 */
router.post('/languages', async (req, res) => {
    language.insertMany(req.body).then(function () {
        res.send("Good")
    }).catch(function () {
        console.log("something bad")
    })
    // const lg = new language({
    //     name: req.body.name
    // })
    // lg.save((err, result) => {
    //     if (err) {
    //         console.log("shit")
    //     }
    //     res.send("hi")
    // })
})


router.post('/interests', async (req, res) => {
    interests.insertMany(req.body).then(function () {
        res.send("Good")
    }).catch(function () {
        console.log("something bad")
    })
})
router.get('/getinterests', async (req, res) => {
    const lang = await interests.find()
    res.send(lang)
})

router.put('/updateinterests/:id', async (req, res) => {
    const intrToUpdate = await interests.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, { new: true })
    if (!intrToUpdate) return res.status(404).send("dosent exist")
    res.send("updated")
})
//Software.....
router.post('/software', async (req, res) => {
    software.insertMany(req.body).then(function () {
        res.send("Good")
    }).catch(function () {
        console.log("something bad")
    })
})

router.get('/getsoftware', async (req, res) => {
    const lang = await software.find()
    res.send(lang)
})


router.post('/skills', async (req, res) => {
    skills.insertMany(req.body).then(function () {
        res.send("Good")
    }).catch(function () {
        console.log("something bad")
    })
})


router.post('/assessments', async (req, res) => {
    assessments.insertMany(req.body).then(function () {
        res.send("Good")
    }).catch(function () {
        console.log("something bad")
    })
})

router.get('/assessments', async (req, res) => {
    const ass = await assessments.find()
    res.send(ass)
})

router.delete('/assessments/:id', async (req, res) => {
    const delSkills = await skills.deleteOne({ _id: req.params.id })
    if (!delSkills) return res.status(404).send('There is no skills with the Id')
    res.send("deleted")
})

router.get('/getSkills', async (req, res) => {
    const lang = await skills.find()
    res.send(lang)
})



router.delete('/deleteSkills/:id', async (req, res) => {
    const delSkills = await skills.deleteOne({ _id: req.params.id })
    if (!delSkills) return res.status(404).send('There is no skills with the Id')
    res.send("deleted")
})



router.put('/updatesoftware/:id', async (req, res) => {
    const sfToUpdate = await software.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, { new: true })
    if (!sfToUpdate) return res.status(404).send("dosent exist")
    res.send("updated")
})

router.delete('/deletesoftware/:id', async (req, res) => {
    const delSoftware = await software.deleteOne({ _id: req.params.id })
    if (!delSoftware) return res.status(404).send('There is no language with the Id')
    res.send("deleted")
})



router.delete('/deleteinterests/:id', async (req, res) => {
    const deleteIntr = await interests.deleteOne({ _id: req.params.id })
    if (!deleteIntr) return res.status(404).send('There is no language with the Id')
    res.send("deleted")
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