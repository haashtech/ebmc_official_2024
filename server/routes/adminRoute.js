import express from 'express'
import admincontroller from '../controller/admincontroller.js';
import requireAuth from '../middleware/adminAuth.js';


const adminRoute = express()

adminRoute.post("/login", admincontroller.login);
adminRoute.get("/checkauth", requireAuth, admincontroller.checkAuth)
adminRoute.get("/logout", requireAuth, admincontroller.logout);
adminRoute.post("/resetadminpassword",requireAuth,admincontroller.resetPassword)
adminRoute.post("/adduser", requireAuth, admincontroller.addUser);
adminRoute.get("/viewusers",requireAuth,admincontroller.viewUsers)
adminRoute.get("/viewuser/:Id",requireAuth,admincontroller.viewUser)
adminRoute.put("/updateuser/:Id",requireAuth,admincontroller.updateUser)
adminRoute.delete("/deleteuser/:Id",requireAuth,admincontroller.deleteUser);
adminRoute.put("/blockuser/:Id",requireAuth,admincontroller.blockUser);
adminRoute.put("/unblockuser/:Id",requireAuth,admincontroller.unblockUser);
adminRoute.get("/viewUsercount",requireAuth,admincontroller.viewUsercount)

adminRoute.get("/blockstatus/:Id",requireAuth,admincontroller.blockStatus)
 

adminRoute.post("/addnews", requireAuth, admincontroller.addNews);
adminRoute.get("/viewnewses",requireAuth,admincontroller.viewNewses);
adminRoute.get("/viewnews/:Id", requireAuth, admincontroller.viewNews);
adminRoute.put("/updatenews/:id", requireAuth, admincontroller.updateNews)
adminRoute.delete("/deletenews/:id", requireAuth, admincontroller.deleteNews);
adminRoute.post("/addnotification", requireAuth, admincontroller.addNotification);
adminRoute.get("/viewnotifications", requireAuth, admincontroller.viewNotifications)
adminRoute.get("/viewnotification/:Id", requireAuth, admincontroller.viewNotification)
adminRoute.put("/updatenotification/:Id", requireAuth, admincontroller.updateNotification)
adminRoute.delete("/deletenotification/:Id", requireAuth, admincontroller.deleteNotification)
adminRoute.post("/addcareer",requireAuth,admincontroller.addCareer);
adminRoute.get("/viewcareers",requireAuth,admincontroller.viewCareers);
adminRoute.get("/viewcareer/:Id",requireAuth,admincontroller.viewCareer)
adminRoute.put("/updatecareer/:Id",requireAuth,admincontroller.updateCareer);
adminRoute.delete("/deletecareer/:Id",requireAuth,admincontroller.deleteCareer)




export default adminRoute; 