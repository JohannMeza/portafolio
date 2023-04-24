const APP_DEVELOPMENT = true;

const APP_DEV_URL = "http://localhost:4000";
const APP_DEV_TOKEN = "portafolio_johann";

const APP_PRD_URL = "http://localhost:4000";
const APP_PRD_TOKEN = "portafolio_johann";

const EnvConstants = {
  APP_TOKEN:            APP_DEVELOPMENT  ? APP_DEV_TOKEN : APP_PRD_TOKEN,
  APP_URL_BASE:         (APP_DEVELOPMENT ? APP_DEV_URL   : APP_PRD_URL) + "/api/options_auth",
  APP_URL_BASE_FRONT:   (APP_DEVELOPMENT ? APP_DEV_URL   : APP_PRD_URL) + "/api/options",
  APP_URL_UPLOAD:       (APP_DEVELOPMENT ? APP_DEV_URL   : APP_PRD_URL) + "/api/upload",
  APP_URL_UPLOAD_USER:  (APP_DEVELOPMENT ? APP_DEV_URL   : APP_PRD_URL) + "/api/upload_user",
  APP_URL_SIGN_IN:      (APP_DEVELOPMENT ? APP_DEV_URL   : APP_PRD_URL) + "/api/sign_in",
  APP_URL_SIGN_UP:      (APP_DEVELOPMENT ? APP_DEV_URL   : APP_PRD_URL) + "/api/sign_up",
  APP_URL_ACCESS:       (APP_DEVELOPMENT ? APP_DEV_URL   : APP_PRD_URL) + "/api/access",
}

export default EnvConstants