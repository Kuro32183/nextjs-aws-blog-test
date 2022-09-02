import { createClient } from "microcms-js-sdk";

export default function BlogId({ blog, data }) {
	return (
	  <main>
		<h1>{blog.title}</h1>
		<p>{blog.publishedAt}</p>
		<div
		  dangerouslySetInnerHTML={{
			__html: `${blog.content}`,
		  }}
		/>
	  </main>
	);
  }
  
  // 静的生成のためのパスを指定します
  export const getStaticPaths = async () => {
	const client = createClient({
		serviceDomain: "nextjs-aws-app-runner",
		apiKey: process.env.X_MICROCMS_API_KEY,
	  });
	const data = await client.get({ endpoint: "blogs" });
  
	const paths = data.contents.map((content) => `/blogs/${content.id}`);
	return { paths, fallback: false };
  };
  
  // データをテンプレートに受け渡す部分の処理を記述します
  export const getStaticProps = async (context) => {
	const client = createClient({
		serviceDomain: "nextjs-aws-app-runner",
		apiKey: process.env.X_MICROCMS_API_KEY,
	  });
	const id = context.params.id;
	const data = await client.get({ endpoint: "blogs", contentId: id });
  
	return {
	  props: {
		blog: data,
	  },
	};
  };