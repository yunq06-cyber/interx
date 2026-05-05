import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Cpu, GitBranch, FileKey, ExternalLink, Download, AlertTriangle, Wifi } from "lucide-react";
import { type AuthCert } from "@/data/web3Auth";

interface AuthCertModalProps {
  open: boolean;
  onClose: () => void;
  cert: AuthCert;
  productTitle: string;
}

function HashDisplay({ hash }: { hash: string }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!revealed) {
      const t = setTimeout(() => setRevealed(true), 800);
      return () => clearTimeout(t);
    }
  }, [revealed]);

  const display = revealed
    ? `0x${hash.slice(0, 8)}...${hash.slice(-8)}`
    : "0x████████...████████";

  return (
    <div className="space-y-2">
      <motion.div
        className="font-mono text-lg text-[#39FF14] tracking-widest"
        animate={{ opacity: revealed ? 1 : [0.3, 1, 0.3] }}
        transition={{ duration: 0.6, repeat: revealed ? 0 : Infinity }}
      >
        {display}
      </motion.div>
      {revealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-[10px] text-gray-600 break-all"
        >
          0x{hash}
        </motion.div>
      )}
    </div>
  );
}

function ChipPulse() {
  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      <motion.div
        className="absolute inset-0 rounded-full border border-[#39FF14]/30"
        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border border-[#39FF14]/20"
        animate={{ scale: [1, 2.0], opacity: [0.4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
      />
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}
      >
        <Cpu className="w-5 h-5 text-black" />
      </div>
    </div>
  );
}

function ScanlineOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        zIndex: 1,
      }}
    />
  );
}

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${ok ? "text-[#39FF14] border-[#39FF14]/30 bg-[#39FF14]/10" : "text-red-400 border-red-400/30 bg-red-400/10"}`}>
      <motion.span
        className={`w-1.5 h-1.5 rounded-full ${ok ? "bg-[#39FF14]" : "bg-red-400"}`}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      {label}
    </div>
  );
}

export function AuthCertModal({ open, onClose, cert, productTitle }: AuthCertModalProps) {
  const [loadStep, setLoadStep] = useState(0);

  useEffect(() => {
    if (open) {
      setLoadStep(0);
      const timers = [
        setTimeout(() => setLoadStep(1), 200),
        setTimeout(() => setLoadStep(2), 600),
        setTimeout(() => setLoadStep(3), 1000),
        setTimeout(() => setLoadStep(4), 1400),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#39FF14]/20 bg-[#020202] shadow-[0_0_60px_rgba(57,255,20,0.12)] scroll-smooth"
            style={{
              boxShadow: "0 0 0 1px rgba(57,255,20,0.08), 0 0 60px rgba(57,255,20,0.10), inset 0 0 40px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ScanlineOverlay />

            {/* ── HEADER ── */}
            <div className="relative z-10 p-6 border-b border-white/5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #39FF14, #0022FF)" }}
                  >
                    <ShieldCheck className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">interX Web3 Protocol v2.1 · ISO/IEC 14443A</div>
                    <h2 className="text-base font-mono font-bold text-white tracking-tight mt-0.5">Authentication certificate</h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <StatusPill ok={true} label="Verified" />
                <StatusPill ok={!cert.chip.tamperDetected} label={cert.chip.tamperDetected ? "Tamper detected" : "No tamper"} />
                <StatusPill ok={cert.chip.signatureValid} label={cert.chip.signatureValid ? "Signature valid" : "Signature invalid"} />
              </div>

              <div className="mt-3 text-xs text-gray-500 font-mono truncate">{productTitle}</div>
            </div>

            {/* ── BLOCKCHAIN ANCHOR ── */}
            <AnimatePresence>
              {loadStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10 p-6 border-b border-white/5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <GitBranch className="w-3.5 h-3.5 text-[#39FF14]" />
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Blockchain anchor</span>
                  </div>

                  <HashDisplay hash={cert.txHash} />

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      { label: "Network",   value: cert.network },
                      { label: "Block",     value: `#${cert.blockNumber}` },
                      { label: "Timestamp", value: cert.blockTimestamp },
                      { label: "Token ID",  value: `#${cert.tokenId}` },
                      { label: "Contract",  value: cert.contractAddr },
                      { label: "Standard",  value: "ERC-721 / EIP-2981" },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-black/60 rounded-lg border border-white/5 px-3 py-2">
                        <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-0.5">{label}</div>
                        <div className="text-xs font-mono text-gray-200 truncate">{value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── HARDWARE CHIP STATUS ── */}
            <AnimatePresence>
              {loadStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10 p-6 border-b border-white/5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu className="w-3.5 h-3.5 text-[#39FF14]" />
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Hardware chip status</span>
                  </div>

                  <div className="flex items-center gap-6">
                    <ChipPulse />
                    <div className="flex-1 space-y-2">
                      {[
                        { label: "Chip ID",      value: cert.chip.id },
                        { label: "Firmware",     value: cert.chip.firmware },
                        { label: "Manufacturer", value: cert.chip.manufacturer },
                        { label: "NFC frequency",     value: cert.chip.nfcFrequency },
                        { label: "Encryption",   value: cert.chip.encryptionStandard },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-baseline gap-2 text-xs font-mono">
                          <span className="text-gray-600 w-24 flex-shrink-0 text-[10px] uppercase tracking-wider">{label}</span>
                          <span className="text-gray-200 truncate">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-lg p-3 text-center">
                      <Wifi className="w-4 h-4 text-[#39FF14] mx-auto mb-1" />
                      <div className="text-[9px] font-mono text-gray-500 uppercase">Last ping</div>
                      <div className="text-xs font-mono text-white mt-0.5">{cert.chip.lastPinged}</div>
                    </div>
                    <div className="bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-lg p-3 text-center">
                      <ShieldCheck className="w-4 h-4 text-[#39FF14] mx-auto mb-1" />
                      <div className="text-[9px] font-mono text-gray-500 uppercase">Signature</div>
                      <div className="text-xs font-mono text-[#39FF14] mt-0.5">Valid</div>
                    </div>
                    <div className="bg-[#39FF14]/5 border border-[#39FF14]/20 rounded-lg p-3 text-center">
                      <AlertTriangle className="w-4 h-4 text-[#39FF14] mx-auto mb-1" />
                      <div className="text-[9px] font-mono text-gray-500 uppercase">Tamper</div>
                      <div className="text-xs font-mono text-[#39FF14] mt-0.5">None</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── OWNERSHIP PROVENANCE CHAIN ── */}
            <AnimatePresence>
              {loadStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10 p-6 border-b border-white/5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FileKey className="w-3.5 h-3.5 text-[#39FF14]" />
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Provenance chain</span>
                  </div>

                  <div className="relative pl-4">
                    {/* Vertical line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-[1px]" style={{ background: "linear-gradient(180deg, #39FF14, #0022FF)" }} />

                    <div className="space-y-5">
                      {cert.ownershipHistory.map((event, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="relative pl-5"
                        >
                          {/* Node dot */}
                          <div
                            className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full border-2 border-[#020202] flex-shrink-0"
                            style={{
                              background: i === cert.ownershipHistory.length - 1
                                ? "linear-gradient(135deg, #39FF14, #0022FF)"
                                : "rgba(57,255,20,0.4)",
                            }}
                          />

                          <div className="bg-black/40 rounded-lg border border-white/5 p-3">
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                              <div>
                                <div className="text-[9px] font-mono text-[#39FF14] uppercase tracking-widest mb-0.5">{event.action.replace(/_/g, " ")}</div>
                                <div className="text-xs font-mono text-white font-medium">{event.actor}</div>
                                {event.note && <div className="text-[11px] text-gray-500 mt-0.5">{event.note}</div>}
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="text-[9px] font-mono text-gray-500">{event.date}</div>
                                <div className="text-[9px] font-mono text-gray-700 truncate max-w-[100px]">{event.walletAddr}</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── DIGITAL SIGNATURE ── */}
            <AnimatePresence>
              {loadStep >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative z-10 p-6 border-b border-white/5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FileKey className="w-3.5 h-3.5 text-[#39FF14]" />
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Digital signature — ECDSA secp256k1</span>
                  </div>
                  <div className="bg-black rounded-lg border border-white/5 p-3 font-mono text-[9px] text-gray-600 break-all leading-relaxed">
                    {cert.signature}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── FOOTER ACTIONS ── */}
            <div className="relative z-10 p-6 flex flex-col sm:flex-row items-center gap-3">
              <button className="flex-1 w-full flex items-center justify-center gap-2 h-10 rounded-lg border border-[#39FF14]/30 text-[#39FF14] hover:bg-[#39FF14]/10 text-xs font-mono font-bold uppercase tracking-wider transition-all">
                <ExternalLink className="w-3.5 h-3.5" />
                On-chain verify
              </button>
              <button className="flex-1 w-full flex items-center justify-center gap-2 h-10 rounded-lg border border-white/10 text-gray-300 hover:border-white/25 hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all">
                <Download className="w-3.5 h-3.5" />
                Download certificate
              </button>
            </div>

            <div className="relative z-10 px-6 pb-5">
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-700 font-mono">
                <ShieldCheck className="w-3 h-3 text-[#39FF14]/50" />
                <span>Protected by interX Web3 Protocol · IPFS anchored · Tamper-proof</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
