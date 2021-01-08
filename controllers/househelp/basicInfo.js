const Basic = require('../../models/househelp/basicInfo')


exports.renderGet = async (req, res) => {
    try {
        const user = await Basic.find()
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
}
exports.renderPost = async (req, res) => {
    const _body = req.body
    const user = new Basic(_body)
    try {
        const saveUser = await user.save()
        res.status(201).send(saveUser)
    } catch (e) {
        res.status(500).send(e)
    }
}
exports.renderGetId = async (req, res) => {
    try {
        const singleUser = await Basic.findById(req.params.Id)
        if (!singleUser) {
            return res.send("[]")
        }
        res.status(201).send(singleUser)
    } catch (e) {
        res.status(500).send(e)
    }
}
exports.renderUpdate = async (req, res) => {
    const _body = req.body
    const isUpdate = ["firstName", "surname", "email", "password"]
    const isUpdateToObject = Object.keys(_body)
    const checkUpdateValidate = () =>{
        
    }
    try {
        const updateSingleUser = await Basic.findByIdAndUpdate(req.params.Id, _body, { new: true, runValidators: true })

        if (!updateSingleUser) {
            return res.status(404).send("No user to be updated")
        }
        res.send(updateSingleUser)

    } catch (e) {
        res.status(400).send(e)
    }
}
exports.renderDelete = async (req, res) => {
    try {
        const delSingleUser = await Basic.findByIdAndDelete(req.params.Id)
        if (!delSingleUser) {
            return res.send("No user to be deleted")
        }
        res.status(201).send(delSingleUser)
    } catch (e) {
        res.status(500).send(e)
    }
}