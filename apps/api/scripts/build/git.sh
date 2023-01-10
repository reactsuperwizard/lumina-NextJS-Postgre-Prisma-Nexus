#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

branch=$(git rev-parse --abbrev-ref HEAD)
hash=$(git rev-parse HEAD)
echo '{ 
  "branch": "'$branch'",
  "commit": "'$hash'"
}' > ../../generated/git.json 