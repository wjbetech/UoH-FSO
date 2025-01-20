import app from "./app";
import config from "./utils/config";
import logger from "./utils/logger";

app.listen(config.PORT, () => {
  logger.info("listening on port " + config.PORT);
});
