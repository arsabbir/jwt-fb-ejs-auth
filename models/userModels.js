import mongoose from "mongoose";

// user schema create

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },
    surename: {
      type: String,
      trim: true,
      required: true,
    },
    birthDay: {
      type: Number,
      required: true,
      trim: true,
    },
    birthMon: {
      type: Number,
      trim: true,
      required: true,
    },
    birthYear: {
      type: Number,
      trim: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    skill: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    gallery: {
      type: Array,
      trim: true,
    },
    cell: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      // enum : ['Male', 'Female','Custom'],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
    },
    follower: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// statics method
UserSchema.statics.findEmail= function(email){
  return this.find().where('email').equals(email)
}

// export
export default mongoose.model("user", UserSchema);
