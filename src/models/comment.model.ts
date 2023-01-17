import mongoose, { Schema } from 'mongoose'

const commentCollectionSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    blogId: {
        type: mongoose.Types.ObjectId,
        ref: 'blog',
        required: true
    }
}, { timestamps: true });

/**
 * hide some credentials to query by accident
 */
commentCollectionSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj["userId"];
    delete obj["blogId"];
    delete obj["__v"];
    return obj;
}

export const Comment = mongoose.model('comment', commentCollectionSchema);
