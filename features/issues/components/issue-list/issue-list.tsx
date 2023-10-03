import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: { page: newPage },
    });

  const issuesPage = useGetIssues(page);
  const projects = useGetProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return (
      <div>
        <img
          src={"/icons/spinner.svg"}
          alt="logo"
          className={styles.spinner}
          data-testid="spinner"
        />
      </div>
    );
  }

  if (projects.isError) {
    console.error(projects.error);
    return (
      <div className={styles.errorMsg}>
        <img src={"/icons/alert-circle.svg"} />
        <span>There was a problem while loading the project data</span>
        <button
          className={styles.errorButton}
          onClick={() => projects.refetch()}
        >
          {" "}
          Try Again
        </button>
        <img src={"/icons/red-arrow-right.svg"} />
      </div>
    );
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return (
      <div className={styles.errorMsg}>
        <img src={"/icons/alert-circle.svg"} />
        <span>There was a problem while loading the issues page data</span>
        <button
          className={styles.errorButton}
          onClick={() => issuesPage.refetch()}
        >
          {" "}
          Try Again
        </button>
        <img src={"/icons/red-arrow-right.svg"} />
      </div>
    );
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );
  const { items, meta } = issuesPage.data || {};

  console.log(items || []);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.headerCell}>Issue</th>
            <th className={styles.headerCell}>Level</th>
            <th className={styles.headerCell}>Events</th>
            <th className={styles.headerCell}>Users</th>
          </tr>
        </thead>
        <tbody>
          {(items || []).map((issue) => (
            <IssueRow
              key={issue.id}
              issue={issue}
              projectLanguage={projectIdToLanguage[issue.projectId]}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
        <div>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className={styles.paginationButton}
            onClick={() => navigateToPage(page + 1)}
            disabled={page === meta?.totalPages}
          >
            Next
          </button>
        </div>
        <div className={styles.pageInfo}>
          Page <span className={styles.pageNumber}>{meta?.currentPage}</span> of{" "}
          <span className={styles.pageNumber}>{meta?.totalPages}</span>
        </div>
      </div>
    </div>
  );
}
