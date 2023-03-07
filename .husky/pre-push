#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

export FORCE_COLOR=1

echo '🧪 Running unit tests before pushing!'

npm run test -- --no-watch --code-coverage --browsers=ChromeHeadlessCI || (
  echo '❌ Ooops! Tests have failed!';
  false;
)

echo '✅ Tests have been successfully completed!';
