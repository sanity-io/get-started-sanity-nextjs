import { createClient } from "next-sanity";

export default function IndexPage({ blogs }) {
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>Blogs</h2>
        {blogs.length > 0 && (
          <ul>
            {blogs.map((blog) => (
              <li key={blog._id}>{blog?.title}</li>
            ))}
          </ul>
        )}
        {!blogs.length > 0 && <p>No blog to show</p>}
        {blogs.length > 0 && (
          <div>
            <pre>{JSON.stringify(blogs, null, 2)}</pre>
          </div>
        )}
        {!blogs.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
      </main>
    </>
  );
}
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset: "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_VERSION,
  useCdn: false,
});

export async function getStaticProps() {
  const blogs = await client.fetch(`*[_type == "post"]`);

  return {
    props: {
      blogs,
    },
  };
}
