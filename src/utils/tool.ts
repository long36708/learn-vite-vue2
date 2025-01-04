/**
 * @Author: longmo
 * @Date: 2025-01-04 12:05:44
 * @LastEditTime: 2025-01-04 12:06:01
 * @FilePath: src/utils/tool.ts
 * @Description:
 */
import pinyinMatch from "pinyin-match";

export function getQueryObj(url: string) {
  const searchParams = new URLSearchParams(new URL(url).search);
  const query: Record<string, unknown> = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }
  return query;
}
export function checkPinYin(name: string, keyword: string) {
  const matchRes = pinyinMatch.match(name, keyword);
  return typeof matchRes === "object" ? matchRes.length > 0 : matchRes;
}
