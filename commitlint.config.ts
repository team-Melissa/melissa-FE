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
    "subject-contains-issue": [RuleConfigSeverity.Error, "always"],
  },
  plugins: [
    {
      rules: {
        "subject-contains-issue": (parsed) => {
          const subject = parsed.subject ?? "";
          const issueNumberRegex = /\(#\d+\)/;
          const isValid = issueNumberRegex.test(subject);
          return [isValid, "커밋 subject에 (#123) 형식의 이슈 번호를 포함해야 합니다."];
        },
      },
    },
  ],
};

export default Configuration;
