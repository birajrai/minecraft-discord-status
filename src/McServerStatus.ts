import * as util from "minecraft-server-util";
export default async function fetchJavaServer(
  server: string
): Promise<boolean> {
  try {
    let split = server.split(":");
    let port = split[1]
      ? isNaN(parseInt(split[1]))
        ? null
        : parseInt(split[1])
      : null;
    let results = await util.status(split[0], port, {
      timeout: 1000,
      enableSRV: true,
    });
    return results.version != null;
  } catch (er) {
    return false;
  }
}
