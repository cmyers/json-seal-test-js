# **json-seal-test-js**

A tiny JavaScript project that demonstrates how to use **json‑seal** to sign JSON data and detect tampering.  
This repo exists purely as a quick, runnable test of the library’s integrity guarantees.

## **What this test does**

- Generates a fresh RSA key pair  
- Seals a JSON payload using `signPayload`  
- Verifies the sealed backup  
- Mutates the payload to simulate tampering  
- Verifies again to show that the signature is no longer valid  

It’s a minimal, real‑world example of how json‑seal protects structured data.

## **Running the test**

Clone the repo and install dependencies:

```bash
npm install
```

Run the test script:

```bash
npm test
```

You should see output similar to:

```
Original valid: true { ... }
Tampered valid: false { ... }
```

## **index.js**

This is the entire test:

```js
import { generateKeyPair, signPayload, verifyBackup } from "json-seal";

const run = async () => {
  const { privateKey, publicKey } = await generateKeyPair();

  const backup = await signPayload({ id: 1000 }, privateKey, publicKey);

  console.log("Original valid:", (await verifyBackup(backup)).valid, backup);

  backup.payload.id = 1001;

  console.log("Tampered valid:", (await verifyBackup(backup)).valid, backup);
};

run();
```

## **Why this repo exists**

This is a simple demonstration for developers who want to:

- understand how json‑seal works  
- see tamper detection in action  
- run a minimal example without setting up a full project  

If you’re exploring json‑seal or evaluating it for your own app, this repo gives you a quick, hands‑on feel for its behavior.

---
