const express = require("express");
const { registerUser, loginUser, logout, forgotPassword,
    resetPassword, getUserDetails, updatePassword, updateProfile,
    getAllUser, getSingleUser, updateUserProfile, deleteUser
} = require("../controllers/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser, getUserDetails)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)
router.route("/me/update").put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser)
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserProfile)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

router.route("/logout").post(logout)



module.exports = router