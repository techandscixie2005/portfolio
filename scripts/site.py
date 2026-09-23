"""Preview/export only the public site allowlist; never serve local research records."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import unquote, urlsplit
import argparse
import shutil

ROOT = Path(__file__).resolve().parents[1]
FILES = [
    'index.html', 'styles.css', 'script.js', 'theme.js', 'Xie_Xiangyu_Resume.pdf',
    'sitemap.xml', 'robots.txt', 'assets/favicon.svg', 'assets/social-card.png',
    'assets/quantum-agent-20260918.webp',
    *['details/' + name + '.html' for name in (
        'research-quantum-agent', 'research-egnn', 'research-chem-experiment',
        'research-doublet-emissive', 'teaching-quantum', 'teaching-math-physics',
        'teaching-complex-analysis', 'award-scholarship')]
]

class PublicHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        path = unquote(urlsplit(self.path).path)
        if path in ('/', '/portfolio'):
            self.send_response(302)
            self.send_header('Location', '/portfolio/')
            self.end_headers()
            return None
        relative = path.removeprefix('/portfolio/')
        if path == '/portfolio/':
            relative = 'index.html'
        if not path.startswith('/portfolio/') or relative not in FILES:
            self.send_error(404)
            return None
        self.path = '/' + relative
        return super().send_head()

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8000)
    parser.add_argument('--export', type=Path, help='Create a new directory containing public files only')
    args = parser.parse_args()
    missing = [p for p in FILES if not (ROOT / p).is_file()]
    if missing:
        parser.error('Missing public files: ' + ', '.join(missing))
    if args.export:
        target = args.export.resolve()
        if target.exists():
            parser.error('Export directory must not already exist; choose a new path.')
        if target == ROOT or ROOT in target.parents:
            parser.error('Choose a destination outside the repository.')
        target.mkdir(parents=True)
        for name in FILES:
            output = target / name
            output.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(ROOT / name, output)
        print(f'Exported {len(FILES)} public files.')
    else:
        print(f'Preview: http://127.0.0.1:{args.port}/portfolio/', flush=True)
        ThreadingHTTPServer(('127.0.0.1', args.port), PublicHandler).serve_forever()

if __name__ == '__main__':
    main()
