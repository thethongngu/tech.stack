export default function HomePage() {
  return (
    // The <main> tag with p-4 is already in layout.tsx, so children don't need it again.
    // If specific page content needs a container, it can be added here.
    <div>
      <h1 className="text-2xl font-bold text-[rgb(var(--foreground-rgb))]">
        Welcome to Tech Stack Explorer!
      </h1>
      <p className="mt-2 text-[rgb(var(--muted-rgb))]">
        Explore and discover technology stacks.
      </p>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[rgb(var(--foreground-rgb))]">Sample Content</h2>
        <p className="mt-2">
          This is a paragraph to demonstrate basic text styling. It should adapt to the
          current theme (light or dark).
        </p>
        <a href="#" className="mt-4 inline-block text-[rgb(var(--primary-rgb))] hover:underline">
          This is a sample link.
        </a>
        <div className="mt-4 p-4 border border-[rgb(var(--border-rgb))] rounded-md">
          <p className="text-sm">This is a bordered container, using the themed border color.</p>
        </div>
      </div>
    </div>
  );
}
