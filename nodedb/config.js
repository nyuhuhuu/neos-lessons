module.exports = {
    mongoDbUrl: process.env.NODEDB_TESTDB_URL || 'mongodb://127.0.0.1:27017/nodedb',
    mongoDbName: process.env.NODEDB_TESTDB_NAME || 'nodedb',
    store: process.env.NODEDB_STORE || 'mongoose'
};
