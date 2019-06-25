const Community_type = require('../model/Community_type');
module.exports = {
    getAll: async (req, res, next) => {
        try {
            await Community_type.sync();
            try {
                const result = await Community_type.findAll();
                return res.status(200).json({ message: 'Get all Commuinty types!', status: 200, success: true, result });
            } catch (err) {
                console.log('get Community_type failed!', err)
                return res.status(500).json({ message: 'Get Community type data failed!', status: 500, success: false });
            }
        } catch (err) {
            console.log('Community_type sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

    create: async (req, res, next) => {
        const { type_name } = req.body;
        try {
            await Community_type.sync();
            try {
                // confirm community_type name isn't reused
                const check = await Community_type.findAll({ where: { type_name } });
                if (check.length >= 1) return res.status(400).json({ message: `${type_name} is exist!`, status: 400, success: false });
                else {
                    await Community_type.create({ type_name });
                    console.log(`Community Type ${type_name} is created!`);
                    return res.status(200).json({ message: `Create ${type_name} Community type success!`, status: 200, success: true });
                }
            } catch (err) {
                console.log('create Community_type failed!', err)
                return res.status(500).json({ message: 'Create Community type data failed!', status: 500, success: false });
            }
        } catch (err) {
            console.log('Community_type sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

    update: async (req, res, next) => {
        const { type_id } = req.params;
        const { type_name } = req.body;
        try {
            await Community_type.sync();
            try {                
                await Community_type.update({type_name}, { where: { type_id } });
                console.log(`#${type_id} community_type updated!`);
                return res.status(200).json({ message: 'Update Community type data success!', status: 200, success: true });
            } catch (err) {
                console.log('update Community_type failed!', err);
                return res.status(500).json({ message: 'Update Community type data failed!', status: 500, success: false });
            }
        } catch (err) {
            console.log('Community_type sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

    delete: async (req, res, next) => {
        const { type_id } = req.params;
        try {
            await Community_type.sync();
            try {
                await Community_type.destroy({ where: { type_id } });
                console.log(`delete #${type_id} community_type success!`);
                return res.status(200).json({ message: 'Delete community Type success!', status: 200, success: true });
            } catch (err) {
                console.log('delete Community_type failed!', err);
                return res.status(500).json({ message: 'Delete Community Type failed!', status: 500, success: false });
            }
        } catch (err) {
            console.log('Community_type sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

};