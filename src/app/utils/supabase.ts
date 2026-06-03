const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const headers = {
  'apikey': supabaseKey,
  'Authorization': `Bearer ${supabaseKey}`,
  'Content-Type': 'application/json',
};

export const supabaseFetch = async (path: string, options: RequestInit = {}) => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL ou Anon Key não estão configuradas nas variáveis de ambiente.');
  }

  const url = `${supabaseUrl}/rest/v1/${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || `Erro na comunicação com o Supabase: ${response.status}`);
  }

  const text = await response.text();
  if (!text || text.trim() === '') {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
};
