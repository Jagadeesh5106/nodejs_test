const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  post_link: {
    type: Sequelize.STRING,
    allowNull: false
  },
  post_description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Post;
