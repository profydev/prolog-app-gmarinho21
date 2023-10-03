import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
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

  if (isError) {
    console.error(error);
    return (
      <div className={styles.errorMsg}>
        <img src={"/icons/alert-circle.svg"} />
        <span>There was a problem while loading the project data</span>
        <button onClick={() => refetch} className={styles.errorButton}>
          {" "}
          Try Again
        </button>
        <img src={"/icons/red-arrow-right.svg"} />
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
