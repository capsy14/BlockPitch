'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function InvestorMessages() {
  const [email, setEmail] = useState('');
  const [convos, setConvos] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('email');
    if (user) setEmail(user);
    // TODO: fetch investor-specific convos from `/api/conversations?role=investor&user=${user}`
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl mb-4">Investor Messages</h1>
      {convos.length === 0
        ? <p>No conversations yet.</p>
        : <ul>
            {convos.map(c => (
              <li key={c.email} className="mb-2">
                <Link href={`/chat/${encodeURIComponent(c.email)}`}>
                  <a className="block p-3 border rounded hover:bg-gray-50">
                    <strong>{c.name}</strong><br/>
                    <small>{c.email}</small>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
      }
    </div>
  );
}