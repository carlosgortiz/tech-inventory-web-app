const User = require('./User');
const Provider = require('./Provider');
const Hardware = require('./Hardware');
const Software = require('./Software');
const DevicePackage = require('./DevicePackage');

Hardware.belongsTo(Provider, {
    foreignKey: 'provider_id',
});

Software.belongsTo(Provider, {
    foreignKey: 'provider_id',
}); 

Software.belongsToMany(Hardware, {
    through: DevicePackage
});

Hardware.belongsToMany(Software, {
    through: DevicePackage
}); 



module.exports = {
    User,
    Provider,
    Hardware,
    Software,
    DevicePackage,
};


