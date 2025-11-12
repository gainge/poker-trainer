if [ ! -d ./test ]; then
    echo "No test directory found.";
    exit 1;
fi

# Check if a specific test file parameter was provided
if [ -n "$1" ]; then
    # Strip 'test/' prefix if present
    TEST_FILE="${1#test/}"

    # Change to the test directory
    cd ./test || exit 1;

    # Check if the specified file exists
    if [ ! -f "$TEST_FILE" ]; then
        echo -e "\e[31mError: Test file '$TEST_FILE' not found in test directory.\e[0m";
        exit 1;
    fi

    # Run the specific test file
    echo -e "\e[36m==============================\e[0m";
    echo -e "\e[3;93mRunning test file: $TEST_FILE\e[0m";
    cat "$TEST_FILE" | node --input-type=module;
    echo "Test execution completed.";
else
    # Change to the test directory
    cd ./test || exit 1;

    # Loop through all .spec.js files and run them with Node.js
    for file in ./*.spec.js; do
        echo -e "\e[36m==============================\e[0m";
        echo -e "\e[3;93mRunning test file: $file\e[0m";
        cat $file | node --input-type=module;
    done
    echo "All tests executed.";
fi