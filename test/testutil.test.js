// Color functions for logging
function asRed(message) {
    return `\x1b[31m${message}\x1b[0m`;
}
function asGreen(message) {
    return `\x1b[32m${message}\x1b[0m`;
}
function asYellow(message) {
    return `\x1b[33m${message}\x1b[0m`;
}
function asBlue(message) {
    return `\x1b[34m${message}\x1b[0m`;
}
function asMagenta(message) {
    return `\x1b[35m${message}\x1b[0m`;
}
function asCyan(message) {
    return `\x1b[36m${message}\x1b[0m`;
}
export function logInfo(message) {
    console.log(asCyan(`INFO: ${message}`));
}
export function logWarning(message) {
    console.log(asYellow(`WARNING: ${message}`));
}
export function logError(message) {
    console.log(asRed(`ERROR: ${message}`));
}


export function expect(condition, message) {
    if (!condition) {
        throw new Error(message || 'Expectation failed');
    }
}

export function it(description, fn) {
    try {
        fn();
        console.log(`${asGreen('✓')} ${description}`);
    } catch (error) {
        console.error(`${asRed('✗')} ${description}`);
        console.error(`  → ${error.message}`);
    }
}