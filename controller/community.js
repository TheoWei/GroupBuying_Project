const Community = require('../model/Community');
module.exports = {
    getAll: async (req, res, next) => {        
        try {
            await Community.sync();
            const result = await Community.findAll();
            return res.status(200).json({ message: 'get all commuinties!', status: 200, success: true, result });
        } catch (err) {
            console.log('Community sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

    getOne: async (req, res, next) => {        
        const { community_id } = req.params;
        try {
            await Community.sync();
            const result = await Community.findOne({ where: { community_id } });
            if (result) return res.status(200).json({ message: 'get community!', status: 200, success: true, result });
            else return res.status(404).json({ message: 'community not found!', status: 404, success: false });
        } catch (err) {
            console.log('Community sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

    create: async (req, res, next) => {
        const { community_name, type_id } = req.body;
        try {
            await Community.sync();
            try {
                // confirm community name isn't reused
                const check = await Community.findAll({ where: { community_name } });
                if (check.length >= 1) return res.status(400).json({ message: 'community is exist!', status: 400, success: false });
                else {
                    await Community.create({ community_name, type_id });
                    console.log(`${community_name} created!`);
                    return res.status(200).json({ message: `Create ${type_name} Community success!`, status: 200, success: true });
                }
            } catch (err) {
                console.log('create Community failed!', err)
                return res.status(500).json({ message: 'Create Community failed!', status: 500, success: false  });
            }
        } catch (err) {
            console.log('Community sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

    update: async (req, res, next) => {
        const { community_id } = req.params;
        const { community_name, type_id } = req.body;
        try {
            await Community.sync();
            try {
                let updated = {};
                // confirm req body data is existed
                if (community_name) updated['community_name'] = community_name;
                if (type_id) updated['type_id'] = type_id;
                await Community.update(updated, { where: { community_id } });
                console.log(`#${community_id} community updated!`);
                return res.status(200).json({ message: 'community updated!', status: 200, success: true });
            } catch (err) {
                console.log('update Community failed!', err);
                return res.status(500).json({ message: 'update Community failed!', status: 500, success: false });
            }
        } catch (err) {
            console.log('Community sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

    delete: async (req, res, next) => {
        const { community_id } = req.params;
        try {
            await Community.sync();
            try {
                await Community.destroy({ where: { community_id } });
                console.log(`delete #${community_id} community success!`);
                return res.status(200).json({ message: 'Delete community success!', status: 200, success: true });
            } catch (err) {
                console.log('delete Community failed!', err);
                return res.status(500).json({ message: 'Delete Community failed!', status: 500, success: false });
            }
        } catch (err) {
            console.log('Community sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

};