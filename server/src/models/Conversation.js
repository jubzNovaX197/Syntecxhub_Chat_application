import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    participantsKey: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: null
    },
    lastMessageAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      }
    }
  }
);

conversationSchema.path('participants').validate(function validateParticipants(participants) {
  if (participants.length !== 2) {
    return false;
  }

  const uniqueParticipants = new Set(participants.map((participant) => participant.toString()));
  return uniqueParticipants.size === 2;
}, 'A one-to-one conversation must have exactly two unique participants');

conversationSchema.pre('validate', function setParticipantsKey(next) {
  if (this.participants?.length === 2) {
    this.participantsKey = this.participants
      .map((participant) => participant.toString())
      .sort()
      .join(':');
  }

  next();
});

conversationSchema.index({ participants: 1 });
conversationSchema.index({ updatedAt: -1 });

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
