/**
 * @Author: longmo
 * @Date: 2025-01-04 12:10:07
 * @LastEditTime: 2025-01-04 12:11:00
 * @FilePath: build/parseEnv.ts
 * @Description: 将环境变量中的字符串形式的布尔值（'true' 或 'false'）转换为实际的布尔类型，其他类型的值保持不变
 */
type ParseBoolean<T> = {
    [K in keyof T]: T[K] extends string & ('true' | 'false') ? boolean : T[K]
}

export function parseEnv(viteEnv: ImportMetaEnv) {
    const env = {} as ParseBoolean<ImportMetaEnv>

    for (const key in viteEnv) {
        env[key] = viteEnv[key] === 'true' ? true : viteEnv[key] === 'false' ? false : viteEnv[key]
    }

    return env
}
