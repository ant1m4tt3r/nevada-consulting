import '../globals.css';
import { jakartaSans } from '../fonts';

export default function RedirectLayout({ children }) {
  return (
    <html lang='pt-BR'>
      <body className={jakartaSans.className}>{children}</body>
    </html>
  );
}
