export function parseNumberOrNull(value) {
    if (value === undefined || value.trim().length === 0) {
        return null;
    } else {
        return Number(value.toString());
    }
}

module.exports.parseNumberOrNull = parseNumberOrNull;