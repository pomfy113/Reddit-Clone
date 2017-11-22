const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title            : { type: String, required: true }
  , url            : { type: String, required: true }
  , summary        : { type: String, required: true }
  , subreddit      : { type: String, required: true }
  , author         : { type: Schema.Types.ObjectId, ref: 'User', required: true }
  , comments       : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  , upVotes        : []
  , downVotes      : []
  , voteScore      : { type: Number, default: 0 }

});

// Autopopulation
const autoPopulatePosts = function(next) {
  this.populate('comments').populate('author');
  next();
};

PostSchema.
  pre('find', autoPopulatePosts).
  pre('findOne', autoPopulatePosts);

module.exports = mongoose.model('Post', PostSchema);
