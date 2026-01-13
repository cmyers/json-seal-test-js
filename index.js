import { generateKeyPair, signPayload, verifyBackup } from "json-seal";

const run = async () => {
  const { privateKey, publicKey } = await generateKeyPair();

  const backup = await signPayload({ id: 1000 }, privateKey, publicKey);

  console.log("Original valid:", (await verifyBackup(backup)).valid,  backup);

  backup.payload.id = 1001;

  console.log("Tampered valid:", (await verifyBackup(backup)).valid,  backup);
};

run();
