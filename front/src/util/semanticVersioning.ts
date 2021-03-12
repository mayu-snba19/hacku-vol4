export type SemanticVersioning = {
  major: number
  minor: number
  patch: number
}

export const getSemanticVersioning = (
  str: string,
): SemanticVersioning | null => {
  const arr = str.split('.')
  if (arr.length !== 3) return null
  const major = parseInt(arr[0])
  const minor = parseInt(arr[1])
  const patch = parseInt(arr[2])

  if (Number.isNaN(major) || Number.isNaN(minor) || Number.isNaN(patch)) {
    return null
  }

  return {
    major,
    minor,
    patch,
  }
}

export const isNewerOrEqualTo = (
  version1: SemanticVersioning,
  version2: SemanticVersioning,
): boolean | null => {
  return (
    version1.major > version2.major ||
    (version1.major === version2.major && version1.minor > version2.minor) ||
    (version1.major === version2.major &&
      version1.minor === version2.minor &&
      version1.patch >= version2.patch)
  )
}
