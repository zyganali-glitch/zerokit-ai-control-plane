# Adapter compatibility matrix

ZeroKit is route-flexible and payload-strict. `endpoint_map` can point a logical panel key at a different route, but the response still has to satisfy the consumer's documented keys, nesting, value types, error behavior, and authorization boundary.

| Boundary | Evidence status | What is proven | What remains |
| --- | --- | --- | --- |
| PocketBase synthetic list envelope (`items`, `totalItems`) | **Proven with fixture and tests** | The committed synthetic envelope is accepted; malformed or missing envelope keys fail closed. | Other collections and production data are not covered. |
| ZeroKit strict users projection (`users`, `total`) | **Proven with fixture and tests** | Two synthetic PocketBase items map to two ZeroKit users and `totalItems` maps to `total`. | Field-level authorization and a live deployment remain integration responsibilities. |
| Generic REST list shape | **Documented pattern; fixture required** | The adapter-gap method identifies collection/count/key differences without inventing compatibility. | A sanitized fixture and tests are required before any PASS claim. |
| Arbitrary backend | **Not claimed** | No universal compatibility claim is made. | Each enabled operation requires an explicit adapter, fixture, negative cases, and authorization review. |
| Production backend | **Intentionally excluded** | Production records, credentials, logs, and runtime authorization stay outside the model and demo loop. | Integration belongs in the customer's controlled environment after review. |

## Concrete proof in this repository

The one implemented adapter boundary is:

```text
PocketBase synthetic response
  { items: [...], totalItems: 2 }
                 ↓ fail-closed adapter
ZeroKit users contract
  { users: [...], total: 2 }
```

Run it with:

```bash
npm run demo:pocketbase
```

The success fixture and malformed-shape tests are described in [PocketBase adapter proof](pocketbase-adapter-proof.md). The broader [synthetic adapter gap report](adapter-gap-report.example.md) is a planning artifact: rows without a committed fixture and test remain “fixture required,” “shim required,” “unknown,” or “missing”—never unconditionally compatible.

## Method for another backend

1. Share only a sanitized schema, OpenAPI fragment, or synthetic response fixture.
2. Compare its envelope and fields with the strict ZeroKit consumer contract.
3. Record exact mappings, missing keys, unknowns, error shapes, and authorization assumptions.
4. Implement a small fail-closed adapter.
5. Add success, empty, malformed, unauthorized, unavailable, and privacy-negative tests.
6. Report compatibility only for the tested fixture and operation.

This matrix proves one concrete adapter boundary and a repeatable method for more. It does not claim universal backend compatibility.
