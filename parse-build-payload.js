const fs = require('fs');
const path = require('path');

try {
  console.log('[System Configurator] Parsing dynamic input manifests...');

  const baseAppJsonPath = path.join(__dirname, 'app.json');
  let appConfig = { expo: { name: "Base", slug: "base", version: "1.0.0" } };

  if (fs.existsSync(baseAppJsonPath)) {
    appConfig = JSON.parse(fs.readFileSync(baseAppJsonPath, 'utf8'));
  }

  // 1. Overwrite user branding configurations
  appConfig.expo.name = process.env.APP_NAME || appConfig.expo.name;
  appConfig.expo.slug = (process.env.APP_NAME || "app").toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  appConfig.expo.android = appConfig.expo.android || {};
  appConfig.expo.android.package = process.env.PACKAGE_NAME || "com.anonymous.placeholder";

  // 2. Map structural app icon and splash assets packed inside your users zip structure
  appConfig.expo.icon = "./assets/icon.png";
  appConfig.expo.splash = {
    "resizeMode": "contain",
    "backgroundColor": "#ffffff",
    "image": "./assets/splash.png"
  };
  
  appConfig.expo.android.adaptiveIcon = {
    "foregroundImage": "./assets/icon.png",
    "backgroundColor": "#ffffff"
  };

  // Write finalized clean manifest file configurations back to workspace
  fs.writeFileSync(baseAppJsonPath, JSON.stringify(appConfig, null, 2), 'utf8');
  console.log('✅ [System Configurator] App settings metadata and branding layers successfully injected.');

  // 3. Mount singing block metrics directly onto local Gradle system properties file
  const gradlePropertiesPath = path.join(__dirname, 'gradle.properties');
  const signingProperties = `
MYAPP_RELEASE_STORE_FILE=release-key.jks
MYAPP_RELEASE_STORE_PASSWORD=${process.env.KEYSTORE_PASS || ''}
MYAPP_RELEASE_KEY_ALIAS=${process.env.KEY_ALIAS || ''}
MYAPP_RELEASE_KEY_PASSWORD=${process.env.KEY_PASS || ''}
org.gradle.jvmargs=-Xmx3072m -XX:MaxMetaspaceSize=512m
org.gradle.parallel=true
org.gradle.configureondemand=true
org.gradle.caching=true
`;

  fs.appendFileSync(gradlePropertiesPath, signingProperties, 'utf8');
  console.log('✅ [System Configurator] Native cryptographic links successfully joined to system properties.');

} catch (error) {
  console.error('[Critical Asset Configuration Interruption]:', error);
  process.exit(1);
}