import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      ["Build", "Chore", "Ci", "Docs", "Feat", "Fix", "Perf", "Refactor", "Revert", "Style", "Test"],
    ],
    "type-case": [RuleConfigSeverity.Error, "always", "pascal-case"],
    "subject-case": [RuleConfigSeverity.Disabled],
  },
};

export default Configuration;
