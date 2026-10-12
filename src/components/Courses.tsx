import { courses, coursesInfo } from '@/data/site';

export function Courses() {
  return (
    <section className="courses field field--campo" id="minicursos" data-tone="campo" data-edge aria-labelledby="minicursos-title">
      <div className="courses__aside">
        <h2 className="section-title led" id="minicursos-title" data-split="lines">
          Minicursos
        </h2>
        <p className="courses__when">{coursesInfo.when}</p>
        <p className="courses__how">{coursesInfo.how}</p>
      </div>
      <ul className="courses__list">
        {courses.map((course) => (
          <li key={course.slug}>
            <details className="course">
              <summary className="course__summary">
                <span className="node" aria-hidden="true" />
                <span className="course__title">{course.title}</span>
                <span className="course__meta led">
                  <span>{course.level}</span>
                  <span>{course.seats} vagas</span>
                </span>
                <span className="course__sign" aria-hidden="true" />
              </summary>
              <div className="course__body">
                <p>{course.summary}</p>
                <p className="course__instructor">Com {course.instructor}</p>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
