import { generateKeyPair, signPayload, verifyBackup } from "json-seal";

const runRsaPss = async () => {
  console.log("--- RSA-PSS ---");
  const { privateKey, publicKey } = await generateKeyPair();

  const backup = await signPayload({ id: 1000 }, privateKey, publicKey);
  console.log("Original valid:", (await verifyBackup(backup)).valid, backup);

  backup.payload.id = 1001;
  console.log("Tampered valid:", (await verifyBackup(backup)).valid, backup);
};

const runEd25519 = async () => {
  console.log("--- Ed25519 ---");
  const { privateKey, publicKey } = await generateKeyPair("Ed25519");

  const backup = await signPayload({ id: 2000 }, privateKey, publicKey, { algorithm: "Ed25519" });
  console.log("Original valid:", (await verifyBackup(backup)).valid, backup);

  backup.payload.id = 2001;
  console.log("Tampered valid:", (await verifyBackup(backup)).valid, backup);
};

await runRsaPss();
await runEd25519();
