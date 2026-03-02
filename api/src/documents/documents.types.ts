export interface DocumentRecord {
  id: string;
  name: string;
  fileType: string;
  storagePath: string;
  status: 'active' | 'pending';
  uploadedBy: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface CreateDocumentDto {
  name: string;
  fileType: string;
  storagePath: string;
}

export interface AnalysisResult {
  contractType: string;
  keyParties: string[];
  complianceFlags: {
    label: string;
    severity: 'info' | 'warning' | 'critical';
  }[];
  summary: string;
}