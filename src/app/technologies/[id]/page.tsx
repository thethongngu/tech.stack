import { getTechnologyById } from '@/lib/technologyUtils';
import { notFound } from 'next/navigation';

export default function TechnologyDetail({ params }: { params: { id: string } }) {
  const tech = getTechnologyById(params.id);
  if (!tech) return notFound();

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-[rgb(var(--foreground-rgb))]">
        {tech.name}
      </h1>
      <p className="text-[rgb(var(--muted-rgb))]">{tech.description}</p>
      <p>
        <strong>Category:</strong> {tech.category}
      </p>
      <p>
        <strong>Tags:</strong> {tech.tags.join(', ')}
      </p>
      {tech.website && (
        <p>
          <a
            href={tech.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgb(var(--primary-rgb))] hover:underline"
          >
            Visit Website
          </a>
        </p>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const { default: technologies } = await import('@/data/technologies.json');
  return (technologies as { id: string }[]).map((t) => ({ id: t.id }));
}
