const User = require('../models/User');
const Spot = require('../models/Spot'); 

module.exports = {
    async index(req, res){
        const { rua } = req.query;

        const spots = await Spot.find( { ruas: rua })

        return res.json(spots);
    },
    
    async store (req, res){
       const { filename} = req.file;
       const { company, ruas, price } = req.body;
       const { user_id } = req.headers;

       const user = await User.findById(user_id);

       if  (!user){
           return res.status(400).json({ error: 'Error usuario não existe' });
       }

       const spot = await Spot.create({
           user: user_id,
           thumbnail: filename,
           company,
           ruas: ruas.split(',').map(rua => rua.trim()),
           price 
       })

        return res.json(spot)
    }
};