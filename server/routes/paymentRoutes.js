const express = require("express")
const router = express.Router()
const { getPayments, createPayment, updatePayment, deletePayment, getOnePayment, checkUsersPayment } = require("../controllers/paymentControlllers")
const verifyToken = require("../middleware/verifyToken")
const allowedTo = require("../middleware/allowedTo")
const { user_roles } = require("../tools/rolesConstants")

router.route("/")
    .get(verifyToken, getPayments)
    .post(verifyToken, allowedTo(user_roles.ADMIN), createPayment)
    .patch(verifyToken, allowedTo(user_roles.ADMIN), checkUsersPayment)
    .delete(verifyToken, allowedTo(user_roles.ADMIN), deletePayment)

router.route('/:id')
    .get(verifyToken, getOnePayment)

module.exports = router