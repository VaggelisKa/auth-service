import { Document, Model, Schema, model } from 'mongoose';
import Password from '../utils/password';

export interface UserToReturn {
  id: string;
  email: string
}

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
}, {
  toJSON: {
    transform(_, ret) {
      ret.id = ret._id;

      delete ret._id;
      delete ret.password;
      delete ret.__v
    }
  }
})

usersSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.hashPassword(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

usersSchema.statics.build = ({ email, password }: UserAttributes) => {
  return new User({ email, password });
};

const User = model<UserDocument, UserModel>('User', usersSchema);


export { User };

