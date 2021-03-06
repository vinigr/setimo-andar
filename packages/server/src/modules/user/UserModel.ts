import bcrypt from "bcryptjs";
import mongoose, { Document, Model } from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      hidden: true,
    },
    email: {
      type: String,
      required: false,
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "user",
  },
);

export interface IUser extends Document {
  name: string;
  password?: string;
  email: string;
  active: boolean;
  authenticate: (plainTextPassword: string) => boolean;
  encryptPassword: (password: string | undefined) => string;
}

schema.pre<IUser>("save", function encryptPasswordHook(next) {
  if (this.isModified("password")) {
    this.password = this.encryptPassword(this.password);
  }

  return next();
});

schema.methods = {
  authenticate(plainTextPassword: string) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  },
};

const UserModel: Model<IUser> = mongoose.model("User", schema);

export default UserModel;
