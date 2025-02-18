const authMiddleware = require("./authMiddleware");
const projectOwnershipMiddleware = require("./projectOwnershipMiddleware");
const projectMembershipMiddleware = require("./projectMembershipMiddleware");

module.exports = {
  ...authMiddleware,
  ...projectOwnershipMiddleware,
  ...projectMembershipMiddleware,
};
