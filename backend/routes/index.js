const app = require("express");
const userRouter = require('./user/user.js')
const mediaRoute = require('./vedio/vedio.js')
const profilRoutes = require('./profile/profile.js')
const dashboardRoutes = require('./dashboard/dashboard.js')

const router = app.Router()

router.use('/user',userRouter)
router.use('/media',mediaRoute)
router.use('/dashboard',dashboardRoutes)
router.use('/profile',profilRoutes)


module.exports = router;