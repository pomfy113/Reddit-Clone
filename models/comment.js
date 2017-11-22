const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content             : { type: String, required: true }
  , comments          : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

});

// Autopopulation
const autoPopulateComments = function(next) {
  this.populate('comments');
  next();
};

CommentSchema.
  pre('find', autoPopulateComments).
  pre('findOne', autoPopulateComments);

module.exports = mongoose.model('Comment', CommentSchema);
