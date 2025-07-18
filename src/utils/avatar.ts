import CryptoJS from 'crypto-js'

// 生成GitHub头像URL的函数
export function getGitHubAvatarUrl(username: string, size: number = 80): string {
  return `https://github.com/${username}.png?size=${size}`
}

// 生成Gravatar头像URL的函数
export function getGravatarUrl(email: string, size: number = 80): string {
  // 使用crypto-js生成MD5 hash
  const hash = CryptoJS.MD5(email.toLowerCase().trim()).toString()
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`
}

// 获取头像URL的统一函数
export function getAvatarUrl(
  avatarType: string,
  username: string,
  email: string,
  fallback: string,
  size: number = 80,
): string {
  switch (avatarType) {
    case 'github':
      return getGitHubAvatarUrl(username, size)
    case 'gravatar':
      return getGravatarUrl(email, size)
    case 'custom':
    default:
      return fallback
  }
}
