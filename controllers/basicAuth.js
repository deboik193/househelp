
exports.renderGet = async (req, res) => {
    try {
        const user = await Basic.find().lean()
        res.status(201).send({ success: true, data: user })
    } catch (err) {
        res.status(500).send({ success: true, data: err })
    }
}

exports.renderKYC = async (req, res) => {
    const check = req.body
    console.log('form wizard', check)
}

exports.renderGetId = async (req, res) => {
    try {
        const singleUser = await Basic.findById(req.params.Id).lean()
        if (!singleUser) {
            return res.status(404).json({ success: false, message: "Account not found" })
        }
        res.status(200).json({ success: true, data: singleUser })
    } catch (e) {
        return res.status(500).json({ error: e })
    }
}

exports.renderUpdate = async (req, res) => {
    const _body = req.body
    try {
        await Basic.findByIdAndUpdate({ _id: req.params.Id }, _body, { new: true, runValidators: true }, (err, data) => {
            if (err == null && data !== null) {
                res.status(201).json({ success: true, message: "Updated Successfully", data: data })
            } else {
                res.status(404).json({ success: false, message: "User Not Found", data: err })
            }
        }).lean()

    } catch (e) {
        res.status(500).json({ error: e })
    }
}
exports.renderDelete = async (req, res) => {
    try {
        const delSingleUser = await Basic.findByIdAndDelete({ _id: req.params.Id }).lean()
        if (!delSingleUser) {
            return res.status(404).json({ message: "No Account to be deleted" })
        }
        res.status(201).json({ message: "Account deleted successfuly" })
        // .clearCookie("access-token").then((res) => {
        //     console.log(res)
        // }).catch((err) => {

        // })

    } catch (e) {
        res.status(500).json({ error: e })
    }
}