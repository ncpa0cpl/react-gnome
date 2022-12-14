// src/utils/handle-program-error.ts
import chalk from "chalk";
var handleProgramError = (e) => {
  const isObject = (o) => typeof o === "object" && o != null;
  const isValidationError = (e2) => {
    return isObject(e2) && e2 instanceof Error && "fieldPath" in e2 || false;
  };
  if (isValidationError(e)) {
    console.error(
      chalk.redBright(
        `Config file is invalid. Property "${chalk.yellowBright(
          e.fieldPath
        )}" is incorrect.`
      )
    );
  } else if (isObject(e) && e instanceof Error) {
    console.error("Build failed due to an error: ", chalk.redBright(e.message));
  } else {
    console.error(chalk.redBright("Build failed due to an unknown error."));
  }
  process.exit(1);
};
export {
  handleProgramError
};
