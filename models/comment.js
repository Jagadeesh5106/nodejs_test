const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  comment_text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Comment;
