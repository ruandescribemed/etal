import Image from 'next/image';
import { COURSES, coursesInfo } from '@/data/site';

function CourseSection({ title, text }: { title: string; text: string | null }) {
  if (!text?.trim()) return null;

  return (
    <div className="course__section">
      <h4 className="course__label led">{title}</h4>
      <p className="course__text">{text.trim()}</p>
    </div>
  );
}

export function Courses() {
  return (
    <section className="courses field field--campo" id="minicursos" data-tone="campo" data-edge aria-labelledby="minicursos-title">
      <div className="courses__aside">
        <h2 className="section-title led" id="minicursos-title" data-split="lines">
          Minicursos
        </h2>
        <div className="courses__guide">
          <p className="courses__when">{coursesInfo.when}</p>
          <p className="courses__how">{coursesInfo.how}</p>
        </div>
      </div>
      <ul className="courses__list">
        {COURSES.map((course, index) => (
          <li key={course.slug}>
            <details className="course">
              <summary className="course__summary">
                <span className="course__number led" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="course__avatar" aria-hidden="true">
                  {course.picture ? (
                    <Image className="course__portrait" src={course.picture} alt="" width={96} height={96} sizes="(max-width: 767px) 48px, 80px" />
                  ) : (
                    <span className="course__initials led">{course.author.split(' ').filter((_, i, words) => i === 0 || i === words.length - 1).map((word) => word.charAt(0)).join('')}</span>
                  )}
                </span>
                <span className="course__heading">
                  <span className="course__title">{course.title}</span>
                  <span className="course__meta">
                    <span>{course.author}</span>
                    <span className="course__seats">{course.vagas == null ? 'Vagas a confirmar' : `${course.vagas} vagas`}</span>
                  </span>
                </span>
                <span className="course__sign" aria-hidden="true" />
              </summary>
              <div className="course__body">
                <div className="course__intro">
                  <h3 className="course__label led">Sobre o minicurso</h3>
                  <p>{course.detail?.trim() || 'Mais informações sobre este minicurso serão divulgadas em breve.'}</p>
                </div>
                <div className="course__info">
                  <CourseSection title="Público-alvo" text={course.audience} />
                  <CourseSection title="Pré-requisitos" text={course.requirements} />
                  <CourseSection title="Conteúdo" text={course.content} />
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
