import {asRed, asGreen, asYellow, asCyan} from '../src/log.js';
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
