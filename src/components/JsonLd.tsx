/**
 * Renders a JSON-LD <script>. Place inside <SEO>'s children (next/head) or
 * anywhere in the page tree. `data` is serialized as-is — keep it to plain
 * JSON-serializable objects built in @/data/schema.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Schema is build-time static; no user input flows in here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
