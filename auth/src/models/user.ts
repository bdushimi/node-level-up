import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id
            delete ret. _id
            delete ret.password
            delete ret.__v
        }
    },
  }
);

// The reason to use keyword function instead of () =>
// is to have "this" keyword only accessing the Document passed to this middleware
// if we were to use ()=>, "this keyword" would have access to this entire file
userSchema.pre("save", async function (done) {
  // this.isModified is true when user got created for the first time or User data is being updated i.e email got updated
  if (this.isModified("password")) {
    const hashedPassword = await Password.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
