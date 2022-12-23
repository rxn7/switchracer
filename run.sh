#!/usr/bin/env bash

./build.sh

pushd build
npx live-server
popd