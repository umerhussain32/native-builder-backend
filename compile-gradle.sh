#!/bin/bash
BUILD_TYPE=$1

cd android
chmod +x gradlew

if [ "$BUILD_TYPE" = "aab" ]; then
  echo "🚀 Executing Raw Android App Bundle (AAB) Gradle Engine Compilation..."
  ./gradlew bundleRelease
else
  echo "🚀 Executing Raw Android Application Package (APK) Gradle Engine Compilation..."
  ./gradlew assembleRelease
fi

echo "✅ Cloud compile workflow execution trace complete."