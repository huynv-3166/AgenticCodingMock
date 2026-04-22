import type { SupabaseClient } from "@supabase/supabase-js";
import type { Kudo, UserInfo } from "@/types";

/**
 * Resolve a hashtag filter to the set of matching kudo ids.
 * Returns:
 *   - `null` when no hashtag filter is applied (don't constrain the query)
 *   - `[]` when the hashtag resolves to no matches (caller should short-circuit to empty)
 *   - `string[]` of kudo ids to use with `.in("id", ...)`
 */
export async function resolveHashtagKudoIds(
  supabase: SupabaseClient,
  hashtag: string | undefined
): Promise<string[] | null> {
  if (!hashtag) return null;

  const { data: hashtagRow } = await supabase
    .from("hashtags")
    .select("id")
    .eq("name", hashtag)
    .maybeSingle();

  if (!hashtagRow) return [];

  const { data: rows } = await supabase
    .from("kudo_hashtags")
    .select("kudo_id")
    .eq("hashtag_id", hashtagRow.id);

  return (rows ?? []).map((r) => (r as { kudo_id: string }).kudo_id);
}

/**
 * Resolve a department filter to the set of receiver user ids.
 * Same return semantics as {@link resolveHashtagKudoIds}.
 */
export async function resolveDepartmentReceiverIds(
  supabase: SupabaseClient,
  department: string | undefined
): Promise<string[] | null> {
  if (!department) return null;

  const { data: deptRow } = await supabase
    .from("departments")
    .select("id")
    .eq("code", department)
    .maybeSingle();

  if (!deptRow) return [];

  const { data: profiles } = await supabase
    .from("user_profiles")
    .select("user_id")
    .eq("department_id", deptRow.id);

  return (profiles ?? []).map((p) => (p as { user_id: string }).user_id);
}

/**
 * Fetch user_profiles for every sender/receiver id referenced by `kudos`
 * and return a map keyed by `user_id`. Used to hydrate kudos that were
 * selected without an inline profile join.
 */
export async function fetchProfileMapForKudos(
  supabase: SupabaseClient,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kudos: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<Map<string, any>> {
  const userIds = new Set<string>();
  for (const k of kudos) {
    if (k.sender_id) userIds.add(k.sender_id);
    if (k.receiver_id) userIds.add(k.receiver_id);
  }

  if (userIds.size === 0) return new Map();

  const { data: profiles } = await supabase
    .from("user_profiles")
    .select("user_id, display_name, star_level, department:departments(name, code)")
    .in("user_id", Array.from(userIds));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Map((profiles ?? []).map((p: any) => [p.user_id, p]));
}

/** Shape a user_profiles row (or `undefined`) into the public `UserInfo` DTO. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatUserInfo(profile: any, isAnonymous: boolean): UserInfo {
  if (!profile || isAnonymous) {
    return {
      user_id: "",
      name: "",
      avatar_url: null,
      department: "",
      department_code: "",
      star_level: 0,
    };
  }
  const dept = Array.isArray(profile.department) ? profile.department[0] : profile.department;
  return {
    user_id: profile.user_id ?? "",
    name: profile.display_name ?? "",
    avatar_url: null,
    department: dept?.name ?? "",
    department_code: dept?.code ?? "",
    star_level: profile.star_level ?? 0,
  };
}

/** Shape a raw `kudos` row (with nested hashtags/images/hearts) into the public `Kudo` DTO. */
export function formatKudo(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kudo: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileMap: Map<string, any>,
  currentUserId: string
): Kudo {
  return {
    id: kudo.id,
    sender: formatUserInfo(profileMap.get(kudo.sender_id), kudo.is_anonymous),
    receiver: formatUserInfo(profileMap.get(kudo.receiver_id), false),
    message: kudo.message,
    category: kudo.category,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hashtags: (kudo.hashtags ?? []).map((h: any) => {
      const ht = Array.isArray(h.hashtag) ? h.hashtag[0] : h.hashtag;
      return ht?.name ?? "";
    }),
    images: (kudo.images ?? [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .sort((a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((i: any) => i.image_url),
    heart_count: kudo.heart_count,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    is_hearted_by_me: (kudo.hearts ?? []).some((h: any) => h.user_id === currentUserId),
    is_anonymous: kudo.is_anonymous,
    created_at: kudo.created_at,
  };
}
