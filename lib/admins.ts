// Lista de correos autorizados a entrar al panel.
// Se define en la variable NEXT_PUBLIC_ADMIN_EMAILS (separados por coma).
// IMPORTANTE: esta lista controla la interfaz. La seguridad real se aplica
// también en firestore.rules y storage.rules (debe coincidir con esta lista).
export const ADMIN_EMAILS: string[] = (
  process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? ""
)
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function esAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  // Si no se configuró ninguna lista, no se autoriza a nadie.
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
