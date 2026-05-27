function extractClaims(text) {

    return text
        .split(/\d+\./)
        .map(claim => claim.trim())
        .filter(claim => claim.length > 20);

}

module.exports = extractClaims;