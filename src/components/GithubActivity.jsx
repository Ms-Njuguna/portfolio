import { useEffect, useMemo, useState } from "react";

const DEFAULT_USER = "Ms-Njuguna";
const CACHE_KEY = (user) => `pf_gh_events_${user}`;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function timeAgo(dateString) {
  const d = new Date(dateString);
  const diffMs = Date.now() - d.getTime();
  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 48) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

function niceType(t) {
  const map = {
    PushEvent: "Pushed commits",
    PullRequestEvent: "Pull request",
    IssuesEvent: "Issue activity",
    CreateEvent: "Created",
    DeleteEvent: "Deleted",
    WatchEvent: "Starred",
    ForkEvent: "Forked",
    ReleaseEvent: "Released",
    PullRequestReviewEvent: "Reviewed PR",
    PullRequestReviewCommentEvent: "PR comments",
    IssueCommentEvent: "Issue comment",
  };
  return map[t] || t.replace(/Event$/, "");
}

function summaryFor(e) {
  const repo = e?.repo?.name || "repo";
  const type = e?.type;

  if (type === "PushEvent") {
    const count = e?.payload?.commits?.length ?? 0;
    const branch = e?.payload?.ref?.replace("refs/heads/", "");
    return `${count} commit${count === 1 ? "" : "s"} to ${repo}${branch ? ` (${branch})` : ""}`;
  }

  if (type === "PullRequestEvent") {
    const action = e?.payload?.action || "updated";
    const pr = e?.payload?.pull_request;
    const title = pr?.title ? ` — ${pr.title}` : "";
    return `${action} PR in ${repo}${title}`;
  }

  if (type === "IssuesEvent") {
    const action = e?.payload?.action || "updated";
    const title = e?.payload?.issue?.title ? ` — ${e.payload.issue.title}` : "";
    return `${action} issue in ${repo}${title}`;
  }

  if (type === "CreateEvent") {
    const refType = e?.payload?.ref_type || "item";
    const ref = e?.payload?.ref ? `: ${e.payload.ref}` : "";
    return `${refType} created in ${repo}${ref}`;
  }

  if (type === "ReleaseEvent") {
    const name = e?.payload?.release?.name || e?.payload?.release?.tag_name || "";
    return `release in ${repo}${name ? ` — ${name}` : ""}`;
  }

  return `activity in ${repo}`;
}

export default function GithubActivity({
  username = DEFAULT_USER,
  limit = 10,
}) {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  const endpoint = useMemo(
    () => `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=${limit}`,
    [username, limit]
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus({ loading: true, error: "" });

      // cache read
      try {
        const raw = localStorage.getItem(CACHE_KEY(username));
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.ts && Array.isArray(parsed?.data)) {
            const fresh = Date.now() - parsed.ts < CACHE_TTL_MS;
            if (fresh) {
              if (!cancelled) {
                setEvents(parsed.data);
                setStatus({ loading: false, error: "" });
              }
              return;
            }
          }
        }
      } catch {
        // ignore cache parse errors
      }

      // network fetch
      try {
        const res = await fetch(endpoint, {
          headers: {
            Accept: "application/vnd.github+json",
          },
        });

        if (!res.ok) {
          // GitHub sometimes rate limits hard on unauthenticated requests
          const msg =
            res.status === 403
              ? "GitHub rate limit hit (try again later)."
              : `GitHub request failed (${res.status}).`;
          throw new Error(msg);
        }

        const data = await res.json();
        if (!cancelled) {
          setEvents(Array.isArray(data) ? data : []);
          setStatus({ loading: false, error: "" });
        }

        try {
          localStorage.setItem(
            CACHE_KEY(username),
            JSON.stringify({ ts: Date.now(), data: Array.isArray(data) ? data : [] })
          );
        } catch {
          // ignore cache write errors
        }
      } catch (err) {
        if (!cancelled) {
          setStatus({ loading: false, error: err?.message || "Failed to load activity." });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [endpoint, username]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">GitHub activity</h3>
          <p className="mt-1 text-sm opacity-70">
            Live feed from public events — cached for speed.
          </p>
        </div>

        <a
          className="rounded-full border border-white/15 px-3 py-1 text-xs opacity-80 hover:bg-white/5"
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          @{username}
        </a>
      </div>

      <div className="mt-5">
        {status.loading && (
          <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4 text-sm opacity-70">
            Loading activity…
          </div>
        )}

        {!status.loading && status.error && (
          <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4 text-sm">
            <div className="font-medium">Couldn’t load GitHub activity</div>
            <div className="mt-1 opacity-70">{status.error}</div>
            <div className="mt-3 text-xs opacity-60">
              Tip: If this happens often, you can add a GitHub token via a tiny serverless proxy later.
            </div>
          </div>
        )}

        {!status.loading && !status.error && (
          <ul className="space-y-3">
            {events.slice(0, limit).map((e) => (
              <li
                key={e.id}
                className="rounded-2xl border border-white/10 bg-neutral-950/40 p-3 sm:p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-medium">
                    {niceType(e.type)}
                  </div>
                  <div className="text-xs opacity-60">
                    {timeAgo(e.created_at)}
                  </div>
                </div>

                <div className="mt-2 text-sm opacity-80">
                  {summaryFor(e)}
                </div>

                {e?.repo?.name && (
                  <a
                    className="mt-3 inline-block text-xs opacity-70 hover:opacity-100"
                    href={`https://github.com/${e.repo.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View repo →
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}