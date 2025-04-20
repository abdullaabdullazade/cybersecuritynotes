import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { marked } from 'marked';

export default function MarkdownPage() {
    const { filename } = useParams();
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`/cyber/${filename}`)
            .then((res) => {
                if (!res.ok) throw new Error('Fayl tapılmadı');
                return res.text();
            })
            .then((text) => {
                setContent(marked.parse(text));
                setError('');
            })
            .catch((err) => setError(err.message));
    }, [filename]);

    return (
        <div className="min-h-screen w-full bg-[#0f0f1a] text-cyan-100 font-mono flex flex-col md:flex-row overflow-x-hidden">
            <div className="w-full md:w-1/3 p-4 bg-[#101124] border-r border-cyan-900">
                <h1 className="text-xl md:text-3xl font-bold mb-2 text-cyan-400 break-words">
                    <i className="ri-book-2-line mr-2"></i> {filename}
                </h1>
            </div>

            <div className="w-full md:w-2/3 px-4 py-6 overflow-y-auto">
                {error ? (
                    <p className="text-red-400">{error}</p>
                ) : (
                    <div
                        className="bg-[#111827] text-cyan-100 text-sm md:text-base leading-relaxed tracking-normal 
                    whitespace-pre-wrap break-words rounded-lg border border-cyan-800 shadow-md 
                    w-full max-w-full p-4 md:p-6"
                        style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            fontSize: '1rem', 
                            lineHeight: '1.75rem', 
                        }}
                        dangerouslySetInnerHTML={{ __html: content }}
                    />


                )}
            </div>
        </div>
    );
}
