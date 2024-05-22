import  express  from "express";
import usercontroller from "../controller/usercontroller.js";
import requireAuth from "../middleware/userAuth.js";
import checkAPILimit from "../middleware/checkAPILimit.js"
import webhookcontroller from "../controller/webhookcontroller.js";

const userRoute=express();



userRoute.post("/login",usercontroller.login);  
userRoute.get("/check-auth",requireAuth,usercontroller.checkAuth)
userRoute.get("/logout",requireAuth,usercontroller.logout);
userRoute.get("/viewnotifications",requireAuth,usercontroller.viewNotifications)
userRoute.get("/viewnotification/:Id",requireAuth,usercontroller.viewNotification) 
userRoute.get("/viewnewses",usercontroller.viewNewses)
userRoute.get("/viewnews/:Id",requireAuth,usercontroller.viewNews)
userRoute.get("/viewcareers",usercontroller.viewCareers);
userRoute.get("/viewcareer/:Id",requireAuth,usercontroller.viewCareer)  
userRoute.post("/viewIndividualresult",requireAuth,checkAPILimit,usercontroller.viewIndividualresult)

userRoute.post("/individualWebhookapi",requireAuth,usercontroller.individualWebhook);

userRoute.post("/viewcompanyresult",requireAuth,checkAPILimit,usercontroller.viewCompanyresult)
userRoute.get("/viewsearchhistory",requireAuth,usercontroller.viewSearchhistory)
userRoute.get("/viewdetailhistory/:id",requireAuth,usercontroller.viewDetailhistory)
userRoute.get("/viewApiusage",requireAuth,usercontroller.viewApiusage)
userRoute.post('/webhook/zignsec',requireAuth,webhookcontroller.handleWebhook)
userRoute.get('/getWebhookSessionUpdate/:sessionId',requireAuth,webhookcontroller.getWebhookData)

 

export default userRoute;

