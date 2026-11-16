export const str = (v: FormDataEntryValue | unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
export const num = (v: FormDataEntryValue | unknown) => { const n = Number(v); return Number.isFinite(n) && String(v).trim() !== '' ? n : null; };
export const isEmail = (e: string) => /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(e);
export const bool = (v: FormDataEntryValue | null) => v === 'on' || v === 'true';
export const json = (body: unknown, status = 200) => Response.json(body, { status });
