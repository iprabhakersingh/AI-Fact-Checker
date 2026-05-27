const extractText = require("../services/pdfExtractor");
const extractClaims = require("../services/claimExtractor");
const verifyClaim = require("../services/verifier");

exports.factCheck = async (req, res) => {

    try {

        // Validate file
        if (!req.file) {
            return res.status(400).json({
                message: "PDF file is required"
            });
        }

        // Extract PDF text
        const pdfText = await extractText(req.file.buffer);

        // Extract claims
        const claims = extractClaims(pdfText);

        if (!claims.length) {
            return res.status(400).json({
                message: "No factual claims found in PDF"
            });
        }

        const output = [];

        // Verify claims one by one
        for (const claim of claims) {

            const verified = await verifyClaim(claim);

            // Save report in MongoDB

            output.push({
                claim,
                status: verified.status,
                correctFact: verified.actualData,
                confidence: verified.confidence,
                reason: verified.reason,
                evidence: verified.evidence
            });
        }

        return res.json({
            success: true,
            totalClaims: claims.length,
            results: output
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};