const Group = require('../model/Group');
module.exports = {
    getAll: async (req, res, next) => {
        try {
            await Group.sync();
            try {
                const result = await Group.findAll();
                return res.status(200).json({ message: 'Get all group!', status: 200, success: true, result });
            } catch (err) {
                console.log('get Group failed!', err)
                return res.status(500).json({ message: 'Get group failed!', status: 500, success: false });
            }
        } catch (err) {
            console.log('Group sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

    getOne: async (req, res, next) => {
        const { group_id } = req.params;
        try {
            await Group.sync();
            try {
                const result = await Group.findOne({ where: { group_id } });
                if (result) return res.status(200).json({ message: `Get group!`, status: 200, success: true, result });
                else return res.status(404).json({ message: `#${group_id} Group not found!`, status: 404, success: false });
            } catch (err) {
                console.log('get Group failed!', err)
                return res.status(500).json({ message: 'Get group failed!', status: 500, success: false });
            }
        } catch (err) {
            console.log('Group sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

    create: async (req, res, next) => {
        const {community_id, group_name,  group_owner } = req.body;
        try {
            await Group.sync();
            try {
                // confirm group name isn't reused
                const check = await Group.findAll({ where: { group_name } });
                if (check.length >= 1) return res.status(400).json({ message: 'Group name is exist!', status: 400, success: false });
                else {
                    await Group.create({ community_id, group_name,  group_owner });
                    console.log(`Group name ${group_name} is created!`);
                    return res.status(200).json({ message: `Create group name success!`, status: 200, success: true });
                }
            } catch (err) {
                console.log('create group failed!', err)
                return res.status(500).json({ message: 'Create group failed!', status: 500, success: false });
            }
        } catch (err) {
            console.log('Group sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

    update: async (req, res, next) => {
        const { group_id } = req.params;
        const { group_name,  group_owner } = req.body;
        try {
            await Group.sync();
            try {
                let updated = {};
                // confirm req body data is existed
                if (group_name) updated['group_name'] = group_name;
                if (group_owner) updated['group_owner'] = group_owner;
                await Group.update(updated, { where: { group_id } });
                console.log(`#${group_id} group updated!`);
                return res.status(200).json({ message: 'Update group success!', status: 200, success: true });
            } catch (err) {
                console.log('update group failed!', err);
                return res.status(500).json({ message: 'Update group failed!', status: 500, success: false });
            }
        } catch (err) {
            console.log('Group sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },

    delete: async (req, res, next) => {
        const { group_id } = req.params;
        try {
            await Group.sync();
            try {
                await Group.destroy({ where: { group_id } });
                console.log(`delete #${group_id} group success!`);
                return res.status(200).json({ message: 'Delete group success!', status: 200, success: true  });
            } catch (err) {
                console.log('delete group failed!', err);
                return res.status(500).json({ message: 'Delete group failed!', status: 500, success: false  });
            }
        } catch (err) {
            console.log('Group sync fail!', err);
            return res.status(500).json({ message: 'Database sync fail!', status: 500, success: false });
        }
    },
    deleteAttendee: (req, res, next) => {

    },
};
