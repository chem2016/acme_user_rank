const Sequelize = require('sequelize')

const conn = new Sequelize(process.env.DATABASE_URL)

const User = conn.define('user', {
    name: Sequelize.STRING,
    bio: Sequelize.TEXT,
    rank: Sequelize.INTEGER,
}
)

const syncAndSeed = () =>{
    return conn.sync({force: true})
        .then(()=>{
            return Promise.all([
                User.create({name: 'Grant', bio: 'web-developer', rank: 2}),
                User.create({name: 'Prof', bio: 'instructor', rank: 1}),
                User.create({name: 'HY', bio: 'student', rank: 3})
            ])
        })
}

module.exports = {
    models: {
      User
    },
    syncAndSeed
  }; 