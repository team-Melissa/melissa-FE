import { type ConfigPlugin, withMainActivity } from "@expo/config-plugins";

const withAndroidKeyboardFix = ((config) => {
  return withMainActivity(config, (config) => {
    let mainActivity = config.modResults.contents;

    if (!mainActivity.includes("WindowInsetsCompat.Type.ime()")) {
      const replacementKtCode = `
      override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)
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
        }
      }`;

      const importsToAddKotlin = [
        "android.os.Build",
        "android.view.View",
        "androidx.core.view.ViewCompat",
        "androidx.core.view.WindowInsetsCompat",
      ];

      const addMissingImports = (contents: string, imports: string[]) => {
        const lines = contents.split("\n");
        const existingImports = new Set(
          lines
            .filter((line) => line.trim().startsWith("import "))
            .map((line) => line.trim().replace("import ", "").replace(";", ""))
        );
        const missingImports = imports.filter((importStmt) => !existingImports.has(importStmt.replace(";", "")));

        if (missingImports.length === 0) return contents;

        const importBlock = missingImports.map((stmt) => `import ${stmt}`).join("\n");
        return contents.replace(/(package [^\n;]+[;\n])/, `$1\n${importBlock}\n`);
      };

      mainActivity = addMissingImports(mainActivity, importsToAddKotlin);
      mainActivity = mainActivity.replace(
        /override fun onCreate\([^)]*\)[^{]*{[\s\S]*?super\.onCreate\([^)]*\)\s*}/,
        replacementKtCode
      );

      config.modResults.contents = mainActivity;
    }

    return config;
  });
}) satisfies ConfigPlugin;

export default withAndroidKeyboardFix;
