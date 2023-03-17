#!/bin/bash

vision \
 --projectRootPath='../../..' \
 --tsConfig='../../../tsconfig.json' \
 --destName='vision' \
 --printIgnorePaths='[
   "src/index",
   "src/types/types.d.ts"
 ]'
