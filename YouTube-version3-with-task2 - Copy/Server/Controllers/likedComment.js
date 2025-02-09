import likedComment from "../Models/likedComment.js"

export const likedcommentcontroller = async (req, res) => {
    const likedcommentdata = req.body;
    const likedcommentsave = new likedComment(likedcommentdata)
    try {
        await likedcommentsave.save()
        res.status(200).json("added to likedComment")
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}
export const getalllikedcomment= async (req, res) => {
    try {
        const files = await likedComment.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}
export const deletelikedcomment = async (req, res) => {
    const { commentid: commentid, viewer: viewer } = req.params;
    try {
        await likedComment.findOneAndDelete({
            commentid:commentid,viewer:viewer,
        })
        res.status(200).json({message:"removed from liked video"})
    } catch (error) {
        res.status(400).json(error.message)
        return
    }

}