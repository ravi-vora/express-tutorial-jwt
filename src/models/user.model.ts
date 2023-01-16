import mongoose, { Schema, model } from 'mongoose'

const UserCollectionSchema : Schema = new Schema({
    firstName: {
        type: String,
        required: [true, "'firstName' is required"]
    },
    lastName: {
        type: String,
        required: [true, "'lastName' is required"]
    },
    email: {
        type: String,
        required: [true, "'email' is required"],
        unique: [true, "'email' is already registered"]
    },
    phone: {
        type: String,
        required: [true, "'phone' is required"],
        unique: [true, "'phone' is already registered"]
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
}, { timestamps: true })

/**
 * hide some credentials to query by accident
 */
UserCollectionSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj["hash"];
    delete obj["salt"];
    delete obj["__v"];
    return obj;
}

UserCollectionSchema.path("email").validate(async (email) => {
    const count = await mongoose.models.user.countDocuments({ email });
    return !count;
}, "'email' already registered.");

UserCollectionSchema.path("phone").validate(async (phone) => {
    const count = await mongoose.models.user.countDocuments({ phone });
    return !count;
}, "'phone' already registered.");

export const User = model("user", UserCollectionSchema);