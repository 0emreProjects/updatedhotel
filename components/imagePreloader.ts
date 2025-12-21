const decoded = new Set<string>()

export async function preloadAndDecode(src: string) {
  if (!src) return
  if (decoded.has(src)) return
  try {
    const img = new Image()
    img.src = src
    if ((img as any).decode) {
      await (img as any).decode()
    } else {
      await new Promise<void>((res) => {
        img.onload = () => res()
        img.onerror = () => res()
      })
    }
    decoded.add(src)
  } catch (e) {
    // swallow errors — best effort preload
  }
}

export function isPreloaded(src: string) {
  return decoded.has(src)
}

export function clearPreloader() {
  decoded.clear()
}

export default preloadAndDecode

