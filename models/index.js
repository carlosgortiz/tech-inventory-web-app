const User = require('./User');
const Hardware = require('./Hardware');
const Software = require('./Software');
const Provider = require('./Provider');
const DevicePackage = require('./DevicePackage');

Hardware.belongsTo(Provider, {
    foreignKey: 'provider_id',
});

Software.belongsTo(Provider, {
    foreignKey: 'provider_id',
});

Hardware.hasMany(Software, {
    foreignKey: 'software_id',
});

Software.belongsToMany(Hardware, {
    through: DevicePackage
});

Hardware.belongsToMany(Software, {
    through: DevicePackage
});


module.exports = {
    User,
    Hardware,
    Software,
    Provider,
    DevicePackage,
};


