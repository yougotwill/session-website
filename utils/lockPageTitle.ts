export default function lockPageTitle() {
  if (typeof window !== 'undefined') {
    window.addEventListener('blur', () => {
      window.document.title = '🔐 ' + window.document.title;
    });
    window.addEventListener('focus', () => {
      window.document.title = window.document.title.split('🔐 ')[1];
    });
  }
}
