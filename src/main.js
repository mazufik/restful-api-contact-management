import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

const PORT = process.env.EXTERNAL_PORT || 5000;

web.listen(PORT, () => {
  logger.info(`Server on port ${PORT}`);
});
