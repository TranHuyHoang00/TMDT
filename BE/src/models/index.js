
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Status = require("./status")(sequelize, Sequelize);
db.Role = require("./role")(sequelize, Sequelize);
db.User_role = require("./user_role")(sequelize, Sequelize);
db.Tour = require("./tour")(sequelize, Sequelize);
db.Vehicle = require("./vehicle")(sequelize, Sequelize);
db.Place = require("./place")(sequelize, Sequelize);
db.Plan = require("./plan")(sequelize, Sequelize);
db.Detail = require("./detail")(sequelize, Sequelize);
db.Discount = require("./discount")(sequelize, Sequelize);
db.Ticket = require("./ticket")(sequelize, Sequelize);
db.Order = require("./order")(sequelize, Sequelize);
db.Tour_ticket = require("./tour_ticket")(sequelize, Sequelize);
db.Order_Tour_ticket = require("./order_Tour_ticket")(sequelize, Sequelize);

// Order-> Order_Tour_ticket
db.Order_Tour_ticket.belongsTo(db.Order, { foreignKey: 'orderId' });
db.Order.hasMany(db.Order_Tour_ticket, { foreignKey: 'orderId' });
// Order_Tour_ticket->Tour_ticket
db.Order_Tour_ticket.belongsTo(db.Tour_ticket, { foreignKey: 'tour_ticket_Id' });
db.Tour_ticket.hasMany(db.Order_Tour_ticket, { foreignKey: 'tour_ticket_Id' });
// Tour_ticket -> Ticket
db.Tour_ticket.belongsTo(db.Ticket, { foreignKey: 'ticketId' });
db.Ticket.hasMany(db.Tour_ticket, { foreignKey: 'ticketId' });
// Tour_ticket -> Tour
db.Tour_ticket.belongsTo(db.Tour, { foreignKey: 'tourId' });
db.Tour.hasMany(db.Tour_ticket, { foreignKey: 'tourId' });

db.Tour.belongsTo(db.Vehicle, { foreignKey: 'vehicleId' });
db.Vehicle.hasMany(db.Tour, { foreignKey: 'vehicleId' });

db.Tour.belongsTo(db.Status, { foreignKey: 'statusId' });
db.Status.hasMany(db.Tour, { foreignKey: 'statusId' });

db.Tour.belongsTo(db.Place, { as: 'place_start', foreignKey: 'place_start_id' });
db.Place.hasMany(db.Tour, { foreignKey: 'place_start_id' });

db.Tour.belongsTo(db.Place, { as: 'place_finish', foreignKey: 'place_finish_id' });
db.Place.hasMany(db.Tour, { foreignKey: 'place_finish_id' });

db.User.belongsTo(db.Status, { foreignKey: 'statusId' });
db.Status.hasMany(db.User, { foreignKey: 'statusId' });

db.User_role.belongsTo(db.User, { foreignKey: 'userId' });
db.User.hasMany(db.User_role, { foreignKey: 'userId' });

db.Order.belongsTo(db.Status, { foreignKey: 'statusId' });
db.Status.hasMany(db.Order, { foreignKey: 'statusId' });

db.Order.belongsTo(db.User, { foreignKey: 'customerId' });
db.User.hasMany(db.Order, { foreignKey: 'customerId' });



db.User.belongsToMany(db.Role, { through: "user_roles", as: "roles", foreignKey: "userId", });
db.Role.belongsToMany(db.User, { through: "user_roles", as: "users", foreignKey: "roleId", });

db.Tour.belongsToMany(db.Service, { through: "tour_services", as: "services", foreignKey: "tourId", });
db.Service.belongsToMany(db.Tour, { through: "tour_services", as: "tours", foreignKey: "serviceId", });

db.Tour.belongsToMany(db.Note, { through: "tour_notes", as: "notes", foreignKey: "tourId", });
db.Note.belongsToMany(db.Tour, { through: "tour_notes", as: "tours", foreignKey: "noteId", });

db.Tour.belongsToMany(db.Plan, { through: "tour_plans", as: "plans", foreignKey: "tourId", });
db.Plan.belongsToMany(db.Tour, { through: "tour_plans", as: "tours", foreignKey: "planId", });

db.Plan.belongsToMany(db.Detail, { through: "plan_details", as: "details", foreignKey: "planId", });
db.Detail.belongsToMany(db.Plan, { through: "plan_details", as: "plans", foreignKey: "detailId", });

db.Tour.belongsToMany(db.Discount, { through: "tour_discounts", as: "discounts", foreignKey: "tourId", });
db.Discount.belongsToMany(db.Tour, { through: "tour_discounts", as: "tours", foreignKey: "discountId", });

// Tour -> Ticket
db.Tour.belongsToMany(db.Ticket, { through: "tour_tickets", as: "tickets", foreignKey: "tourId", });
db.Ticket.belongsToMany(db.Tour, { through: "tour_tickets", as: "tours", foreignKey: "ticketId", });

db.Order.belongsToMany(db.Tour_ticket, { through: "order_tour_tickets", as: "tour_tickets", foreignKey: "orderId", });
db.Tour_ticket.belongsToMany(db.Order, { through: "order_tour_tickets", as: "orders", foreignKey: "tour_ticket_Id", });

db.Order_Tour_ticket.belongsToMany(db.Ticket, { through: "tour_tickets", as: "tickets", foreignKey: "ticketId", });
db.Ticket.belongsToMany(db.Order_Tour_ticket, { through: "tour_tickets", as: "tickets", foreignKey: "ticketId", });
module.exports = db;