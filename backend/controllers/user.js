import User from "../models/User.js"

export const getUser = async (req, res) => {
    try {
        const id = req.params.id
        let user = await User.findById(id)

        if (!user) res.status(404).json({error: "User not found"})

        user = user.toObject()
        delete user.password
        res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}