
'use server';

interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
}

interface Project {
    name: string;
    description: string | null;
    url: string;
    stars: number;
}

/**
 * Fetches public repositories for a given GitHub user.
 * @param username The GitHub username.
 * @returns A promise that resolves to a list of simplified repository objects.
 */
export async function getGithubRepositories(username: string): Promise<Project[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        // Optional: Add headers for authentication if needed for higher rate limits
        // headers: {
        //     'Authorization': `token ${process.env.GITHUB_TOKEN}`
        // }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }

    const repos: GithubRepo[] = await response.json();

    const projects: Project[] = repos.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count
    }));

    return projects.sort((a, b) => b.stars - a.stars);
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    // Return an empty array or handle the error as appropriate
    return [];
  }
}
