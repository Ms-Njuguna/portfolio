import { useEffect, useState } from "react";

const DEFAULT_USER = "Ms-Njuguna";

export default function GithubIntel({ username = DEFAULT_USER }) {
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState({});
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus({ loading: true, error: "" });

      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );

        if (!res.ok) throw new Error("GitHub fetch failed");

        const data = await res.json();

        if (cancelled) return;

        // 🔥 Top repos
        const top = data
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5);

        setRepos(top);

        // 🔥 Language aggregation
        const langMap = {};
        data.forEach((repo) => {
          if (repo.language) {
            langMap[repo.language] =
              (langMap[repo.language] || 0) + 1;
          }
        });

        setLanguages(langMap);

        setStatus({ loading: false, error: "" });
      } catch (err) {
        if (!cancelled) {
          setStatus({
            loading: false,
            error: err.message,
          });
        }
      }
    }

    load();
    return () => (cancelled = true);
  }, [username]);

  const totalLangs = Object.values(languages).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            GitHub
          </h3>
          <p className="text-sm opacity-60">
            Selected work & tech focus
          </p>
        </div>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs opacity-60 hover:opacity-100"
        >
          @{username}
        </a>
      </div>

      {/* LOADING / ERROR */}
      {status.loading && (
        <div className="mt-6 text-sm opacity-60">
          Loading…
        </div>
      )}

      {status.error && (
        <div className="mt-6 text-sm text-red-400">
          {status.error}
        </div>
      )}

      {/* CONTENT */}
      {!status.loading && !status.error && (
        <>
          {/* TOP REPOS */}
          <div className="mt-6 space-y-3">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-white/10 bg-neutral-950/40 px-4 py-3 hover:bg-white/5 transition"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {repo.name}
                  </span>
                  <span className="text-xs opacity-60">
                    ⭐ {repo.stargazers_count}
                  </span>
                </div>

                {repo.description && (
                  <p className="mt-1 text-xs opacity-60 line-clamp-1">
                    {repo.description}
                  </p>
                )}
              </a>
            ))}
          </div>

          {/* LANGUAGE BARS */}
          <div className="mt-8">
            <p className="text-xs uppercase opacity-50 mb-3">
              Tech Focus
            </p>

            <div className="space-y-2">
              {Object.entries(languages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([lang, count]) => {
                  const percent = (count / totalLangs) * 100;

                  return (
                    <div key={lang}>
                      <div className="flex justify-between text-xs opacity-70">
                        <span>{lang}</span>
                        <span>{Math.round(percent)}%</span>
                      </div>

                      <div className="mt-1 h-[4px] w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/70 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </section>
  );
}