import mammoth from 'mammoth';

export interface ExtractedResumeData {
  text: string;
  fileName: string;
  fileType: 'pdf' | 'docx' | 'txt';
  extractedAt: Date;
}

export async function extractTextFromFile(file: File): Promise<ExtractedResumeData> {
  const fileName = file.name;
  const fileType = getFileType(fileName);
  
  let text = '';
  
  try {
    switch (fileType) {
      case 'pdf':
        // For now, show a helpful message for PDF files
        text = "PDF text extraction is temporarily unavailable. Please convert your PDF to a DOCX or TXT file for analysis.";
        break;
      case 'docx':
        text = await extractTextFromDOCX(file);
        break;
      case 'txt':
        text = await extractTextFromTXT(file);
        break;
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
    
    return {
      text: text.trim(),
      fileName,
      fileType,
      extractedAt: new Date()
    };
  } catch (error) {
    console.error('Error extracting text from file:', error);
    throw new Error(`Failed to extract text from ${fileName}: ${error.message}`);
  }
}

function getFileType(fileName: string): 'pdf' | 'docx' | 'txt' {
  const extension = fileName.toLowerCase().split('.').pop();
  
  switch (extension) {
    case 'pdf':
      return 'pdf';
    case 'docx':
    case 'doc':
      return 'docx';
    case 'txt':
      return 'txt';
    default:
      throw new Error(`Unsupported file extension: ${extension}`);
  }
}


async function extractTextFromDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  
  if (result.messages.length > 0) {
    console.warn('DOCX extraction warnings:', result.messages);
  }
  
  return result.value;
}

async function extractTextFromTXT(file: File): Promise<string> {
  return await file.text();
}

// Helper function to validate file before extraction
export function validateResumeFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }
  
  if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|docx?|txt)$/i)) {
    return { valid: false, error: 'Only PDF, DOCX, and TXT files are supported' };
  }
  
  return { valid: true };
}