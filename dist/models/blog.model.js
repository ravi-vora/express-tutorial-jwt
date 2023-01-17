import mongoose, { Schema } from "mongoose";
const blogCollectionSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: Buffer,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    comments: [{
            type: mongoose.Types.ObjectId,
            ref: 'comment'
        }]
}, { timestamps: true });
/**
 * hide some credentials to query by accident
 */
blogCollectionSchema.methods.toJSON = function () {
    var obj = this.toObject();
    obj["content"] = obj["content"].toString('utf8');
    delete obj["__v"];
    return obj;
};
blogCollectionSchema.path("title").validate(async (title) => {
    const count = await mongoose.models.blog.countDocuments({ title });
    return !count;
}, "'title' is already exists.");
export const Blog = mongoose.model('blog', blogCollectionSchema);
//# sourceMappingURL=blog.model.js.map