const express = require('express')
const router = express.Router()
var XLSX = require('xlsx');
const fs = require('fs')
// const { Movies, validate_movie } = require('../models/moviesmodel')
const uploadFile = require('../multer')
// const excelToJson = require('convert-excel-to-json')
// const { assessment } = require('../models/assessments')
const { software } = require('../models/software');
const { skills } = require('../models/skills');
const { interests } = require('../models/interest');

/**
 *skills operations CRUD
 */
// router.post('/skills', async (req, res) => {
//     const sk = new skills({
//         name: req.body.name
//     })
//     sk.save((err, res) => {
//         if (err) {
//             res.send("something is wrong")
//         }
//         return res.status(200).send("thanks");
//     })
// })

// router.get('/skills', async (req, res) => {
//     const sk = await skills.find().sort('name')
//     res.send(sk)
//     res.end()
// })

// router.delete('/skills/:id', async (req, res) => {
//     const deletesk = await skills.deleteOne({ _id: req.params.id })
//     if (!deletesk) return res.status(404).send('There is no skills  with the Id')
//     res.send("deleted")
// })

// router.put('/skills/:id', async (req, res) => {
//     const skillsToupdate = await skills.findByIdAndUpdate(req.params.id, {
//         name: req.body.name,
//     }, { new: true })
//     if (!skillsToupdate) return res.status(404).send("dosent exist")
//     res.send("updated")

// })

//end of skills operation...


/*
 * excel upload for assessments..
 */
router.post('/', uploadFile.uploadFile.single('upload'), (req, res) => {
    var dir = './images/document';
    const y = []
    let avatar = req.body.avatarUrl
    var base64Data = avatar.split(',')[1];
    const decodeImage = Buffer.from(base64Data, "base64");

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const fileNameOnly = req.body.excelname.split('.')[0];
    const extention = req.body.excelname.split('.')[1];
    const fileName = `doc-${fileNameOnly}-${Date.now()}.${extention}`
    const filePath = `${dir}/${fileName}`
    fs.writeFileSync(filePath, decodeImage)
    const buffer = fs.createReadStream((filePath))

    var workbook = XLSX.readFile(filePath);
    // console.log("laaa", workbook)
    var sheet_namelist = workbook.SheetNames;
    var x = 0;
    sheet_namelist.forEach(element => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
        assessment.insertMany(xlData, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
        x++;
    });
    res.send('Done');
});
/**
 * please if you are uploading with the method.
 * make sure your excel template matches with the schema 
 */
router.post('/uploadsoftwareexcel', uploadFile.uploadFile.single('upload'), (req, res) => {
    var workbook = XLSX.readFile(req.file.path);
    // console.log("laaa", workbook)
    var sheet_namelist = workbook.SheetNames;
    var x = 0;
    sheet_namelist.forEach(element => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
        software.insertMany(xlData, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        })
        x++;
    });
    res.send('Done');
});
/**Assessments operation
 * 
 */
router.get('/getassessment', async (req, res) => {
    const ass = await assessment.find().sort('name')
    res.send(ass)
    res.end()
})

router.post('/inputassessment', async (req, res) => {
    const sw = new assessment({
        name: req.body.name,
        category: req.body.category
    })
    sw.save((err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.status(200).send("thanks");
    })
})

router.put('/updateassessment/:id', async (req, res) => {
    const langToupdate = await assessment.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, { new: true })
    if (!langToupdate) return res.status(404).send("dosent exist")
    res.send("updated")

})
router.delete('/deletesoftware/:id', async (req, res) => {
    const deleteSoft = await assessment.deleteOne({ _id: req.params.id })
    if (!deleteSoft) return res.status(404).send('There is no movie  with the Id')
    res.send("deleted")
})
//End of assessments operation
/**software operation
 * 
 */
router.get('/getsoftware', async (req, res) => {
    const sft = await software.find().sort('name')
    res.send(sft)
    res.end()
})

router.post('/inputsoftware', async (req, res) => {
    const sw = new software({
        name: req.body.name,
        // category: req.body.category
    })
    sw.save((err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.status(200).send("thanks");
    })
})

router.put('/updatesoftware/:id', async (req, res) => {
    const softwareToupdate = await software.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, { new: true })
    if (!softwareToupdate) return res.status(404).send("dosent exist")
    res.send("updated")

})
router.delete('/deletesoftware/:id', async (req, res) => {
    const deleteSoft = await software.deleteOne({ _id: req.params.id })
    if (!deleteSoft) return res.status(404).send('There is no movie  with the Id')
    res.send("deleted")
})
//End of assessments operation

/**software operation
 * 
 */
router.get('/interest', async (req, res) => {
    const intr = await interests.find().sort('name')
    res.send(intr)
    res.end()
})

router.post('/inputinterest', async (req, res) => {
    const sw = new interests({
        name: req.body.name,
        // category: req.body.category
    })
    sw.save((err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        return res.status(200).send("thanks");
    })
})

router.put('/updateintrest/:id', async (req, res) => {
    const intrToupdate = await interests.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, { new: true })
    if (!intrToupdate) return res.status(404).send("dosent exist")
    res.send("updated")

})
router.delete('/deleteinterest/:id', async (req, res) => {
    const deleteintr = await interests.deleteOne({ _id: req.params.id })
    if (!deleteintr) return res.status(404).send('There is no interest with the Id')
    res.send("deleted")
})
//End of interest operation





module.exports = router