const router = require("express").Router();
const { UploadController, UserUploadController } = require("../controllers/upload.controller.js");
const AccessController = require("../controllers/access.controller.js");
const OptionsController = require("../controllers/options.controller.js");
const SignInController = require("../controllers/sign_in.controller.js");
const SignUpController = require("../controllers/sign_up.controller.js");
const IndexMiddleware = require("../middleware/index.middleware.js")
const UtilsComponents = require("../util/UtilsComponents.js")

router.post("/options_auth", [IndexMiddleware.verifyToken, IndexMiddleware.auth], OptionsController)
router.post("/options", OptionsController)
router.post("/upload", UtilsComponents.cloudinary.single('PORTADA'), UploadController)
router.post("/upload_user", UtilsComponents.cloudinary.single('IMAGEN'), UserUploadController)
router.post("/access", [IndexMiddleware.verifyToken, IndexMiddleware.auth], AccessController)
router.post("/sign_in", SignInController)
router.post("/sign_up", SignUpController)

module.exports = router 