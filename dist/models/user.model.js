import mongoose, { Schema, model } from 'mongoose';
const UserDatabaseSchema = new Schema({
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
}, { timestamps: true });
UserDatabaseSchema.path("email").validate(async (email) => {
    const count = await mongoose.models.user.countDocuments({ email });
    return !count;
}, "'email' already registered.");
UserDatabaseSchema.path("phone").validate(async (phone) => {
    const count = await mongoose.models.user.countDocuments({ phone });
    return !count;
}, "'phone' already registered.");
export const User = model("user", UserDatabaseSchema);
//# sourceMappingURL=user.model.js.map