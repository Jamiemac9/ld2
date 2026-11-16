/** Responsive story image from /public/story (800w + 1600w webp). */
export default function StoryImg({ name, alt, eager, pos }: { name: string; alt: string; eager?: boolean; pos?: string }) {
  return (
    <img
      src={`/story/${name}-1600.webp`}
      srcSet={`/story/${name}-800.webp 800w, /story/${name}-1600.webp 1600w`}
      sizes="(max-width: 860px) 100vw, 50vw"
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      style={pos ? { objectPosition: pos } : undefined}
    />
  );
}
