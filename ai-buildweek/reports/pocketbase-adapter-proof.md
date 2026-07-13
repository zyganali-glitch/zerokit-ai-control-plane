# PocketBase open-source adapter proof

This proof uses a fully synthetic fixture shaped like PocketBase's documented paginated records response. It does not connect to a live database or contain real user records.

PocketBase returns record lists with an `items` array and `totalItems` count. The selected ZeroKit users consumer requires `{ users: [], total: number }`. The local adapter therefore:

1. validates the PocketBase envelope and every required synthetic record key;
2. maps `items` to `users` and `totalItems` to `total`;
3. projects only allowlisted user fields;
4. fails closed on missing keys or invalid count types;
5. makes no network request and adds no dependency.

Run the proof:

```bash
npm run demo:pocketbase
```

The command reads `ai-buildweek/examples/pocketbase-users.response.synthetic.json`, prints the adapted ZeroKit response, and emits a PASS summary. Unit tests cover the successful mapping and malformed/missing-key failures.

This is evidence of a real adapter boundary, not a claim that all PocketBase collections or authentication rules are automatically compatible. A live PocketBase demo should use a local disposable database, synthetic records, explicit collection API rules, and the same adapter tests before recording.
