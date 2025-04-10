# DESCRIPTION:
# This script is used to pass .tool-versions as "--build-args" to the
# docker build command. Additionally it's used to inject
# **/package.json files from all workspaces into current workspace
# dockerfile
#
# USAGE:
# $ IMAGE_NAME=example sh docker.build.sh
# * IMAGE_NAME: env variable which sets image name and tag (name:tag)
#
# NOTE:
# Script uses pwd. That means that it should be run from the workspace
# root folder in order to resolve all imports and modify files correctly

workspace=$(pwd | grep -Po '(?!web-template/)(?<=web-template/).*')
rootPath=$(echo $workspace | perl -pe 's|[^/]+|..|g')
packagePaths=$(
  find "$rootPath"\
    -type f\
    -name 'package.json'\
    -not -path "*/node_modules/*" -prune\
    -not -path "*/src/*" -prune\
    -not -path "*/build/*" -prune\
  | perl -pe 's|\.\./||g'
)

copyInstructions=$(
  echo COPY --from=build /app/pnpm-workspace.yaml ./
  echo COPY --from=build /app/patches/ ./patches/
  echo COPY --from=build /app/$workspace/build/ ./$workspace/build/
  for packagePath in $packagePaths
  do
    echo COPY --from=build /app/$packagePath ./$packagePath
  done
)

perl -0777 -pe "s|# GENERATED.*?#|# GENERATED\n$copyInstructions\n#|gs" dockerfile > dockerfile.generated
mv dockerfile.generated dockerfile

buildArgs=$(
  echo --build-arg NODE_VERSION=$(grep 'nodejs' "$rootPath/.tool-versions" | perl -lae 'print $F[1]')
  echo --build-arg PNPM_VERSION=$(grep 'pnpm' "$rootPath/.tool-versions" | perl -lae 'print $F[1]')
  echo --build-arg PACKAGE_NAME=$(grep 'name' 'package.json' | perl -lne 'print $1 if /"name": "(.*)"/')
)

docker build ${buildArgs} --build-context root=$rootPath . -t $IMAGE_NAME
