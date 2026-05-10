import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
console.log('pdf type:', typeof pdf);
const { PDFParse } = pdf;
if (PDFParse) {
    console.log('PDFParse found, testing instantiation...');
    try {
        const parser = new PDFParse({ data: Buffer.from('%PDF-1.4') });
        console.log('PDFParse instantiated successfully');
    } catch (e) {
        console.log('PDFParse instantiation failed:', e.message);
    }
}
