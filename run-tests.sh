if [ ! -d ./test ]; then
    echo "No test directory found.";
    exit 1;
fi
# Change to the test directory
cd ./test || exit 1;
# Loop through all .spec.js files and run them with Node.js
for file in ./*.spec.js; do
    echo "Running test file: $file";
    cat $file | node --input-type=module;
done
echo "All tests executed.";