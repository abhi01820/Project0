import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useReconciliation } from '../../context/ReconciliationContext';

export const UploadZone: React.FC = () => {
  const { uploadedFiles, uploadFile, removeUploadedFile, setActiveTab, runSimulation } = useReconciliation();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['.pdf', '.txt', '.docx', '.json'];

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);

    const file = files[0];
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!allowedTypes.includes(extension)) {
      setUploadError(`Unsupported file format (${extension}). Please upload PDF, TXT, or DOCX documents.`);
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setUploadError('File size exceeds 25 MB limit for demonstration environment.');
      return;
    }

    // Simulate progress
    setUploadProgress(15);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return null;
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            uploadFile(file);
            setUploadProgress(null);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Document Intake & Upload Center
            </h1>
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Contract Ingestion
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Upload broker quote letters, policy jackets, and endorsement riders for automated reconciliation.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveTab('simulation');
            runSimulation();
          }}
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-colors self-start md:self-auto"
        >
          <span>Reconcile Ingested Corpus</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Honest Demo Disclaimer Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <strong className="text-amber-300 block font-semibold">
            Demonstration Environment Transparency:
          </strong>
          <p>
            Document uploads here operate as local UI demonstrations. The active 3-way reconciliation and bounded agent analysis are driven by the verified fictional commercial property corpus (Apex Global Logistics LLC). Uploaded documents are securely tokenized in browser session storage and structured for plug-in connection to an enterprise OCR backend in Phase 2.
          </p>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01]'
            : 'border-slate-700/80 hover:border-cyan-500/50 bg-surface/60 hover:bg-surface'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.docx,.json"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="text-base font-bold text-white">
            Drag & drop insurance documents here, or <span className="text-cyan-400 underline">browse files</span>
          </h3>

          <p className="text-xs text-slate-400 font-mono">
            Supports PDF, DOCX, TXT contracts up to 25 MB
          </p>

          {uploadProgress !== null && (
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs font-mono text-cyan-400">
                <span>Simulating Document Ingestion...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-150"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {uploadError && (
            <div className="p-2.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-xs text-rose-300 flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Ingested Documents Table */}
      <div className="bg-surface rounded-xl border border-surface-border overflow-hidden shadow-lg space-y-3 p-5">
        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Document Repository Queue ({uploadedFiles.length} Documents)</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Client: Apex Global Logistics</span>
        </div>

        <div className="divide-y divide-surface-border">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-white truncate max-w-xs sm:max-w-md">
                    {file.name}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mt-0.5">
                    <span>{file.size}</span>
                    <span>&bull;</span>
                    <span>{file.type}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {file.uploadedAt}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  file.status === 'Parsed'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {file.status}
                </span>

                <button
                  onClick={() => removeUploadedFile(file.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                  title="Remove from session queue"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
