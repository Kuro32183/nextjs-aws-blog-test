import { createClient } from "microcms-js-sdk";
import Link from "next/link";



export default function Home({ data }) {
  return (
    <div>
      <h1>Jamstack Sample</h1>
      {data.contents.map((blog) => (
         <li key={blog.id}>
         <Link href={`/blogs/${blog.id}`}>
           <a><h2>{blog.title}</h2></a>
         </Link>
       </li>
       
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const client = createClient({
    serviceDomain: "nextjs-aws-app-runner",
    apiKey: process.env.X_MICROCMS_API_KEY,
  });
  const data = await client.get({ endpoint: "blogs" });
 
  return {props: {data}
  };
};