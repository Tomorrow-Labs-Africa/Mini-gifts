import mongoose, { Schema, Document } from 'mongoose';

export interface AccessTokenDocument extends Document {
  token: string;
  expiresAt: Date;
}

const AccessTokenSchema: Schema = new Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const AccessToken = mongoose.model<AccessTokenDocument>('AccessToken', AccessTokenSchema);
