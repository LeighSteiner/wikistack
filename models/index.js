var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack' ,{
	logging: false
});

const Page = db.define('page', {
	  title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
         allowNull: false,
    },
    route :{
    	get(){
    		const urlRoute = this.getDataValue('title');
    		return ('/wiki/') + urlRoute ;
    	}
    },
    content: {
        type: Sequelize.TEXT,
         allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

const User = db.define('user', {
   name: {
        type: Sequelize.STRING,
         allowNull: false
    },
    email: {
        type: Sequelize.STRING,
         allowNull: false
    }
});



module.exports = {
	db: db,
	// Page: Page, 
	// User: User
}