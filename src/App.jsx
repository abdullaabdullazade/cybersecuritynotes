import { Link } from 'react-router-dom';

const files = [
  'Networking.md',
  'Cryptography.md',
  'Osint.md',
  'Privilege Escalation.md',
  'Steganography.md',
];

export default function App() {
  return (
    <div className="h-screen w-screen bg-[#0f0f1a] text-cyan-100 font-mono flex items-center justify-center">
      <div className="p-6 bg-[#101124] rounded-lg shadow-lg border border-cyan-900 w-full max-w-md max-h-[90vh] flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-400 flex items-center gap-2 text-center">
          <i className="ri-terminal-box-line"></i> Cyber Security Notes
        </h1>
        <p className="text-cyan-300 mb-4 text-sm md:text-base text-center">
          Aşağıdakı .md fayllardan birini seç:
        </p>

        <div className="overflow-y-auto w-full scrollbar-thin scrollbar-thumb-cyan-800 scrollbar-track-transparent pr-1 flex-1">
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={file + index}>
                <Link
                  to={`/${encodeURIComponent(file)}`}
                  className="block bg-[#1a1a2e] hover:bg-cyan-800 transition px-4 py-2 rounded text-cyan-200 font-medium shadow"
                >
                  <i className="ri-file-markdown-line mr-2"></i> {file}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
