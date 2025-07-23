import { type ConfigPlugin, withMainActivity } from "@expo/config-plugins";

const addImports = [
  "import android.os.Build",
  "import android.view.View",
  "import androidx.core.view.ViewCompat",
  "import androidx.core.view.WindowInsetsCompat",
];

const addCode = `
    if (Build.VERSION.SDK_INT >= 35) {
      val rootView = findViewById<View>(android.R.id.content)
      ViewCompat.setOnApplyWindowInsetsListener(rootView) { _, insets ->
        val imeInsets = insets.getInsets(WindowInsetsCompat.Type.ime())
        rootView.setPadding(
          imeInsets.left,
          imeInsets.top,
          imeInsets.right,
          imeInsets.bottom
        )
        insets
      }
    }`;

const withAndroidKeyboardFix: ConfigPlugin = (config) => {
  return withMainActivity(config, (config) => {
    let mainActivity: string = config.modResults.contents;

    // 기존 import문을 추출해 Set으로 저장
    const prevImports = new Set(
      mainActivity
        .split("\n")
        .map((line) => line.trim())
        .filter((trimmedLine) => trimmedLine.startsWith("import"))
    );

    // 추가해야 할 import중 기존에 없는 항목만 필터링
    const missingImports = addImports.filter((line) => !prevImports.has(line));

    // 삽입할 import문을 줄바꿈으로 연결
    const missingImportsText = missingImports.join("\n");

    // 정규식을 활용해 누락 import문 주입
    mainActivity = mainActivity.replace(/^(package .+)$/m, `$1\n${missingImportsText}`);

    // 정규식을 활용해 supre.onCreate(...) 아래에 코드 주입
    mainActivity = mainActivity.replace(/(super\.onCreate\(.*\))/, `$1\n${addCode}`);

    // 기존 config의 MainActivity를 덮어씀
    config.modResults.contents = mainActivity;

    return config;
  });
};

export default withAndroidKeyboardFix;
