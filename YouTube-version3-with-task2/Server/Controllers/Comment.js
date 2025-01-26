import comment from "../Models/comment.js";
import mongoose from "mongoose";

export const postcomment = async (req, res) => {
    const commentdata = req.body
    const postcomment = new comment(commentdata)
    try {
        await postcomment.save()
        res.status(200).json("posted the comment")
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const getcomment = async (req, res) => {
    try {
        const commentlist = await comment.find()
        res.status(200).send(commentlist)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const deletecomment = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Comments unavailable..")
    }
    try {
        await comment.findByIdAndDelete(_id);
        res.status(200).json({ message: "deleted comment" })
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}

export const editcomment = async (req, res) => {
    const { id: _id } = req.params;
    const { commentbody } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Comments unavailable..")
    }
    try {
        const updatecomment = await comment.findByIdAndUpdate(
            _id,
            { $set: { "commentbody": commentbody } }
        )
        res.status(200).json(updatecomment)
    } catch (error) {
        res.status(400).json(error.message)
        return
    }
}
export const updateReaction = async (req, res) => {
    const { id } = req.params;
    const { action, value } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid comment ID" });
    }

    try {
        console.log("Updating reaction for comment id:", id);
        console.log("Action:", action, "Value:", value);

        const commentData = await comment.findById(id);
        if (!commentData) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (action === "like") {
            commentData.likes += value;
        } else if (action === "dislike") {
            commentData.dislikes += value;
        } else {
            return res.status(400).json({ message: "Invalid action" });
        }

        await commentData.save(); 
        console.log("Updated comment saved to database:", commentData);

        return res.json({ likes: commentData.likes, dislikes: commentData.dislikes });
    } catch (error) {
        console.error("Error updating reaction:", error);
        return res.status(500).json({ message: "Error updating reaction", error: error.message });
    }
};

export const getSingleComment = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid comment ID" });
    }
  
    try {
      const commentData = await comment.findById(id);
      if (!commentData) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      res.status(200).json(commentData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comment", error: error.message });
    }
  };
  
