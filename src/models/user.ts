import { Document, Model, Schema, model } from 'mongoose';

interface UserAttributes {
  email: string;
  password: string;
}

/**
 * @interface
 * An interface that describes the properties that a User Model has
 */
interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttributes): UserDocument;
}

/**
 * @interface
 * An interface that describes the properties that a User document has
 */
interface UserDocument extends Document {
  email: string;
  password: string;
}

const usersSchema = new Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
})

usersSchema.statics.build = ({ email, password }: UserAttributes) => {
  return new User({ email, password });
};

const User = model<UserDocument, UserModel>('User', usersSchema);


export { User };

