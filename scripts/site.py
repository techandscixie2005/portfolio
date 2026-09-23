"""Preview/export only the public site allowlist; never serve local research records."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import unquote, urlsplit
import argparse
import shutil
import re

ROOT = Path(__file__).resolve().parents[1]
FILES = [
    'index.html', 'styles.css', 'script.js', 'theme.js', 'demo.js', 'Xie_Xiangyu_Resume.pdf',
    'sitemap.xml', 'robots.txt', 'assets/favicon.svg', 'assets/social-card.png',
    'assets/quantum-agent-20260918.webp',
    'assets/quantum-agent-20260918.mp4',
    *['details/' + name + '.html' for name in (
        'research-quantum-agent', 'research-egnn', 'research-chem-experiment',
        'research-doublet-emissive', 'teaching-quantum', 'teaching-math-physics',
        'teaching-complex-analysis', 'award-scholarship')]
]

class PublicHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        self.byte_range = None
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
        if relative == 'assets/quantum-agent-20260918.mp4':
            media = ROOT / relative
            size = media.stat().st_size
            start, end = 0, size - 1
            request_range = self.headers.get('Range')
            if request_range:
                match = re.fullmatch(r'bytes=(\d*)-(\d*)', request_range.strip())
                if not match or not any(match.groups()):
                    self.send_error(400, 'Expected a single byte range')
                    return None
                first, last = match.groups()
                if first:
                    start = int(first)
                    end = min(int(last), size - 1) if last else size - 1
                else:
                    start = max(0, size - int(last))
                if start >= size or end < start:
                    self.send_response(416)
                    self.send_header('Content-Range', f'bytes */{size}')
                    self.send_header('Content-Length', '0')
                    self.end_headers()
                    return None
                self.byte_range = (start, end)
            self.send_response(206 if self.byte_range else 200)
            self.send_header('Content-Type', 'video/mp4')
            self.send_header('Accept-Ranges', 'bytes')
            self.send_header('Content-Length', str(end - start + 1))
            if self.byte_range:
                self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
            self.end_headers()
            stream = media.open('rb')
            stream.seek(start)
            return stream
        return super().send_head()

    def copyfile(self, source, outputfile):
        try:
            if self.byte_range is None:
                return super().copyfile(source, outputfile)
            remaining = self.byte_range[1] - self.byte_range[0] + 1
            while remaining:
                chunk = source.read(min(64 * 1024, remaining))
                if not chunk:
                    break
                outputfile.write(chunk)
                remaining -= len(chunk)
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
            pass  # A seek or navigation may close the previous media request.

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
