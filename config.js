module.exports = {
    mongoDbUrl: 'mongodb://127.0.0.1:27017/nodedb',
    mongoDbName: 'nodedb',
    store: process.env.NODEDB_ENGINE || 'mongoose'
};
