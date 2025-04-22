import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

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
                const html = marked.parse(text);
                setContent(DOMPurify.sanitize(html)); // XSS-dən qoruma
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
                        className="prose prose-invert max-w-none prose-code:text-pink-400 prose-pre:bg-[#12131c] prose-pre:rounded-lg prose-pre:text-cyan-200 prose-pre:p-4
                                   prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-[#1a1a2e] prose-blockquote:p-4 prose-blockquote:text-gray-300
                                   prose-h1:text-cyan-400 prose-h2:text-cyan-300 prose-h3:text-cyan-200 prose-table:border prose-table:border-cyan-800
                                   prose-tr:border-t prose-tr:border-cyan-800 prose-th:bg-[#101124] prose-td:p-2
                                   break-words whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                )}
            </div>
        </div>
    );
}
