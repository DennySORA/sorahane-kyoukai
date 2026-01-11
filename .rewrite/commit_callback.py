import json
from pathlib import Path

mapping = {}
with Path('.rewrite/commit_messages.jsonl').open('r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        obj = json.loads(line)
        mapping[obj['sha']] = obj['message']

def commit_callback(commit, metadata):
    orig = getattr(commit, 'original_id', None)
    if orig is None:
        orig = getattr(commit, 'old_id', None)
    if orig is None:
        orig = getattr(commit, 'id', None)

    if isinstance(orig, (bytes, bytearray)):
        sha = orig.hex()
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
