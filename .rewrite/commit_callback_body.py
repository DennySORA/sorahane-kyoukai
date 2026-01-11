import json
from pathlib import Path

if 'mapping' not in globals():
    mapping = {}
    for line in Path('.rewrite/commit_messages.jsonl').read_text(encoding='utf-8').splitlines():
        if not line.strip():
            continue
        obj = json.loads(line)
        mapping[obj['sha']] = obj['message']

orig = getattr(commit, 'original_id', None)
if orig is None:
    orig = getattr(commit, 'old_id', None)
if orig is None:
    orig = getattr(commit, 'id', None)

if isinstance(orig, (bytes, bytearray)):
    raw = bytes(orig)
    if len(raw) == 40 and all(c in b'0123456789abcdef' for c in raw.lower()):
        sha = raw.decode('ascii')
    else:
        sha = raw.hex()
elif hasattr(orig, 'hex'):
    sha = orig.hex()
else:
    sha = str(orig)

message = mapping.get(sha)
if message is None:
    raise RuntimeError(f'Missing commit message for {sha}')

commit.message = message.encode('utf-8')
commit.author_name = b'DennySORA'
commit.committer_name = b'DennySORA'
