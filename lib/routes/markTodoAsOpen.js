'use strict';

const markTodoAsOpen = function({ store }) {
    return async function(req, res) {
        const { id } = req.params;
        let todo;

        try{
            await store.markTodoAsOpen({ id });
        }catch{
            return res.status(404).end();
        }
        
        res.json({});
    };
};

module.exports = { markTodoAsOpen };